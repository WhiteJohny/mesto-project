import './pages/index.css';

import './images/logo.svg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/delete-icon.svg';
import './images/close.svg';
import './images/add-icon.svg';
import './images/edit-icon.svg';

import { cardDelete, cardLike, createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import { getProfile, getCards, editProfile, addCard, updateAvatar } from './components/api.js';

const renderResult = (target, isLoading) => {
    const popup_button = target.querySelector('.popup__button');
    if (isLoading) {
        popup_button.textContent = 'Сохранение...';
    } else {
        popup_button.textContent = 'Сохранить';
    }
};

const checkFormErorr = (target, flag) => {
    const formError = target.querySelector('.form-error');

    if (flag) {
        formError.classList.add('popup__error_visible');
        formError.style.display = 'block';
    } else {
        formError.classList.remove('popup__error_visible');
        formError.style.display = 'none';
    }
};

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();

    const name = nameInput.value;
    const about = jobInput.value;

    renderResult(evt.target, true);
    checkFormErorr(evt.target, false);

    editProfile(name, about)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(res.status);
        })
        .then(() => {
            const title = document.querySelector('.profile__title');
            const description = document.querySelector('.profile__description')
            title.textContent = name;
            description.textContent = about;

            closeModal(profilePopup);
        })
        .catch((err) => {
            console.log(`Error ${err}`);
            checkFormErorr(evt.target, true);
        })
        .finally(() => {
            renderResult(evt.target, false);
        });
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

const loadImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img')
        image.src = imageUrl;
        image.onerror = reject;
        image.onload = resolve;
    });    
}

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();

    const name = textInput.value;
    const link = urlInput.value;

    renderResult(evt.target, true);
    checkFormErorr(evt.target, false);

    loadImage(link)
        .then (() => {
            addCard(name, link)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(res.status);
                })
                .then((res) => {
                    const cardElement = createCard(name, link, res.likes.length);
                    cardDelete(cardElement, res._id, userId, res.owner._id);
                    cardLike(cardElement, res._id, userId, res.likes);
                    cardImage(cardElement);
                    
                    const placesList = document.querySelector('.places__list');
                    placesList.prepend(cardElement);

                    closeModal(cardPopup);
                })
                .catch((err) => {
                    console.log(`Error ${err}`);
                    checkFormErorr(evt.target, true);
                });
        })
        .catch((err) => {
            console.log(`Error ${err}`);
            checkFormErorr(evt.target, true);
        })
        .finally(() => {
            renderResult(evt.target, false);
        });
};

const addCards = (cardsList) => {
    const placesList = document.querySelector('.places__list');
    cardsList.forEach((card) => {
        const cardElement = createCard(card.name, card.link, card.likes.length);
        cardDelete(cardElement, card._id, userId, card.owner._id);
        cardLike(cardElement, card._id, userId, card.likes);
        cardImage(cardElement);
        placesList.append(cardElement);
    });
};

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar-update');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
avatarPopup.classList.add('popup_is-animated');

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

const cardFormElement = cardPopup.querySelector('.popup__form');
const textInput = cardFormElement.querySelector('.popup__input_type_card-name');
const urlInput = cardFormElement.querySelector('.popup__input_type_url');

cardFormElement.addEventListener('submit', (evt) => {
    handleCardFormSubmit(evt);
});

const popupImageCloseButton = imagePopup.querySelector('.popup__close');
popupImageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});

const profileAvatarContainer =  document.querySelector('.profile__container');
profileAvatarContainer.addEventListener('click', (evt) => {
    openModal(avatarPopup);
    evt.stopPropagation();
});

const profileAvatarCloseButton = avatarPopup.querySelector('.popup__close');
profileAvatarCloseButton.addEventListener('click', () => {
    closeModal(avatarPopup);
});

const avatarFormElement = avatarPopup.querySelector('.popup__form');
const avatarUrlInput = avatarFormElement.querySelector('.popup__input_type_url');

const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();

    const link = avatarUrlInput.value;

    renderResult(evt.target, true);
    checkFormErorr(evt.target, false);
    loadImage(link)
        .then (() => {
            updateAvatar(link)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(res.status);
                })
                .then((res) => {
                    profile.querySelector('.profile__image').setAttribute(
                        'style',
                        `background-image: url(${res.avatar});`
                    );

                    closeModal(avatarPopup);
                })
                .catch((err) => {
                    console.log(`Error ${err}`);
                    checkFormErorr(evt.target, true);
                });
        })
        .catch((err) => {
            console.log(`Error ${err}`);
            checkFormErorr(evt.target, true);
        })
        .finally(() => {
            renderResult(evt.target, false);
        });
};

avatarFormElement.addEventListener('submit', (evt) => {
    handleAvatarFormSubmit(evt);
});

const profile = document.querySelector('.profile');
let userId;
getProfile()
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((res) => {
        profile.querySelector('.profile__image').setAttribute(
            'style',
            `background-image: url(${res.avatar});`
        );
        profile.querySelector('.profile__title').textContent = res.name;
        profile.querySelector('.profile__description').textContent = res.about;
        userId = res._id;
    })
    .catch((err) => {
        console.log(`Error ${err}`);
    });

getCards()
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((res) => {
        addCards(res);
    })
    .catch((err) => {
        console.log(`Error ${err}`);
    });

enableValidation();
