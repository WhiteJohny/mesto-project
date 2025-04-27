const clickHandler = (evt) => {
    const overlay = document.querySelector('.popup_is-opened');

    if (!overlay) return;

    const overlayElement = overlay.querySelector('.popup__content');
    if (!overlayElement) return;

    if (!overlayElement.contains(evt.target)) {
        closeModal(overlay);
    }
};

const escHandler = (evt) => {
    if (evt.key === 'Escape') {
        const overlay = document.querySelector('.popup_is-opened');
        if (overlay) {
            closeModal(overlay);
        }
    }
};

const openModal = (popup) => {
    document.addEventListener('keydown', escHandler);
    document.addEventListener('click', clickHandler);
    popup.classList.add('popup_is-opened');
};

const closeModal = (popup) => {      
    document.removeEventListener('keydown', escHandler);
    document.removeEventListener('click', clickHandler);
    popup.classList.remove('popup_is-opened');
};

export { openModal, closeModal };
