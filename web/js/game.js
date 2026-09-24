// JelajahKita – Phase 2: Main Game Board Engine
// 100% Offline, Zero Network Dependency
// Mobile-first: 390×844 golden viewport

(function () {
  'use strict';

  /* ============================================================
     TILE DEFINITIONS (28 tiles, index 0 unused)
     Types: START, PATH, HATI, CERITA, MIMPI, AKSI, BONUS(+2), MINUS(-1), FINISH
     ============================================================ */

  const TILES = [
    null, // index 0 unused
    { num: 1,  type: 'START',  icon: 'flag',            label: null },
    { num: 2,  type: 'PATH',   icon: null,              label: null },
    { num: 3,  type: 'CERITA', icon: 'auto_stories',    label: null },
    { num: 4,  type: 'AKSI',   icon: 'back_hand',       label: null },
    { num: 5,  type: 'MIMPI',  icon: 'wb_cloudy',       label: null },
    { num: 6,  type: 'HATI',   icon: 'favorite',        label: null },
    { num: 7,  type: 'BONUS',  icon: null,              label: '+2' },
    { num: 8,  type: 'CERITA', icon: 'auto_stories',    label: null },
    { num: 9,  type: 'PATH',   icon: null,              label: null },
    { num: 10, type: 'HATI',   icon: 'favorite',        label: null },
    { num: 11, type: 'PATH',   icon: null,              label: null },
    { num: 12, type: 'MIMPI',  icon: 'wb_cloudy',       label: null },
    { num: 13, type: 'AKSI',   icon: 'back_hand',       label: null },
    { num: 14, type: 'CERITA', icon: 'auto_stories',    label: null },
    { num: 15, type: 'MIMPI',  icon: 'wb_cloudy',       label: null },
    { num: 16, type: 'MINUS',  icon: null,              label: '-1' },
    { num: 17, type: 'HATI',   icon: 'favorite',        label: null },
    { num: 18, type: 'CERITA', icon: 'auto_stories',    label: null },
    { num: 19, type: 'PATH',   icon: null,              label: null },
    { num: 20, type: 'AKSI',   icon: 'back_hand',       label: null },
    { num: 21, type: 'BONUS',  icon: null,              label: '+2' },
    { num: 22, type: 'PATH',   icon: null,              label: null },
    { num: 23, type: 'MIMPI',  icon: 'wb_cloudy',       label: null },
    { num: 24, type: 'AKSI',   icon: 'back_hand',       label: null },
    { num: 25, type: 'CERITA', icon: 'auto_stories',    label: null },
    { num: 26, type: 'BONUS',  icon: null,              label: '+2' },
    { num: 27, type: 'HATI',   icon: 'favorite',        label: null },
    { num: 28, type: 'FINISH', icon: 'holiday_village', label: null }
  ];

  /*
   * Visual S-curve grid order (HTML order → 7 cols × 4 rows):
   *
   * ROW 1 (top):    28, 27, 26, 25, 24, 23, 22  (Path goes right-to-left: 22 → 28 FINISH)
   * ROW 2:          15, 16, 17, 18, 19, 20, 21  (Path goes left-to-right: 15 → 21)
   * ROW 3:          14, 13, 12, 11, 10,  9,  8  (Path goes right-to-left:  8 → 14)
   * ROW 4 (bottom):  1,  2,  3,  4,  5,  6,  7  (Path goes left-to-right:  1 START → 7)
   */
  const BOARD_HTML_ORDER = [
    28, 27, 26, 25, 24, 23, 22,  // row 1
    15, 16, 17, 18, 19, 20, 21,  // row 2
    14, 13, 12, 11, 10,  9,  8,  // row 3
     1,  2,  3,  4,  5,  6,  7   // row 4
  ];

  /* ============================================================
     SHADOW COLOR MAP FOR WOODEN PAWNS
     ============================================================ */

  const SHADOW_COLORS = {
    '#1E3F2D': '#002111',
    '#E6A23C': '#B97F29',
    '#E27D60': '#7b2e17',
    '#6890AA': '#2c4e3b'
  };

  /* ============================================================
     IN-MEMORY GAME STATE (Minimal, strictly meeting requirements)
     ============================================================ */

  // Card modal system
  const CARD_DECK = [
    {
      type: 'HATI',
      categoryKey: 'game.legend.hati',
      color: '#99452c',
      prompts: {
        id: 'refl-1-1',
        en: 'If our family could plan a dream adventure without weekend limits this week, what place would you most want to visit together?',
        id: 'refl-1-1',
        id: 'Apa yang paling ingin Ayah/Mama/Dika/Siti lakukan bersama keluarga minggu ini?'
      },
      series: 'Masa Depan'
    },
    {
      type: 'CERITA',
      categoryKey: 'game.legend.cerita',
      color: '#503200',
      prompts: {
        id: 'refl-1-2',
        en: 'Share a favorite family memory that makes you smile right now. Who told it and when?',
        id: 'refl-1-2',
        id: 'Ceritakan satu momen keluarga yang membuatmu bahagia. Siapa yang ceritakan dan kapan?'
      },
      series: 'Memories'
    },
    {
      type: 'MIMPI',
      categoryKey: 'game.legend.mimpi',
      color: '#1e3f2d',
      prompts: {
        id: 'refl-1-3',
        en: 'What skill would you love to learn this year and how could your family support each other in it?',
        id: 'refl-1-3',
        id: 'Apa yang ingin kamu pelajari tahun ini dan bagaimana keluarga bisa bantu sama-sama?'
      },
      series: 'Harapan'
    },
    {
      type: 'AKSI',
      categoryKey: 'game.legend.aksi',
      color: '#446651',
      prompts: {
        id: 'refl-1-4',
        en: 'Name three simple things we could do together this weekend that would make our whole family feel closer.',
        id: 'refl-1-4',
        id: 'Tiga hal sederhana apa yang kita bisa lakukan bareng minggu ini agar keluarga lebih dekat?'
      },
      series: 'Kerjasama'
    }
  ];

  // Track drawn cards to avoid duplicates per game session
  let drawnCardIndices = [];
  let pendingCardEvent = null;

  /* ============================================================
     INIT FROM SESSIONSTORAGE (or Fallback Default 4 Players)
     ============================================================ */

  /* App-wide state */
  const gameState = {
    playerCount: 4,
    players: [],
    activePlayerIndex: 0,
    get activePlayer() { return this.players[this.activePlayerIndex]; },
    diceValue: null,
    rollingState: false,
    pendingCardEvent: null,
    milestoneLevel: 0,
    completionReady: false
  };

  function initGame() {
    let setup = null;
    try {
      const raw = sessionStorage.getItem('jelajahkita.gameSetup');
      if (raw) setup = JSON.parse(raw);
    } catch (e) { /* ignore */ }

    if (!setup) {
      // Fallback: default 4-player game matching PRD persona specifications
      setup = {
        playerCount: 4,
        language: 'id',
        players: [
          { id: 1, name: 'Maryono', initialKey: 'M', color: '#1E3F2D' },
          { id: 2, name: 'Ayu',     initialKey: 'A', color: '#E6A23C' },
          { id: 3, name: 'Dika',    initialKey: 'D', color: '#E27D60' },
          { id: 4, name: 'Siti',    initialKey: 'S', color: '#6890AA' }
        ]
      };
    }

    gameState.playerCount = Math.min(Math.max(parseInt(setup.playerCount, 10) || 4, 2), 4);
    gameState.players = setup.players.slice(0, gameState.playerCount).map(function (p) {
     return {
        id: p.id,
        initial: p.initialKey || p.initial || String(p.name || '?').charAt(0).toUpperCase(),
        color: p.color || '#1E3F2D',
        shadowColor: SHADOW_COLORS[p.color] || '#333333',
        name: p.name || ('Player ' + p.id),
        position: 1,
        finished: false,
        cardsCompleted: 0
      };
    });

    gameState.activePlayerIndex = 0;
    gameState.diceValue = null;
    gameState.rollingState = false;
    gameState.pendingCardEvent = null;
    gameState.milestoneLevel = 0;
    gameState.completionReady = false;

    // Apply language from setup if available
    if (setup.language && window.i18n && i18n.translations[setup.language]) {
      i18n.currentLanguage = setup.language;
    }
  }

  /* ============================================================
     TILE TYPE → CSS CLASS MAP
     ============================================================ */

  const TILE_TYPE_CLASS = {
    PATH:   'board-tile--path',
    START:  'board-tile--start',
    FINISH: 'board-tile--finish',
    HATI:   'board-tile--hati',
    CERITA: 'board-tile--cerita',
    MIMPI:  'board-tile--mimpi',
    AKSI:   'board-tile--aksi',
    BONUS:  'board-tile--bonus',
    MINUS:  'board-tile--minus'
  };

  /* Helper to render icon */
  function renderIcon(name, size) {
    if (window.icons && window.icons[name]) {
      return window.icons.render(name, size);
    }
    return '';
  }

  /* ============================================================
     BOARD LEGEND STRIP
     ============================================================ */

  const LEGEND_ITEMS = [
    { type: 'HATI',   color: '#99452c', key: 'game.legend.hati' },
    { type: 'CERITA', color: '#503200', key: 'game.legend.cerita' },
    { type: 'MIMPI',  color: '#1e3f2d', key: 'game.legend.mimpi' },
    { type: 'AKSI',   color: '#446651', key: 'game.legend.aksi' },
    { type: 'BONUS',  color: '#ff9475', key: 'game.legend.bonus' }
  ];

  function renderLegend() {
    const container = document.getElementById('board-legend');
    if (!container) return;
    container.innerHTML = '';

    LEGEND_ITEMS.forEach(function (item) {
      const pill = document.createElement('div');
      pill.className = 'legend-pill';
      pill.setAttribute('role', 'listitem');

      const dot = document.createElement('span');
      dot.className = 'legend-dot';
      dot.style.background = item.color;
      pill.appendChild(dot);

      const label = document.createElement('span');
      label.textContent = i18n.t(item.key);
      pill.appendChild(label);

      container.appendChild(pill);
    });
  }

  /* ============================================================
     PAWN STAGGER LOGIC (Matching Stitch Pawn Placement)
     When players share a tile, stagger naturally above the tile edge.
     ============================================================ */

  function applyPawnStagger(pawnEl, count, index) {
    // Top position: physical pawns sit on the upper boundary of the tile
    if (count === 1) {
      pawnEl.style.left = '50%';
      pawnEl.style.transform = 'translateX(-50%)';
      pawnEl.style.top = '-10px';
    } else if (count === 2) {
      if (index === 0) {
        pawnEl.style.left = '-3px';
        pawnEl.style.top = '-10px';
      } else {
        pawnEl.style.right = '-3px';
        pawnEl.style.left = 'auto';
        pawnEl.style.top = '-10px';
      }
    } else if (count === 3) {
      if (index === 0) {
        pawnEl.style.left = '-4px';
        pawnEl.style.top = '-10px';
      } else if (index === 1) {
        pawnEl.style.left = '50%';
        pawnEl.style.transform = 'translateX(-50%)';
        pawnEl.style.top = '-10px';
      } else {
        pawnEl.style.right = '-4px';
        pawnEl.style.left = 'auto';
        pawnEl.style.top = '-10px';
      }
    } else {
      // 4 pawns
      if (index === 0) {
        pawnEl.style.left = '-4px';
        pawnEl.style.top = '-12px';
      } else if (index === 1) {
        pawnEl.style.right = '-4px';
        pawnEl.style.left = 'auto';
        pawnEl.style.top = '-12px';
      } else if (index === 2) {
        pawnEl.style.left = '-4px';
        pawnEl.style.top = '10px';
      } else {
        pawnEl.style.right = '-4px';
        pawnEl.style.left = 'auto';
        pawnEl.style.top = '10px';
      }
    }
  }

  /* ============================================================
     BOARD RENDERING (28 Tiles in 7×4 S-Curve)
     ============================================================ */

  function renderBoard() {
    const grid = document.getElementById('board-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Map: tileNum → array of players currently on that tile
    const playersByTile = {};
    gameState.players.forEach(function (p) {
      if (!playersByTile[p.position]) playersByTile[p.position] = [];
      playersByTile[p.position].push(p);
    });

    const activePlayer = gameState.activePlayer;

    BOARD_HTML_ORDER.forEach(function (tileNum) {
      const tile = TILES[tileNum];
      if (!tile) return;

      const el = document.createElement('div');
      el.className = 'board-tile ' + (TILE_TYPE_CLASS[tile.type] || 'board-tile--path');
      el.dataset.tile = tileNum;
      el.setAttribute('role', 'gridcell');
      el.setAttribute('aria-label', 'Petak ' + tileNum + ' ' + tile.type);

      // Active tile highlight ring
      if (activePlayer && activePlayer.position === tileNum) {
        el.classList.add('board-tile--active');
      }

      // Tile content per type
      if (tile.type === 'START') {
        const flagWrap = document.createElement('span');
        flagWrap.className = 'tile-icon';
        flagWrap.innerHTML = renderIcon('flag', 15);
        el.appendChild(flagWrap);

        const label = document.createElement('span');
        label.className = 'tile-num';
        label.style.fontWeight = '800';
        label.textContent = 'START';
        el.appendChild(label);
      } else if (tile.type === 'FINISH') {
        const badge = document.createElement('span');
        badge.className = 'tile-corner-badge';
        badge.textContent = '28';
        el.appendChild(badge);

        const wrap = document.createElement('div');
        wrap.className = 'tile-finish-wrap';
        wrap.innerHTML = renderIcon('holiday_village', 16);

        const finishLbl = document.createElement('span');
        finishLbl.className = 'tile-finish-label';
        finishLbl.textContent = 'FINISH';
        wrap.appendChild(finishLbl);

        const subLbl = document.createElement('span');
        subLbl.className = 'tile-finish-sub';
        subLbl.textContent = 'Rumah Kasih';
        wrap.appendChild(subLbl);

        el.appendChild(wrap);
      } else if (tile.type === 'PATH') {
        const dot = document.createElement('span');
        dot.className = 'tile-path-dot';
        el.appendChild(dot);

        const num = document.createElement('span');
        num.className = 'tile-num';
        num.textContent = tileNum;
        el.appendChild(num);
      } else if (tile.label) {
        // BONUS (+2) or MINUS (-1)
        const badge = document.createElement('span');
        badge.className = 'tile-badge-text';
        badge.textContent = tile.label;
        el.appendChild(badge);

        const num = document.createElement('span');
        num.className = 'tile-num';
        num.textContent = tileNum;
        el.appendChild(num);
      } else if (tile.icon) {
        // HATI, CERITA, MIMPI, AKSI
        const iconWrap = document.createElement('span');
        iconWrap.className = 'tile-icon';
        iconWrap.innerHTML = renderIcon(tile.icon, 15);
        el.appendChild(iconWrap);

        const num = document.createElement('span');
        num.className = 'tile-num';
        num.textContent = tileNum;
        el.appendChild(num);
      }

      // Pawn container
      const pawnContainer = document.createElement('div');
      pawnContainer.className = 'pawn-container';

      const playersOnTile = playersByTile[tileNum] || [];
      const count = playersOnTile.length;

      playersOnTile.forEach(function (player, idx) {
        const pawnEl = document.createElement('div');
        pawnEl.className = 'pawn-token';

        const pawnBody = document.createElement('div');
        pawnBody.className = 'pawn-body' + (activePlayer && activePlayer.id === player.id ? ' pawn-body--active' : '');
        pawnBody.style.background = player.color;
        pawnBody.style.boxShadow = '0 3px 0 ' + player.shadowColor + ', 0 4px 6px rgba(0,0,0,0.3)';
        pawnBody.textContent = player.initial;

        const dropShadow = document.createElement('div');
        dropShadow.className = 'pawn-drop-shadow';

        pawnEl.appendChild(pawnBody);
        pawnEl.appendChild(dropShadow);

        applyPawnStagger(pawnEl, count, idx);
        pawnContainer.appendChild(pawnEl);
      });

      el.appendChild(pawnContainer);
      grid.appendChild(el);
    });
  }

  /* ============================================================
     HUD RENDERING (Active Player & Milestone Progress)
     ============================================================ */

  function renderHUD() {
    const player = gameState.activePlayer;
    if (!player) return;

    // Active Player Avatar
    const avatar = document.getElementById('hud-avatar');
    if (avatar) {
      avatar.textContent = player.initial;
      avatar.style.background = player.color;
      avatar.style.boxShadow = '0 3px 0 ' + player.shadowColor;
    }

    // Active Player Name
    const nameEl = document.getElementById('hud-player-name');
    if (nameEl) nameEl.textContent = player.name;

    // Active Player Step Counter
    const stepEl = document.getElementById('hud-player-step');
    if (stepEl) stepEl.textContent = i18n.t('game.hud.stepLabel', { pos: player.position });

    // Milestone Tracker
    renderMilestoneTracker();

    // Dice Footnote
    const footnote = document.getElementById('dice-footnote');
    if (footnote) {
      footnote.textContent = i18n.t('game.dice.footnote', { name: player.name });
    }
  }

  function renderMilestoneTracker() {
    const tracker = document.getElementById('milestone-tracker');
    const textEl = document.getElementById('hud-milestone-text');
    if (!tracker) return;

    const MILESTONE_COUNT = 6;
    const level = gameState.milestoneLevel;

    tracker.innerHTML = '';
    for (let i = 1; i <= MILESTONE_COUNT; i++) {
      const dot = document.createElement('div');
      dot.className = 'milestone-dot ';
      if (i <= level) {
        dot.className += 'milestone-dot--filled';
      } else if (i === level + 1) {
        dot.className += 'milestone-dot--current';
      } else {
        dot.className += 'milestone-dot--empty';
      }
      tracker.appendChild(dot);
    }

    if (textEl) {
      textEl.textContent = i18n.t('game.hud.milestoneOf', { current: level });
    }
  }

  /* ============================================================
     PLAYER ROSTER DOCK (2–4 Players)
     ============================================================ */

  function renderRoster() {
    const container = document.getElementById('player-roster');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < gameState.playerCount; i++) {
      const player = gameState.players[i];
      if (!player) continue;

      const card = document.createElement('div');
      card.className = 'player-roster-card';
      card.setAttribute('role', 'listitem');

      if (i === gameState.activePlayerIndex && !gameState.completionReady) {
        card.classList.add('player-roster-card--active');
      }

      const avatar = document.createElement('div');
      avatar.className = 'roster-avatar';
      avatar.style.background = player.color;
      avatar.style.boxShadow = '0 2px 0 ' + player.shadowColor;
      avatar.textContent = player.initial;
      card.appendChild(avatar);

      const name = document.createElement('span');
      name.className = 'roster-name';
      name.textContent = player.name;
      card.appendChild(name);

      const pos = document.createElement('span');
      pos.className = 'roster-pos';
      pos.textContent = i18n.t('game.hud.stepLabel', { pos: player.position });
      card.appendChild(pos);

      container.appendChild(card);
    }

    container.style.gridTemplateColumns = 'repeat(' + gameState.playerCount + ', 1fr)';
  }

  /* ============================================================
     TACTILE 6-SIDED DIE RENDERING
     Pip face positions as percentages of the 64×64 die face.
     ============================================================ */

  const PIP_LAYOUTS = {
    1: [
      [50, 50]
    ],
    2: [
      [75, 25],
      [25, 75]
    ],
    3: [
      [75, 25],
      [50, 50],
      [25, 75]
    ],
    4: [
      [25, 25],
      [75, 25],
      [25, 75],
      [75, 75]
    ],
    5: [
      [25, 25],
      [75, 25],
      [50, 50],
      [25, 75],
      [75, 75]
    ],
    6: [
      [25, 22],
      [25, 50],
      [25, 78],
      [75, 22],
      [75, 50],
      [75, 78]
    ]
  };

  function renderDieFace(value) {
    const dieEl = document.getElementById('dice-face');
    if (!dieEl) return;

    dieEl.querySelectorAll('.pip').forEach(function (p) { p.remove(); });

    const pips = PIP_LAYOUTS[value] || PIP_LAYOUTS[4];
    pips.forEach(function (coords) {
      const pip = document.createElement('div');
      pip.className = 'pip';
      pip.style.left = coords[0] + '%';
      pip.style.top  = coords[1] + '%';
      dieEl.appendChild(pip);
    });

    dieEl.setAttribute('aria-label', 'Dadu muka ' + value);
  }

  /* Lightweight roll animation (intermediate faces, no zero-iteration) */
  function animateDie(finalValue, callback) {
    const dieEl = document.getElementById('dice-face');
    if (!dieEl) { callback(); return; }

    dieEl.classList.add('dice-face--rolling');

    let count = 0;
    const interval = setInterval(function () {
      count++;
      const interim = Math.floor(Math.random() * 6) + 1;
      renderDieFace(interim);

      if (count >= 6) {
        clearInterval(interval);
        dieEl.classList.remove('dice-face--rolling');
        renderDieFace(finalValue);
        callback();
      }
    }, 90);
  }

  /* ============================================================
     MILESTONE UPDATE
     Thresholds: Tile 5, Tile 9, Tile 14, Tile 19, Tile 23, Tile 28
     ============================================================ */

  const MILESTONE_THRESHOLDS = [5, 9, 14, 19, 23, 28];

  function updateMilestone() {
    let maxReached = 0;
    gameState.players.forEach(function (p) {
      MILESTONE_THRESHOLDS.forEach(function (threshold, idx) {
        if (p.position >= threshold) {
          maxReached = Math.max(maxReached, idx + 1);
        }
      });
    });
    gameState.milestoneLevel = maxReached;
  }

  /* ============================================================
     MOVEMENT ENGINE (Roll → Move → Resolve Tile → Advance Turn)
     ============================================================ */

  function rollAndMove() {
    if (gameState.rollingState || gameState.completionReady) return;

    gameState.rollingState = true;
    updateRollButton(true);

    const roll = Math.floor(Math.random() * 6) + 1;

    animateDie(roll, function () {
      gameState.diceValue = roll;
      gameState.rollingState = false;

      const player = gameState.activePlayer;
      let newPos = Math.min(player.position + roll, 28);
      player.position = newPos;

      const tile = TILES[newPos];

      // Resolve tile effect
      if (tile.type === 'BONUS') {
        player.position = Math.min(newPos + 2, 28);
        showToast(i18n.t('game.tile.plus2'));
      } else if (tile.type === 'MINUS') {
        player.position = Math.max(newPos - 1, 1);
        showToast(i18n.t('game.tile.minus1'));
      } else if (['HATI', 'CERITA', 'MIMPI', 'AKSI'].includes(tile.type)) {
        
        player.cardsCompleted = (player.cardsCompleted || 0) + 1;

        // Store card event and trigger modal
        gameState.pendingCardEvent = {
          playerId: player.id,
          playerName: player.name,
          tileType: tile.type,
          tileNum: player.position
        };
        showToast(i18n.t('game.tile.card', { type: tile.type, name: player.name }));
        
        // Trigger card modal
        if (window.CardModal && window.CardModal.open) {
          setTimeout(function () {
            window.CardModal.open(tile.type, {
              id: player.id,
              name: player.name,
              customName: player.customName,
              color: player.color,
              initial: player.initial || (player.name ? player.name.charAt(0).toUpperCase() : '?'),
              position: player.position
            });
          }, 500);
        }
      }

      // Cooperative finish: mark this player as finished; game continues
      if (player.position >= 28) {
        player.finished = true;
        showToast(i18n.t('game.tile.finish', { name: player.name }));
      }

      // Update milestone
      updateMilestone();

      // Advance turn — hook for modal continue
      function advanceTurn() {
        var nextIdx = (gameState.activePlayerIndex + 1) % gameState.playerCount;
        var loops = 0;
        while (gameState.players[nextIdx].finished && loops < gameState.playerCount) {
          nextIdx = (nextIdx + 1) % gameState.playerCount;
          loops++;
        }
        gameState.activePlayerIndex = nextIdx;
        
        // All-finished check
        var allFinished = gameState.players.every(function (p) { return p.finished; });
        if (allFinished) {
          gameState.completionReady = true;
          updateRollButton(true);
          showGameOver(gameState.players[0]);
        }

        renderBoard();
        renderHUD();
        renderRoster();
        if (!gameState.completionReady) {
          updateRollButton(false);
        }
      }

      // If we are NOT in a card event, advance now
      if (!gameState.pendingCardEvent) {
        advanceTurn();
      } else {
        // Expose to card modal to advance later
        window.__jkGame = {
          onCardContinue: function() {
            gameState.pendingCardEvent = null;
            advanceTurn();
          }
        };
      }
    });
  }

  function updateRollButton(disabled) {
    const btn = document.getElementById('btn-roll');
    if (btn) {
      btn.disabled = disabled || gameState.completionReady;
    }
  }

  /* ============================================================
     TOAST NOTIFICATION SYSTEM
     ============================================================ */

  let toastTimer = null;

  function showToast(message) {
    const toast = document.getElementById('game-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('game-toast--visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('game-toast--visible');
    }, 2800);
  }

  /* ============================================================
     GAME OVER OVERLAY
     ============================================================ */
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showGameOver() {
  const overlay = document.getElementById('completion-overlay');
  if (!overlay) return;

  const grid = document.getElementById('completion-player-grid');
  if (!grid) return;

  const roleKeys = {
    1: 'player.1.role',
    2: 'player.2.role',
    3: 'player.3.role',
    4: 'player.4.role'
  };

  const honorKeys = {
    1: 'player.1.honor',
    2: 'player.2.honor',
    3: 'player.3.honor',
    4: 'player.4.honor'
  };

  const colors = {
    1: '#1E3F2D',
    2: '#E6A23C',
    3: '#E27D60',
    4: '#6890AA'
  };

  const softColors = {
    1: '#C6ECD2',
    2: '#FFDBD1',
    3: '#FFE0D8',
    4: '#E3E8EA'
  };

  grid.innerHTML = gameState.players.map(function (p) {
    const color = colors[p.id] || p.color || '#1E3F2D';
    const soft = softColors[p.id] || '#EAF0EC';

    return `
      <article class="completion-player-card">
        <div
          class="completion-role"
          style="background:${color};"
        >
          <span
            class="completion-role-dot"
            style="background:rgba(255,255,255,.75);"
          ></span>
          ${i18n.t(roleKeys[p.id] || 'player.1.role')}
        </div>

        <div
          class="completion-avatar"
          style="
            background:${soft};
            color:${color};
          "
        >
          ${p.initial}
          <span
            style="
              position:absolute;
              right:20px;
              bottom:72px;
              width:16px;
              height:16px;
              display:grid;
              place-items:center;
              border-radius:50%;
              background:${color};
              color:#fff;
              font-size:10px;
            "
          >✓</span>
        </div>

        <div class="completion-name">
          ${escapeHtml(p.name)}
        </div>

        <div
          class="completion-honor"
          style="
            background:${soft};
            color:${color};
          "
        >
          ${i18n.t(honorKeys[p.id] || 'player.1.honor')}
        </div>

        <div class="completion-missions">
          ✓ ${p.cardsCompleted || 0} ${i18n.t('completion.missions')}
        </div>
      </article>
    `;
  }).join('');

  overlay.style.display = 'block';
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

  // Setup buttons
  document.addEventListener('DOMContentLoaded', () => {

    // Back / exit confirmation
    const btnBack = document.getElementById('btn-back');
    const exitModal = document.getElementById('exit-confirm-modal');
    const btnExitCancel = document.getElementById('btn-exit-cancel');
    const btnExitConfirm = document.getElementById('btn-exit-confirm');

    function openExitConfirmation() {
      if (!exitModal) return;

      exitModal.style.display = 'flex';
      exitModal.setAttribute('aria-hidden', 'false');
    }

    function closeExitConfirmation() {
      if (!exitModal) return;

      exitModal.style.removeProperty('display');
      exitModal.setAttribute('aria-hidden', 'true');
    }

    if (btnBack) {
      btnBack.addEventListener('click', openExitConfirmation);
    }

    if (btnExitCancel) {
      btnExitCancel.addEventListener('click', closeExitConfirmation);
    }

    if (exitModal) {
      exitModal.addEventListener('click', function (event) {
        if (event.target === exitModal) {
          closeExitConfirmation();
        }
      });
    }

    if (btnExitConfirm) {
      btnExitConfirm.addEventListener('click', function () {
        sessionStorage.removeItem('jelajahkita.gameSetup');
        sessionStorage.removeItem('jelajahkita.gameState');

        window.location.href = 'index.html';
      });
    }


    const btnNew = document.getElementById('btn-new-adventure');
    if (btnNew) {
      btnNew.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  });

  /* ============================================================
     RULES MODAL (How to Play)
     ============================================================ */

  function openRulesModal() {
    const bg = document.getElementById('rules-modal-bg');
    if (bg) bg.classList.add('rules-modal-bg--visible');
  }

  function closeRulesModal() {
    const bg = document.getElementById('rules-modal-bg');
    if (bg) bg.classList.remove('rules-modal-bg--visible');
  }

  /* ============================================================
     LANGUAGE TOGGLE (Preserves all game state)
     ============================================================ */

  function toggleLanguage() {
    const nextLang = i18n.currentLanguage === 'id' ? 'en' : 'id';
    i18n.setLanguage(nextLang);
  }

  function onLanguageChanged() {
    i18n.updateDOM();
    renderHUD();
    renderRoster();
    renderLegend();

    const btnLang = document.getElementById('btn-lang');
    if (btnLang) btnLang.textContent = i18n.t('game.lang.toggle');
  }

  /* ============================================================
     EVENT LISTENERS & BINDINGS
     ============================================================ */

  function wireEvents() {
    // Roll button
    const btnRoll = document.getElementById('btn-roll');
    if (btnRoll) {
      btnRoll.addEventListener('click', rollAndMove);
    }

    // Die face tap
    const diceFace = document.getElementById('dice-face');
    if (diceFace) {
      diceFace.addEventListener('click', rollAndMove);
      diceFace.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          rollAndMove();
        }
      });
    }

    // Rules modal triggers (header and HUD)
    const btnRules = document.getElementById('btn-rules');
    if (btnRules) btnRules.addEventListener('click', openRulesModal);

    const hudRulesBtn = document.getElementById('hud-rules-btn');
    if (hudRulesBtn) hudRulesBtn.addEventListener('click', openRulesModal);

    const btnRulesClose = document.getElementById('btn-rules-close');
    if (btnRulesClose) btnRulesClose.addEventListener('click', closeRulesModal);

    const rulesBg = document.getElementById('rules-modal-bg');
    if (rulesBg) {
      rulesBg.addEventListener('click', function (e) {
        if (e.target === rulesBg) closeRulesModal();
      });
    }

    // Language toggle
    const btnLang = document.getElementById('btn-lang');
    if (btnLang) btnLang.addEventListener('click', toggleLanguage);

    window.addEventListener('languageChanged', onLanguageChanged);

    // Play again button
    const btnPlayAgain = document.getElementById('btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', function () {
        window.location.href = 'index.html';
      });
    }
  }

  /* ============================================================
     BOOTSTRAP & INITIALIZATION
     ============================================================ */

  function bootstrap() {
    // 1. Initialize state from sessionStorage or fallback
    initGame();

    // 2. Apply translations to DOM
    i18n.updateDOM();

    // 3. Set static SVG icons
    const headerRulesIcon = document.getElementById('header-rules-icon');
    if (headerRulesIcon) headerRulesIcon.innerHTML = renderIcon('menu_book', 18);

    const hudRulesIcon = document.getElementById('hud-rules-icon');
    if (hudRulesIcon) hudRulesIcon.innerHTML = renderIcon('menu_book', 18);

    const rulesBookIcon = document.getElementById('rules-book-icon');
    if (rulesBookIcon) rulesBookIcon.innerHTML = renderIcon('menu_book', 18);

    const templeIcon = document.getElementById('milestone-temple-icon');
    if (templeIcon) templeIcon.innerHTML = renderIcon('temple_buddhist', 16);

    const rollIcon = document.getElementById('roll-btn-icon');
    if (rollIcon) rollIcon.innerHTML = renderIcon('casino', 22);

    const voiceIcon = document.getElementById('footnote-voice-icon');
    if (voiceIcon) voiceIcon.innerHTML = renderIcon('record_voice_over', 14);

    const btnLang = document.getElementById('btn-lang');
    if (btnLang) btnLang.textContent = i18n.t('game.lang.toggle');

    // 4. Wire events
    wireEvents();

    // 5. Render components
    renderLegend();
    renderBoard();
    renderDieFace(4); // Default to face 4 matching Stitch mockup
    renderHUD();
    renderRoster();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  // Expose minimal state for visual testing and inspection
  window.__jkGame = {
    getState: function () { return gameState; },
    roll: rollAndMove,
    showToast: showToast
  };

})();
