import Modal from "./modal.js";
import {delUserSuccess, delUserError} from "../functions/alert.js";
import {removeCard} from '../functions/sendRequest.js';
import { token } from "../index.js";
import {EditUserFormDentist, EditUserFormCardio, EditUserFormTerapevt} from './userForm.js';
import {cardDeck} from '../index.js';

class UserCard{
constructor(userName, visitPurpose, visitComplaint, urgenty, id){
 this.userName = userName;
 this.id = id;
 this.visitPurpose = visitPurpose;
 this.visitComplaint = visitComplaint;
 this.urgenty = urgenty;
}
renderHeaderGeneral(parent){
        parent.classList.add("card-header");
        parent.insertAdjacentHTML("afterbegin", `
            <div style=" width: 100%; ">
                <div style=" display: flex; align-items: center; justify-content: space-between; ">
                   
                    <span class="icon-edit-task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"></path>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path>
                        </svg>
                    </span>
                </div>
                <span class="card-data">  Номер вашей записи : ${this.id}</span>
            
                <span class="icon-del">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px">
                    <path	d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                    </svg>
                </span>
            </div>
        `)
}
}

export class UserCardDentist extends UserCard{
    constructor({userName, visitPurpose, doctor, visitComplaint, urgenty,id, lastVisit}) {
        super(userName, visitPurpose, visitComplaint, urgenty, id)
        this.doctor = doctor;
        this.lastVisit= lastVisit;   
    }

    renderHeader() {
        // console.log('sdfsf')
        const header = document.createElement('div');
        super.renderHeaderGeneral(header)
        header.addEventListener('click', (e) => {
            const delTarget = e.target.closest('.icon-del'); //
            const editTarget = e.target.closest('.icon-edit-task');  
            if (delTarget) {
                const toDelUser = confirm('Удалить вашу запись?');
                if (toDelUser) {
                    const id = delTarget.closest('.card').id
                    // console.log(id)
                        removeCard(token,id).then(data => {
                            // console.log(data);
                            if (data.ok){
                                delTarget.closest('.card').remove(); //удалить карточку на странице
                                delUserSuccess() //Показать алерт что пользователь удалился
                            } else {
                                delUserError() //Показать алерт что пользователь не удалился
                            }
                        })                
                }
            }
            if(editTarget){
                
            const newForm = new EditUserFormDentist();
            const newUserModal = new Modal ({
                headerTitle: 'Edit visit',
                body: newForm.render(cardDeck, this.userName, this.visitPurpose, this.visitComplaint, this.urgenty, this.id, this.lastVisit, this.doctor),
                closeOutside: true
            })
            document.body.append(newUserModal.render());   
            }
        })
        return header;
    }
    renderBody() {
        this.body = document.createElement("div");
        this.body.classList.add("card-body");

        this.body.innerHTML=`
        <p class="card-data doctor">Врач: ${this.doctor}</p>
        <p class="patientName card-data">Имя пациента: ${this.userName}</p>
        <p class="card-data">Цель визита: ${this.visitPurpose}</p>
        <p class="card-data urgency">Срочность визита: ${this.urgenty}</p>
        <p class="card-data">Жалобы: ${this.visitComplaint}</p>
        <button class="seeMore">Узнать больше...</button>
        `
        return this.body;
        
       
    }
    addEv(elem){
        function addEventListener(){
        const seeMore=elem.querySelector('.seeMore')
        seeMore.addEventListener('click', ()=>{
           const infoMore = elem.querySelector('.card-footer')
           infoMore.classList.toggle("visibleFalse")
        })
            
           
        }
        addEventListener()
    }
    renderFooter() {
        
        this.footer = document.createElement("div");
        this.footer.classList.add("card-footer", "visibleFalse");
        this.footer.insertAdjacentHTML("afterbegin", `
        <p>Последний визит: ${this.lastVisit}</p>
        `)
        return this.footer;
    }
    renderCard(cardWrapper) {
        const userCard = document.createElement("div");
        userCard.classList.add("card", "user-card");
        userCard.id = this.id;
        userCard.append(this.renderHeader(), this.renderBody(), this.renderFooter());
        this.addEv(userCard)
        cardWrapper.append(userCard);

    }  
}

export class UserCardCardio extends UserCard{
    constructor({userName, visitPurpose, doctor, visitComplaint, urgenty, id, pressure, bodyIndex, heartProblems}) {
        super(userName, visitPurpose, visitComplaint, urgenty, id)
        this.doctor = doctor;
        this.pressure= pressure;
        this.bodyIndex= bodyIndex;
        this.heartProblems= heartProblems;
    }

    renderHeader() {
        const header = document.createElement('div');
      //  console.log('eee')
        super.renderHeaderGeneral(header)
        header.addEventListener('click', (e) => {
            const delTarget = e.target.closest('.icon-del'); //
            const editTarget = e.target.closest('.icon-edit-task');  
            if (delTarget) {
                const toDelUser = confirm('Удалить вашу запись?');
                if (toDelUser) {
                    const id = delTarget.closest('.card').id
                    // console.log(id)
                    // делаем такую проверку потому что в баззу у нас добавлется 11 пользователь и запрос на него нельзя сделать
                        removeCard(token,id).then(data => {
                            // console.log(data);
                            if (data.ok){
                                delTarget.closest('.card').remove(); //удалить карточку на странице
                                delUserSuccess() //Показать алерт что пользователь удалился
                            } else {
                                delUserError() //Показать алерт что пользователь не удалился
                            }

                        })
                     
                }
            }
            if(editTarget){                 
            const newForm = new EditUserFormCardio();
            const newUserModal = new Modal ({
                headerTitle: 'Edit visit',
                body: newForm.render(cardDeck, this.userName, this.visitPurpose, this.visitComplaint, this.urgenty, this.id, this.pressure, this.doctor, this.bodyIndex, this.heartProblems),
                closeOutside: true
            })
            document.body.append(newUserModal.render());
            }
        })
        return header;
    }
    renderBody() {
        this.body = document.createElement("div");
        this.body.classList.add("card-body");

        this.body.innerHTML=`
        <p class="card-data doctor">Врач: ${this.doctor}</p>
        <p class="patientName card-data">Имя пациента: ${this.userName}</p>
        <p class="card-data">Цель визита: ${this.visitPurpose}</p>
        <p class="card-data urgency">Срочность визита: ${this.urgenty}</p>
        <p class="card-data">Жалобы: ${this.visitComplaint}</p>
        <button class="seeMore">Узнать больше...</button>
        `
        return this.body;


    }
    addEv(elem){
        function addEventListener(){
        const seeMore=elem.querySelector('.seeMore')
        seeMore.addEventListener('click', ()=>{
           const infoMore = elem.querySelector('.card-footer')
           infoMore.classList.toggle("visibleFalse")
        })   
        }
        addEventListener()
    }
    renderFooter() {   
        this.footer = document.createElement("div");
        this.footer.classList.add("card-footer", "visibleFalse");
        this.footer.insertAdjacentHTML("afterbegin", `
        <p>Давление тела: ${this.pressure}</p>
        <p>ИМТ: ${this.bodyIndex}</p>
        <p>Проблемы сердца: ${this.heartProblems}</p>
        `)
        return this.footer;
    }

    renderCard(cardWrapper) {
        const userCard = document.createElement("div");
        userCard.classList.add("card", "user-card");
        userCard.id = this.id;
        userCard.append(this.renderHeader(), this.renderBody(), this.renderFooter());
        this.addEv(userCard)
        cardWrapper.append(userCard);
    }
}

export class UserCardTerapevt extends UserCard{
    constructor({userName, visitPurpose, doctor, visitComplaint, urgenty, id, userAge}) {
        super(userName, visitPurpose, visitComplaint, urgenty, id)
        this.doctor = doctor;
        this.userAge= userAge;      
    }
    renderHeader() {
         // console.log('TTT')
        const header = document.createElement('div');
        super.renderHeaderGeneral(header)
        header.addEventListener('click', (e) => {
            const delTarget = e.target.closest('.icon-del'); // 
            const editTarget = e.target.closest('.icon-edit-task');  
            if (delTarget) {
                const toDelUser = confirm('Удалить вашу запись?');
                if (toDelUser) {
                    const id = delTarget.closest('.card').id
                    // console.log(id)
                    // делаем такую проверку потому что в баззу у нас добавлется 11 пользователь и запрос на него нельзя сделать
                        removeCard(token,id).then(data => {
                            // console.log(data);
                            if (data.ok){
                                delTarget.closest('.card').remove(); //удалить карточку на странице
                                delUserSuccess() //Показать алерт что пользователь удалился
                            } else {
                                delUserError() //Показать алерт что пользователь не удалился
                            }

                        })
                     
                }
            }
            if(editTarget){
                
                const newForm = new EditUserFormTerapevt();
    
                const newUserModal = new Modal ({
                    headerTitle: 'Edit visit',
                    body: newForm.render(cardDeck, this.userName, this.visitPurpose, this.visitComplaint, this.urgenty, this.id, this.userAge, this.doctor),
                    closeOutside: true
                })
                document.body.append(newUserModal.render());
                   
                }
        })

        return header;
    }
    renderBody() {
        this.body = document.createElement("div");
        this.body.classList.add("card-body");

        this.body.innerHTML=`
        <p class="card-data doctor">Врач: ${this.doctor}</p>
        <p class="card-data">Имя пациента: ${this.userName}</p>
        <p class="card-data">Цель визита: ${this.visitPurpose}</p>
        <p class="card-data urgency">Срочность визита: ${this.urgenty}</p>
        <p class="card-data">Жалобы: ${this.visitComplaint}</p>
        <button class="seeMore">Узнать больше...</button>
        `
        return this.body;
        
       
    }
    addEv(elem){
        function addEventListener(){
        const seeMore=elem.querySelector('.seeMore')
        seeMore.addEventListener('click', ()=>{
           const infoMore = elem.querySelector('.card-footer')
           infoMore.classList.toggle("visibleFalse")
        })
            
           
        }
        addEventListener()
    }
    renderFooter() {
        
        this.footer = document.createElement("div");
        this.footer.classList.add("card-footer", "visibleFalse");
        this.footer.insertAdjacentHTML("afterbegin", `
        <p>Возраст пациента: ${this.userAge}</p>
        `)
        return this.footer;
    }
    renderCard(cardWrapper) {
        const userCard = document.createElement("div");
        userCard.classList.add("card", "user-card");
        userCard.id = this.id;
        userCard.append(this.renderHeader(), this.renderBody(), this.renderFooter());
        this.addEv(userCard)
        cardWrapper.append(userCard);

    }
}


