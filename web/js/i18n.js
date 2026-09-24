// JelajahKita Internationalization (i18n) Foundation
// 100% Offline, Zero Network Dependency

const i18n = {
  currentLanguage: 'id',

  translations: {
    en: {
      'app.title': 'JELAJAHKITA',
      'app.tagline': 'Play together, grow together.',
      'app.edition': 'Family Board Edition',

      'playerSetup.heading': 'Who joins the adventure?',
      'playerSetup.subheading': 'Choose the number of adventurers & set their names.',
      'playerSetup.ariaCount': 'Number of Adventurers',
      'playerSetup.player': 'Player',
      'playerSetup.pion': 'Pawn',

      'playerCount.2': '2 Adventurers',
      'playerCount.3': '3 Adventurers',
      'playerCount.4': '4 Adventurers',

      'player.1.name': 'MIke',
      'player.1.role': 'Heart Keeper',
      'player.1.pion': 'Green',
      'player.1.honor': 'Warm Storyteller',

      'player.2.name': 'Hana',
      'player.2.role': 'Dream Keeper',
      'player.2.pion': 'Amber',
      'player.2.honor': 'Dream Weaver',

      'player.3.name': 'Nastya',
      'player.3.role': 'Joyful Explorer',
      'player.3.pion': 'Coral',
      'player.3.honor': 'Brave Explorer',

      'player.4.name': 'James',
      'player.4.role': 'Story Bringer',
      'player.4.pion': 'Lake Blue',
      'player.4.honor': 'Smile Spreader',

      'button.edit': 'Edit name of',
      'button.start': 'Start Adventure',

      'info.text': 'Each player will take turns rolling the die and revealing family story cards!',
      'info.footer': '🎲 Game Board Ready to Play',
      'playerSetup.alertStarting': 'Starting adventure with {count} adventurers!\n\n(Main Game Screen will be implemented in Phase 2)',

      'game.title': 'Meja Petualangan',
      'game.hud.turnLabel': 'Adventurer Turn',
      'game.hud.stepLabel': 'Step {pos}',
      'game.hud.missionLabel': 'Harmony Mission',
      'game.hud.milestoneLabel': 'Pos Harapan',
      'game.hud.milestoneOf': 'Pos {current} / 6',
      'game.dice.ready': 'Dice Ready to Roll',
      'game.dice.instruction': 'Tap the die or the button below to determine your step distance.',
      'game.dice.rollBtn': 'Roll Dice & Explore!',
      'game.dice.footnote': "It's {name}'s turn to roll the dice.",
      'game.tile.plus2': '🎉 Bonus Step! Move +2 forward!',
      'game.tile.minus1': '😌 Take a breath! Step -1 back.',
      'game.tile.card': '🃏 {type} Card! {name} drew a family card.',
      'game.tile.finish': '🏠 {name} reached Rumah Kasih!',
      'game.legend.hati': 'Heart',
      'game.legend.cerita': 'Story',
      'game.legend.mimpi': 'Dream',
      'game.legend.aksi': 'Action',
      'game.legend.bonus': 'Bonus',
      'game.rules.title': 'How to Play JelajahKita',
      'game.rules.body': 'Take turns rolling the dice in family order. Each tile has a warm family reflection card: Heart, Story, Dream, or Action Together. Reach Tile 28 to celebrate Rumah Kasih!',
      'game.rules.btn': 'Got it, continue!',
      'game.lang.toggle': 'EN',
      'card.speaker': 'Giliran',
      'card.speaker-to-share': 'untuk bercerita',
      'card.action-continue': 'Lanjut Langkah Berikutnya',
      'card.action-replace': 'Ganti dengan kartu lain',
      'card.footer': 'Tidak ada jawaban salah. Semua cerita dirayakan bersama.',
      'completion.badge': 'Shared Mission Complete',
      'completion.title': 'FAMILY THAT FINISHES TOGETHER',
      'completion.subtitle': '28 adventure steps, 12 stories shared, 1 memory to keep.',
      'completion.harmony-title': 'Adventure Harmony',
      'completion.harmony-subtitle': '100% Completed With Love',
      'completion.memory-title': 'Today’s Memory Notes',
      'completion.memory-subtitle': 'Final Chapter',
      'completion.memory-dream-label': 'FAMILY DREAM DESTINATION',
      'completion.memory-dream': 'White Sand Beach',
      'completion.memory-moment-label': 'MOST MEMORABLE MOMENT',
      'completion.memory-moment': 'Papa’s first bicycle story',
      'completion.memory-promise-label': 'OUR FAMILY PROMISE',
      'completion.memory-promise': 'Cook Sunday breakfast together',
      'completion.action-save': 'Save Memory Notes',
      'completion.action-new': 'Start New Adventure',
      'completion.footer': 'JelajahKita • Play together, grow together.',
      'completion.missions': 'missions completed',

      'game.exit.title': 'End the Adventure?',
      'game.exit.message': 'Your current journey will be stopped. Are you sure you want to return to player setup?',
      'game.exit.cancel': 'Continue Adventure',
      'game.exit.confirm': 'End Adventure',
    },
    id: {
      'app.title': 'JELAJAHKITA',
      'app.tagline': 'Bermain bersama, tumbuh bersama.',
      'app.edition': 'Edisi Meja Keluarga',

      'playerSetup.heading': 'Siapa yang ikut bermain?',
      'playerSetup.subheading': 'Pilih jumlah petualang & tentukan nama masing-masing.',
      'playerSetup.ariaCount': 'Jumlah Petualang',
      'playerSetup.player': 'Pemain',
      'playerSetup.pion': 'Pion',

      'playerCount.2': '2 Petualang',
      'playerCount.3': '3 Petualang',
      'playerCount.4': '4 Petualang',

      'player.1.name': 'Maryono',
      'player.1.role': 'Penyala Hati',
      'player.1.pion': 'Hijau',
      'player.1.honor': 'Pencerita Hangat',

      'player.2.name': 'Ayu',
      'player.2.role': 'Penjaga Mimpi',
      'player.2.pion': 'Amber',
      'player.2.honor': 'Penenun Mimpi',

      'player.3.name': 'Dika',
      'player.3.role': 'Penjelajah Berani',
      'player.3.pion': 'Koral',
      'player.3.honor': 'Penjelajah Berani',

      'player.4.name': 'Siti',
      'player.4.role': 'Pembawa Cerita',
      'player.4.pion': 'Biru Danau',
      'player.4.honor': 'Penebar Senyum',

      'button.edit': 'Ubah Nama',
      'button.start': 'Mulai Petualangan',

      'info.text': 'Setiap pemain akan bergiliran melempar dadu dan membuka kartu misi cerita keluarga!',
      'info.footer': '🎲 Papan Permainan Siap Digelar',
      'playerSetup.alertStarting': 'Memulai petualangan dengan {count} petualang!\n\n(Layar Main Game akan diimplementasikan pada Fase 2)',

      'game.title': 'Meja Petualangan',
      'game.hud.turnLabel': 'Giliran Petualang',
      'game.hud.stepLabel': 'Langkah {pos}',
      'game.hud.missionLabel': 'Misi Harmoni',
      'game.hud.milestoneLabel': 'Pos Harapan',
      'game.hud.milestoneOf': 'Pos {current} / 6',
      'game.dice.ready': 'Dadu Siap Dikocok',
      'game.dice.instruction': 'Sentuh dadu atau tombol di bawah untuk menentukan jarak melangkah.',
      'game.dice.rollBtn': 'Lempar Dadu & Jelajah!',
      'game.dice.footnote': 'Giliran {name} melempar dadu.',
      'game.tile.plus2': '🎉 Bonus Langkah! Maju +2!',
      'game.tile.minus1': '😌 Rehat sejenak! Mundur 1 langkah.',
      'game.tile.card': '🃏 Kartu {type}! {name} membuka kartu cerita keluarga.',
      'game.tile.finish': '🏠 {name} tiba di Rumah Kasih!',
      'game.legend.hati': 'Hati',
      'game.legend.cerita': 'Cerita',
      'game.legend.mimpi': 'Mimpi',
      'game.legend.aksi': 'Aksi',
      'game.legend.bonus': 'Bonus',
      'game.rules.title': 'Aturan Main JelajahKita',
      'game.rules.body': 'Kocok dadu secara bergantian sesuai urutan keluarga. Setiap petak memiliki kartu refleksi hangat: Hati, Cerita, Mimpi, atau Aksi Bersama. Capai Petak 28 untuk merayakan Rumah Kasih!',
      'game.rules.btn': 'Mengerti, Lanjutkan!',
      'game.lang.toggle': 'ID',
      'card.speaker': 'Giliran',
      'card.speaker-to-share': 'untuk bercerita',
      'card.action-continue': 'Lanjut Langkah Berikutnya',
      'card.action-replace': 'Ganti dengan kartu lain',
      'card.footer': 'Tidak ada jawaban salah. Semua cerita dirayakan bersama.',
      'completion.badge': 'Misi Bersama Terwujud',
      'completion.title': 'KELUARGA YANG MENYELESAIKAN BERSAMA',
      'completion.subtitle': '28 langkah petualangan, 12 cerita terungkap, 1 kenangan abadi.',
      'completion.harmony-title': 'Harmoni Petualang',
      'completion.harmony-subtitle': '100% Selesai Penuh Cinta',
      'completion.memory-title': 'Catatan Kenangan Hari Ini',
      'completion.memory-subtitle': 'Babak Final',
      'completion.memory-dream-label': 'TEMPAT IMPIAN KELUARGA',
      'completion.memory-dream': 'Pantai Pasir Putih',
      'completion.memory-moment-label': 'MOMEN PALING BERKESAN',
      'completion.memory-moment': 'Kisah sepeda pertama',
      'completion.memory-promise-label': 'JANJI BERSAMA',
      'completion.memory-promise': 'Masak sarapan bersama hari Minggu',
      'completion.action-save': 'Simpan Catatan Kenangan',
      'completion.action-new': 'Mulai Petualangan Baru',
      'completion.footer': 'JelajahKita • Bermain bersama, tumbuh bersama.',
      'completion.missions': 'misi selesai',

      'game.exit.title': 'Akhiri Petualangan?',
      'game.exit.message': 'Perjalanan yang sedang berlangsung akan dihentikan. Yakin ingin kembali ke persiapan permainan?',
      'game.exit.cancel': 'Lanjutkan Petualangan',
      'game.exit.confirm': 'Akhiri Petualangan',
    }
  },

  t(key, params = {}, defaultValue = key) {
    const lang = this.currentLanguage;
    let value = this.translations[lang] ? this.translations[lang][key] : undefined;

    if (value === undefined && this.translations['id']) {
      value = this.translations['id'][key];
    }

    if (value === undefined) {
      return defaultValue;
    }

    if (typeof value === 'string' && params && typeof params === 'object') {
      return value.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`));
    }

    return value;
  },

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      try {
        localStorage.setItem('jelajahkita.language', lang);
      } catch (e) {
        // LocalStorage might be disabled in strict WebView contexts
      }
      this.updateDOM();
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
  },

  init() {
    // 1. Check URL query parameter (e.g. ?lang=en or ?lang=id)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && this.translations[urlLang]) {
        this.currentLanguage = urlLang;
        return;
      }
    } catch (e) {}

    // 2. Check localStorage
    try {
      const saved = localStorage.getItem('jelajahkita.language');
      if (saved && this.translations[saved]) {
        this.currentLanguage = saved;
        return;
      }
    } catch (e) {}

    // 3. Default to 'id'
    this.currentLanguage = 'id';
  },

  updateDOM() {
    // Set document lang attribute
    document.documentElement.setAttribute('lang', this.currentLanguage);

    // Update text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      el.textContent = text;
    });

    // Update element attributes (e.g. data-i18n-attr="aria-label:key")
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const raw = el.getAttribute('data-i18n-attr');
      raw.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key) {
          el.setAttribute(attr, this.t(key));
        }
      });
    });
  }
};

// Expose globally
window.i18n = i18n;
window.setLanguage = (lang) => i18n.setLanguage(lang);

i18n.init();
