import './pages/index.css';

import './images/logo.svg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/delete-icon.svg';
import './images/close.svg';
import './images/add-icon.svg';
import './images/edit-icon.svg';
import './images/avatar.jpg';
import './images/card_1.jpg';
import './images/card_2.jpg';
import './images/card_3.jpg';

import { initialCards } from './components/cards.js';
import { cardDelete, cardLike, createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation } from './components/validate.js';

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    const title = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description')

    title.textContent = name;
    description.textContent = job;
};

const cardImage = (cardElement) => {
    const imageOpenButton = cardElement.querySelector('.card__image');
    imageOpenButton.addEventListener('click', (evt) => {
        const image = imagePopup.querySelector('.popup__image');
        image.src = evt.target.src;
        image.alt = evt.target.alt;
        imagePopup.querySelector('.popup__caption').textContent = evt.target.alt;
        openModal(imagePopup);
        evt.stopPropagation();
    });
};

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();

    const name = textInput.value;
    const link = urlInput.value;

    const cardElement = createCard(name, link);
    cardDelete(cardElement);
    cardLike(cardElement);
    cardImage(cardElement);
    
    const placesList = document.querySelector('.places__list');
    placesList.prepend(cardElement);      
};

const addCards = (cardsList) => {
    const placesList = document.querySelector('.places__list');
    cardsList.forEach((card) => {
        const cardElement = createCard(card.name, card.link);
        cardDelete(cardElement);
        cardLike(cardElement);
        cardImage(cardElement);
        placesList.append(cardElement);
    });
};

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', (evt) => {
    profilePopup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    profilePopup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup);
    evt.stopPropagation();
});

const popupProfileCloseButton = profilePopup.querySelector('.popup__close');
popupProfileCloseButton.addEventListener('click', () => {
    closeModal(profilePopup);
});

const profileFormElement = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

profileFormElement.addEventListener('submit', (evt) => {
    handleProfileFormSubmit(evt);
    closeModal(profilePopup);
});

const cardAddButton = document.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', (evt) => {
    openModal(cardPopup);
    evt.stopPropagation();
});

const popupCardProfileCloseButton = cardPopup.querySelector('.popup__close');
popupCardProfileCloseButton.addEventListener('click', () => {
    closeModal(cardPopup);
});

const cardFormElement = document.querySelector('.popup_type_new-card').querySelector('.popup__form');
const textInput = cardFormElement.querySelector('.popup__input_type_card-name');
const urlInput = cardFormElement.querySelector('.popup__input_type_url');

cardFormElement.addEventListener('submit', (evt) => {
    handleCardFormSubmit(evt);
    closeModal(cardPopup);
});

const popupImageCloseButton = imagePopup.querySelector('.popup__close');
popupImageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});

addCards(initialCards);
enableValidation();
