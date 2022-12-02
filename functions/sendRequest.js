const API = 'https://ajax.test-danit.com/api/v2/cards';
const sendRequest = async (entity, method = 'GET', config, format_text = false) => {
	return await fetch(`${entity}`, {
		method,
		...config
	})
		.then((response) => {
			if (response.ok) {
				if (method === 'GET' || method === 'POST' || method === 'PUT') {
					if (format_text){
						return response.text()
					}
					return response.json()
				}
				return response
			}
		})
};

export const addCard = (token, bodyCard) => sendRequest(API, 'POST', {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	},
	body: bodyCard
});

export const editCard = (token, postId, bodyCard) => sendRequest(`${API}/${postId}`, 'PUT', {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	},
	body: bodyCard
});

export const removeCard = (token, postId) => sendRequest(`${API}/${postId}`, 'DELETE', {
	headers: {
		'Authorization': `Bearer ${token}`
	},
});

export const receiveCard = (token) => sendRequest(API, 'GET', {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	},
});

export {sendRequest}