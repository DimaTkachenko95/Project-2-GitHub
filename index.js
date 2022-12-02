import { receiveCard } from "./functions/sendRequest.js";
import Modal from "./modules/modal.js";
import UserForm from './modules/userForm.js';
import {UserCardCardio, UserCardDentist, UserCardTerapevt} from './modules/userCard.js';
import { auth, changeModalStatus } from './modules/authorization.js'


import {searchHandler} from "./functions/searchHandler.js";
import {filterHandler} from "./functions/filterHandler.js";


const buttonAdd = document.querySelector('#btn-new-user');
const docsWrapper = document.querySelector('#docsWrapper');
export const cardDeck = document.querySelector(".card_deck");
let token;


export function renderCards(){
    cardDeck.innerHTML=''
    receiveCard(token)
        .then(cards=>{
            cards.forEach(card=>{
                // console.log(card)
                if(card.doctor==="Кардиолог"){
                    const generateCard = new UserCardCardio(card)
                    generateCard.renderCard(cardDeck)
                }
                if(card.doctor==="Терапевт"){
                    const generateCard = new UserCardTerapevt(card)
                    generateCard.renderCard(cardDeck)
                }
                if(card.doctor==="Стоматолог"){
                    const generateCard = new UserCardDentist(card)
                    generateCard.renderCard(cardDeck)
                }
            })
        })
}
// renderCards()
// renderLogin()

document.getElementById('send')
    .addEventListener('click', function (e) {
        e.preventDefault();
        try {
        auth().then(t => {
            if (t !== undefined) {
                token = t;
                document.getElementById('id01').style.display = 'none'
                alert("Добро пожаловать");
                changeModalStatus();
                console.log(t)
                renderCards()
            } else {
                alert("Не верно введен, логин и пароль")
            }
        })
            .catch(e => console.log(e.message))
     }
     catch (e) {
    console.log(e.message)

}
    })






buttonAdd.addEventListener('click', ()=>{
    const newForm = new UserForm();

    const newUserModal = new Modal ({
        headerTitle: 'Add new Appointment',
        body: newForm.render(cardDeck),
        closeOutside: true
    })

    document.body.append(newUserModal.render());
})

export {token}

searchHandler(renderCards);
filterHandler(renderCards);