import { likeCard, unLikeCard, deleteCard } from './api.js';

const cardDelete = (cardElement, cardId, userId, ownerId) => {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    if (userId === ownerId) {
        cardDeleteButton.addEventListener('click', (evt) => {
            deleteCard(cardId)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(res.status);
                })
                .then(() => {
                    evt.target.closest('.card').remove();
                })
                .catch((err) => {
                    console.log(err);
                });
                
        });
    } else {
        cardDeleteButton.remove();
    }
    
};

const isCardLiked = (userId, cardLikes) => {
    return cardLikes.some((user) => {
        return user._id === userId;
    });
};

const cardLike = (cardElement, cardId, userId, cardlikes) => {
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    if (isCardLiked(userId, cardlikes)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like-button_is-active')) {
            unLikeCard(cardId)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(res.status);
                })
                .then((res) => {
                    evt.target.classList.remove('card__like-button_is-active');
                    cardElement.querySelector('.card__like-counter').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            likeCard(cardId)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(res.status);
                })
                .then((res) => {
                    evt.target.classList.add('card__like-button_is-active');
                    cardElement.querySelector('.card__like-counter').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        
    });
};

const createCard = (name, link, likeValue) => {
    const cardTempalte = document.querySelector('#card-template').content;
    const cardElement = cardTempalte.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__like-counter').textContent = likeValue;

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__description').querySelector('.card__title').textContent = name;

    return cardElement;
};

export { cardDelete, cardLike, createCard };
