const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard(card) {
  const cardTempalte = document.querySelector('#card-template').content;
  const cardElement = cardTempalte.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__description').querySelector('.card__title').textContent = card.name;

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

function addCards(cardsList) {
  const placesList = document.querySelector('.places__list');
  cardsList.forEach(function (card) {
    placesList.append(createCard(card));
  });
};

addCards(initialCards);
