'use-strict'

const dropdownCollapsLabel = '.dropdown-list__item--collapse .dropdown-list__label',
      dropdownItem = [ ...document.querySelectorAll(dropdownCollapsLabel) ],
      openClass    = 'dropdown-list__item--open',
      contentClass = 'dropdown-list__content',
      wideOpenClass = 'is-open-screen-m',
      wideOpenMq = '(min-width: 768px)';

function setListHeight(item) {
  return Array.from(item.children)
    .map(elem => elem.clientHeight)
    .reduce((a, b) => a + b, 0);
}

function setAriaAttributes(label, content, expanded) {
  if (expanded) {
    label.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');
  }
  else {
    label.setAttribute('aria-expanded', 'true');
    content.setAttribute('aria-hidden', 'false');
  }
}

function isWideOpen(dropdownBlock) {
  return (dropdownBlock.classList.contains(wideOpenClass)) && window.matchMedia(wideOpenMq).matches;
}

function resetMqWideOpen(item) {
  const dropdownItem = item.parentNode,
        dropdownContent = dropdownItem.querySelector(`.${contentClass}`);

  if (window.matchMedia(wideOpenMq).matches) {
    dropdownContent.style.height = 'auto';
    dropdownItem.classList.remove(openClass);
    setAriaAttributes(item, dropdownContent, true);
  }
  else {
    dropdownContent.style.height = 0;
    dropdownItem.classList.remove(openClass);
    setAriaAttributes(item, dropdownContent, false);
  }
}

function toggleContent(item) {
  const dropdownId      = item.dataset.dropdown,
        dropdownItem    = item.parentNode,
        dropdownContent = dropdownItem.querySelector(`.${contentClass}[data-content="${dropdownId}"]`),
        dropdownBlock   = item.closest('.dropdown-list');

  if (!isWideOpen(dropdownBlock)) {
    if (dropdownContent.clientHeight > 0) {
      dropdownContent.style.height = 0;
      dropdownItem.classList.remove(openClass);
      setAriaAttributes(item, dropdownContent, true);
    }
    else {
      dropdownContent.style.height = `${setListHeight(dropdownContent)}px`;
      dropdownItem.classList.add(openClass);
      setAriaAttributes(item, dropdownContent, false);
    }
  }
  else {
    dropdownContent.style.height = 'auto';
    dropdownItem.classList.remove(openClass);
    setAriaAttributes(item, dropdownContent, false);
  }
}

dropdownItem.forEach(
  key => key.addEventListener('click', (e) => {
    e.preventDefault();
    toggleContent(key, false);
  }, false)
);

window.addEventListener('resize', () => {
  const dropdownWideOpen = document.querySelector(`.${wideOpenClass}`);
  if (dropdownWideOpen) {
    const dropdownItems =  [ ...dropdownWideOpen.querySelectorAll(dropdownCollapsLabel)];
    dropdownItems.forEach(key => resetMqWideOpen(key));
  }
});
