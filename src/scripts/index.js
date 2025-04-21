const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

function openModal(popup) {
    document.addEventListener('keydown', escHandler);
    document.addEventListener('click', clickHandler);
    popup.classList.add('popup_is-opened');
};

function closeModal(popup) {      
    document.removeEventListener('keydown', escHandler);
    document.removeEventListener('click', clickHandler);
    popup.classList.remove('popup_is-opened');
};

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function (evt) {
    profilePopup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    profilePopup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup);
    evt.stopPropagation();
});

const popupProfileCloseButton = profilePopup.querySelector('.popup__close');
popupProfileCloseButton.addEventListener('click', function () {
    closeModal(profilePopup);
});

const profileFormElement = document.querySelector('.popup_type_edit').querySelector('.popup__form');

const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    const title = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description')

    title.textContent = name;
    description.textContent = job;
};

profileFormElement.addEventListener('submit', function (evt) {
    handleProfileFormSubmit(evt);
    closeModal(profilePopup);
});

const cardAddButton = document.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', function (evt) {
    openModal(cardPopup);
    evt.stopPropagation();
});

const popupCardProfileCloseButton = cardPopup.querySelector('.popup__close');
popupCardProfileCloseButton.addEventListener('click', function () {
    closeModal(cardPopup);
});

const cardFormElement = document.querySelector('.popup_type_new-card').querySelector('.popup__form');

const textInput = cardFormElement.querySelector('.popup__input_type_card-name');
const urlInput = cardFormElement.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const text = textInput.value;
    const url = urlInput.value;

    function createCard() {
        const cardTempalte = document.querySelector('#card-template').content;
        const cardElement = cardTempalte.querySelector('.card').cloneNode(true);

        cardElement.querySelector('.card__image').src = url;
        cardElement.querySelector('.card__image').alt = text;
        cardElement.querySelector('.card__description').querySelector('.card__title').textContent = text;

        const cardDeleteButton = cardElement.querySelector('.card__delete-button')
        cardDeleteButton.addEventListener('click', function (evt) {
            evt.target.closest('.card').remove();
        });

        const cardLikeButton = cardElement.querySelector('.card__like-button')
        cardLikeButton.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__like-button_is-active');
        });

        const imageOpenButton = cardElement.querySelector('.card__image');
        imageOpenButton.addEventListener('click', function (evt) {
            image = imagePopup.querySelector('.popup__image');
            image.src = evt.target.src;
            image.alt = evt.target.alt;
            imagePopup.querySelector('.popup__caption').textContent = evt.target.alt;
            openModal(imagePopup);
            evt.stopPropagation();
        });

        return cardElement;
    };
    
    const placesList = document.querySelector('.places__list');
    placesList.prepend(createCard());      
};

cardFormElement.addEventListener('submit', function (evt) {
    handleCardFormSubmit(evt);
    closeModal(cardPopup);
});

const popupImageCloseButton = imagePopup.querySelector('.popup__close');
popupImageCloseButton.addEventListener('click', function () {
    closeModal(imagePopup);
});

// ------------------------------------------------------------------------------------------------------

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('[class$="form"]'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__button_inactive');
        buttonElement.removeAttribute('disabled', true);
    }
};

enableValidation();
  
// ------------------------------------------------------------------------------------------------------

const clickHandler = (evt) => {
    const overlay = document.querySelector('.popup_is-opened');
    if (overlay) {
        overlayElement = overlay.querySelector('.popup__content');
    } else {
        return;
    }

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
