// JelajahKita - Player Setup Interactive Controller
// 100% Offline, Zero Network Dependency

(function() {
  'use strict';

  // Player archetypes matching PRD specifications
  const players = [
    {
      id: 1,
      initialKey: 'M',
      color: '#1E3F2D',
      customName: null
    },
    {
      id: 2,
      initialKey: 'A',
      color: '#E6A23C',
      customName: null
    },
    {
      id: 3,
      initialKey: 'D',
      color: '#E27D60',
      customName: null
    },
    {
      id: 4,
      initialKey: 'S',
      color: '#6890AA',
      customName: null
    }
  ];

  // Application State
  let selectedPlayerCount = 4;

  // DOM references
  const playerCountButtons = document.querySelectorAll('.player-count-button');
  const playerCardsList = document.getElementById('player-cards-list');
  const startButton = document.getElementById('btn-start');

  // Initialize offline SVG icons
  function initializeIcons() {
    const setIcon = (id, iconName, size) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = icons.render(iconName, size);
    };

    setIcon('badge-stars-icon', 'stars', 15);
    setIcon('icon-family', 'family', 22);
    setIcon('icon-group-2', 'group', 16);
    setIcon('icon-group-3', 'group', 16);
    setIcon('icon-groups', 'groups', 16);
    setIcon('icon-info', 'lightbulb', 20);
    setIcon('icon-explore', 'explore', 24);
    setIcon('icon-arrow', 'arrowForward', 24);
  }

  // Create individual player card element without hardcoded strings
  function createPlayerCard(player, isVisible) {
    const card = document.createElement('div');
    card.className = `player-card${!isVisible ? ' hidden' : ''}`;
    card.dataset.playerIndex = player.id;

    const name = player.customName || i18n.t(`player.${player.id}.name`);
    const pion = i18n.t(`player.${player.id}.pion`);
    const playerWord = i18n.t('playerSetup.player');
    const pionWord = i18n.t('playerSetup.pion');
    const editWord = i18n.t('button.edit');

    card.innerHTML = `
      <div class="player-card-content">
        <div class="player-avatar player-${player.id}">
          <span>${player.initialKey}</span>
        </div>

        <div class="player-details">
          <div class="player-identity">
            <span class="player-identity-dot player-${player.id}"></span>
            <span class="player-identity-text">${playerWord} ${player.id} • ${pionWord} ${pion}</span>
          </div>

          <div class="player-info">
            <span class="player-name">${name}</span>
          </div>
        </div>
      </div>

      <button class="player-edit-btn" type="button" aria-label="${editWord} ${name}" data-player-id="${player.id}">
        ${icons.render('edit', 18)}
      </button>
    `;

    // Connect edit action
    const editBtn = card.querySelector('.player-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        handleEditPlayer(player.id);
      });
    }

    return card;
  }

  // Render all player cards into list
  function renderPlayerCards() {
    if (!playerCardsList) return;
    playerCardsList.innerHTML = '';

    players.forEach((player, index) => {
      const isVisible = index < selectedPlayerCount;
      const card = createPlayerCard(player, isVisible);
      playerCardsList.appendChild(card);
    });
  }

  // Handle player count selection
  function handlePlayerCountChange(count) {
    selectedPlayerCount = count;

    // Update segmented button states & accessibility
    playerCountButtons.forEach(btn => {
      const btnCount = parseInt(btn.dataset.players, 10);
      if (btnCount === count) {
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-checked', 'false');
      }
    });

    // Update player card visibility
    const allCards = document.querySelectorAll('.player-card');
    allCards.forEach(card => {
      const cardIndex = parseInt(card.dataset.playerIndex, 10);
      if (cardIndex <= count) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Handle player name customization
  function handleEditPlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const currentName = player.customName || i18n.t(`player.${playerId}.name`);
    const promptText = i18n.currentLanguage === 'en'
      ? `Enter new name for Player ${playerId}:`
      : `Masukkan nama baru untuk Pemain ${playerId}:`;

    const newName = window.prompt(promptText, currentName);
    if (newName && newName.trim().length > 0) {
      player.customName = newName.trim();
      renderPlayerCards();
    }
  }

  // Handle start button - stores setup in sessionStorage and navigates to game screen
  function handleStart() {
    const gameSetup = {
      playerCount: selectedPlayerCount,
      language: i18n.currentLanguage,
      players: players.slice(0, selectedPlayerCount).map(function (p) {
        return {
          id: p.id,
          name: p.customName || i18n.t('player.' + p.id + '.name'),
          initialKey: p.initialKey,
          color: p.color
        };
      })
    };
    try {
      sessionStorage.setItem('jelajahkita.gameSetup', JSON.stringify(gameSetup));
    } catch (e) { /* sessionStorage might be restricted */ }
    window.location.href = 'game.html';
  }

  // Event Listeners
  playerCountButtons.forEach(button => {
    button.addEventListener('click', () => {
      const count = parseInt(button.dataset.players, 10);
      handlePlayerCountChange(count);
    });
  });

  // Language toggle - top (hero) and center (below heading)
  const languageButtons = document.querySelectorAll('.language-button');
  languageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang;
      i18n.setLanguage(lang);
      languageButtons.forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
      });
    });
  });

  if (startButton) {
    startButton.addEventListener('click', handleStart);
  }

  // Listen for language changes to update cards dynamically while preserving state
  window.addEventListener('languageChanged', () => {
    i18n.updateDOM();
    renderPlayerCards();
  });

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initializeIcons();
    i18n.updateDOM();
    renderPlayerCards();
  });

  // Expose state helper for automated tests
  window.__jelajahkitaState = {
    getSelectedPlayerCount: () => selectedPlayerCount,
    setSelectedPlayerCount: handlePlayerCountChange,
    getPlayers: () => players
  };

})();
