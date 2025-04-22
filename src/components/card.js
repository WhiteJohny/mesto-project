const cardDelete = (cardElement) => {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button')
    cardDeleteButton.addEventListener('click', (evt) => {
        evt.target.closest('.card').remove();
    });
};

const cardLike = (cardElement) => {
    const cardLikeButton = cardElement.querySelector('.card__like-button')
    cardLikeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
    });
};

const createCard = (name, link) => {
    const cardTempalte = document.querySelector('#card-template').content;
    const cardElement = cardTempalte.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__description').querySelector('.card__title').textContent = name;

    return cardElement;
};

export { cardDelete, cardLike, createCard };
