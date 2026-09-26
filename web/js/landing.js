// JelajahKita Landing Page Script
// Language toggle + scroll interactions. No game logic.

document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('[data-lang]');
  const ACTIVE = "bg-surface-container-lowest text-primary shadow-[0_1px_2px_rgba(44,43,40,0.08)]".split(' ');
  const INACTIVE = "text-on-surface-variant hover:text-on-surface transition-colors".split(' ');

  function updateLangToggle() {
    const cur = window.i18n ? window.i18n.currentLanguage : 'id';
    langButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === cur;
      if (isActive) {
        INACTIVE.forEach(c => btn.classList.remove(c));
        ACTIVE.forEach(c => btn.classList.add(c));
      } else {
        ACTIVE.forEach(c => btn.classList.remove(c));
        INACTIVE.forEach(c => btn.classList.add(c));
      }
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang && window.i18n && lang !== window.i18n.currentLanguage) {
        window.i18n.setLanguage(lang);
      }
    });
  });

  window.addEventListener('languageChanged', updateLangToggle);
  updateLangToggle();
  if (window.i18n) window.i18n.updateDOM();
});
