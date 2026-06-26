// Detect RTL language tags and apply page direction without changing the content language.
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

function getPrimaryLanguage(languageTag) {
  return (languageTag || 'en').toLowerCase().split('-')[0];
}

function setAttributeIfChanged(element, attributeName, value) {
  if (element.getAttribute(attributeName) !== value) {
    element.setAttribute(attributeName, value);
  }
}

function updatePageDirection() {
  const htmlElement = document.documentElement;
  const primaryLanguage = getPrimaryLanguage(htmlElement.getAttribute('lang'));
  const direction = rtlLanguages.includes(primaryLanguage) ? 'rtl' : 'ltr';

  setAttributeIfChanged(htmlElement, 'dir', direction);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
      updatePageDirection();
    }
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['lang'],
});

document.addEventListener('DOMContentLoaded', updatePageDirection);
