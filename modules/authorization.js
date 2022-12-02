import {sendRequest} from './../functions/sendRequest.js'

const URL_LOGIN = 'https://ajax.test-danit.com/api/v2/cards/login';
let name = document.getElementById('tex');
let pass = document.getElementById('pass');

function changeModalStatus() {
    document.getElementById('btnClen').style.display = 'none';
    document.getElementById('btn-new-user').style.display = 'block';
    document.getElementById('btn-filter').style.display = 'block';
    document.querySelector('.search').style.display = 'block';
}

const auth = function () {
    return  sendRequest(URL_LOGIN, 'POST', {
        headers: ({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({email: name.value, password: pass.value})
    }, true)
};


export {auth, changeModalStatus}