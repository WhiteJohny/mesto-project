const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202/',
    headers: {
        authorization: '05022990-ce33-40d8-934e-bb6ea574e19e',
        'Content-Type': 'application/json'
    }
};

const request = (url, method, body=null) => {
    const options = {
        method: method,
        headers: config.headers
    };

    if (body !== null) {
        options.body = body;
    }

    return fetch(`${config.baseUrl}${url}`, options);
};

const getProfile = () => {
    return request('users/me', 'GET');
};

const getCards = () => {
    return request('cards', 'GET');
};

const editProfile = (name, about) => {
    const body = JSON.stringify({
        name: name,
        about: about
    });

    return request('users/me', 'PATCH', body);
};

const addCard = (name, link) => {
    const body = JSON.stringify({
        name: name,
        link: link
    });

    return request('cards', 'POST', body);
};

const likeCard = (cardId) => {
    return request(`cards/likes/${cardId}`, 'PUT');
};

const unLikeCard = (cardId) => {
    return request(`cards/likes/${cardId}`, 'DELETE');
};

const deleteCard = (cardId) => {
    return request(`cards/${cardId}`, 'DELETE');
};

const updateAvatar = (link) => {
    const body = JSON.stringify({
        avatar: link
    });
    
    return request('users/me/avatar', 'PATCH', body);
};

export { getProfile, getCards, editProfile, addCard, likeCard, unLikeCard, deleteCard, updateAvatar };
