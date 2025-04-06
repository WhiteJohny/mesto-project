const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
};

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
};

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
    profilePopup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    profilePopup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup);
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
cardAddButton.addEventListener('click', function () {
    openModal(cardPopup);
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
