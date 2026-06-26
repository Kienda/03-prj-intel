// Detect RTL languages and apply page direction automatically.
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

function updatePageDirection() {
  const htmlElement = document.documentElement;
  const languageTag = htmlElement.getAttribute('lang') || navigator.language || 'en';
  const primaryLanguage = languageTag.toLowerCase().split('-')[0];

  if (rtlLanguages.includes(primaryLanguage)) {
    htmlElement.setAttribute('dir', 'rtl');
    htmlElement.setAttribute('lang', primaryLanguage);
    htmlElement.style.textAlign = 'right';
    document.body.style.textAlign = 'right';
  } else {
    htmlElement.setAttribute('dir', 'ltr');
    htmlElement.setAttribute('lang', primaryLanguage);
    htmlElement.style.textAlign = 'left';
    document.body.style.textAlign = 'left';
  }
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
      updatePageDirection();
    }
  }
});

observer.observe(document.documentElement, { attributes: true });

document.addEventListener('DOMContentLoaded', updatePageDirection);
window.addEventListener('load', updatePageDirection);
