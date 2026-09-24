// JelajahKita – Phase 3: Card / Reflection Modal
// Handles card modal display, content loading, and actions
// Offline-first: loads from local card-deck.json

(function () {
  'use strict';

  let CARD_DECK = [];
  let drawnCards = [];
  let currentCard = null;
  let currentPlayer = null;

  // Load card deck from JSON
  async function loadCardDeck() {
    try {
      const response = await fetch('data/card-deck.json');
      CARD_DECK = await response.json();
      console.log('[Card Modal] Loaded', CARD_DECK.length, 'cards');
    } catch (err) {
      console.error('[Card Modal] Failed to load card deck:', err);
    }
  }

  // Get random card of specific type, avoid duplicates
  function drawCard(category) {
    const pool = CARD_DECK.filter(c => c.category === category && !drawnCards.includes(c.id));
    if (pool.length === 0) {
      // Deck exhausted for this category, reset
      drawnCards = drawnCards.filter(id => !CARD_DECK.find(c => c.id === id && c.category === category));
      return drawCard(category);
    }
    const card = pool[Math.floor(Math.random() * pool.length)];
    drawnCards.push(card.id);
    return card;
  }

  // Category config: badge color, series name, icon
  const categoryConfig = {
    HATI: {
      color: '#99452c',
      seriesName: 'Seri Cinta',
      icon: '❤️',
      badgeColor: '#B85C4F'
    },
    CERITA: {
      color: '#503200',
      seriesName: 'Seri Cerita',
      icon: '📖',
      badgeColor: '#8E7DBE'
    },
    MIMPI: {
      color: '#1e3f2d',
      seriesName: 'Seri Masa Depan',
      icon: '✨',
      badgeColor: '#446651'
    },
    AKSI: {
      color: '#446651',
      seriesName: 'Seri Aksi',
      icon: '🎯',
      badgeColor: '#2c4e3b'
    }
  };

  // Populate modal with card data
  function renderCard(card, player) {
    if (!card || !player) return;

    const lang = window.i18n?.currentLanguage || 'id';
    const catConfig = categoryConfig[card.category] || categoryConfig.HATI;

    // Update category badge
    const categoryText = document.getElementById('card-category-text');
    const categoryIcon = document.getElementById('card-category-icon');
    if (categoryText) {
      categoryText.textContent = 'KARTU ' + card.category;
    }
    if (categoryIcon) {
      categoryIcon.textContent = catConfig.icon;
    }

    // Update series counter
    const seriesNumber = document.getElementById('card-series-number');
    if (seriesNumber) {
      const cardIndex = CARD_DECK.findIndex(c => c.id === card.id);
      seriesNumber.textContent = 'No. ' + (cardIndex + 1) + ' / ' + catConfig.seriesName;
    }

    // Update speaker pill
    const speakerAvatar = document.getElementById('speaker-avatar');
    const speakerInitial = document.getElementById('speaker-initial');
    const speakerName = document.getElementById('speaker-name');

    if (speakerAvatar) {
      speakerAvatar.style.backgroundColor = player.color || catConfig.color;
    }
    if (speakerInitial) {
      speakerInitial.textContent = player.initial || player.customName?.charAt(0) || '?';
    }
    if (speakerName) {
      const displayName = player.customName || player.name || 'Pemain';
      speakerName.textContent = displayName;
    }

    // Update prompt
    const promptText = document.getElementById('card-prompt-text');
    if (promptText) {
      promptText.textContent = '"' + (card.prompt[lang] || card.prompt.id) + '"';
    }

    // Update guidance
    const guidanceText = document.getElementById('card-guidance-text');
    const guidanceIcon = document.getElementById('guidance-icon');
    if (guidanceText) {
      guidanceText.textContent = card.guidance[lang] || card.guidance.id;
    }
    if (guidanceIcon) {
      guidanceIcon.textContent = '❤️';
    }

    // Button labels via i18n
    const continueLabel = document.querySelector('#btn-card-continue [data-i18n="card.action-continue"]');
    const replaceLabel = document.querySelector('#btn-card-replace [data-i18n="card.action-replace"]');
    
    // Update footer
    const footerText = document.getElementById('card-footer-text');
    if (footerText) {
      footerText.textContent = window.i18n?.t('card.footer') || 'Tidak ada jawaban salah. Semua cerita dirayakan bersama.';
    }

    // Update dimmed board step counter
    const dimmédSteps = document.getElementById('dimmed-steps');
    if (dimmédSteps && window.GameState) {
      const pos = window.GameState.currentPosition || 0;
      const total = window.GameState.boardLength || 30;
      dimmédSteps.textContent = 'Langkah ' + (pos + 1) + ' / ' + total;
    }
  }

  // Open modal with card
  function openModal(category, player) {
    if (!category || !player) return;

    currentCard = drawCard(category);
    currentPlayer = player;

    renderCard(currentCard, currentPlayer);

    // Apply i18n
    if (window.i18n) {
      window.i18n.updateDOM();
    }

    // Show modal
    const overlay = document.getElementById('card-modal-overlay');
    if (overlay) {
       overlay.style.removeProperty('display');
       overlay.setAttribute('aria-hidden', 'false');
       document.body.style.overflow = 'hidden';
    }
  }

  // Close modal
  function closeModal() {
    const overlay = document.getElementById('card-modal-overlay');
    if (overlay) {
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.removeProperty('display');
      document.body.style.overflow = '';
    }
  }

  // Replace current card
  function replaceCard() {
    if (!currentCard || !currentPlayer) return;

    // Remove current card from drawn list to allow redraw
    drawnCards = drawnCards.filter(id => id !== currentCard.id);

    // Draw new card of same category
    currentCard = drawCard(currentCard.category);
    renderCard(currentCard, currentPlayer);

    // Animate card shuffle
    const content = document.getElementById('card-modal-content');
    if (content) {
      content.style.transform = 'rotate(-3deg) scale(0.95)';
      setTimeout(function () {
        content.style.transform = 'rotate(2deg) scale(0.98)';
        setTimeout(function () {
          content.style.transform = 'rotate(0deg) scale(1)';
        }, 120);
      }, 120);
    }
  }

  // Button event listeners
  document.addEventListener('DOMContentLoaded', () => {
    loadCardDeck();

    const continueBtn = document.getElementById('btn-card-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const content = document.getElementById('card-modal-content');
        if (content) {
          content.style.transform = 'scale(0.96) translateY(4px)';
          setTimeout(() => {
            content.style.transform = 'scale(1.02) translateY(-10px)';
            setTimeout(() => {
              closeModal();
              if (window.__jkGame && window.__jkGame.onCardContinue) {
                window.__jkGame.onCardContinue();
              }
            }, 180);
          }, 120);
        } else {
          closeModal();
          if (window.__jkGame && window.__jkGame.onCardContinue) {
            window.__jkGame.onCardContinue();
          }
        }
      });
    }

    const replaceBtn = document.getElementById('btn-card-replace');
    if (replaceBtn) {
      replaceBtn.addEventListener('click', replaceCard);
    }

    // Check for card data in sessionStorage (direct page load)
    const pendingCard = sessionStorage.getItem('pendingCard');
    if (pendingCard) {
      const data = JSON.parse(pendingCard);
      sessionStorage.removeItem('pendingCard');
      openModal(data.category, data.player);
    }
  });

  // Expose API for external access
  window.CardModal = {
    open: openModal,
    close: closeModal,
    replace: replaceCard
  };

})();
