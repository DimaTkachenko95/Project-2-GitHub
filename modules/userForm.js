import {addCard, editCard} from '../functions/sendRequest.js';
import {UserCardCardio, UserCardDentist, UserCardTerapevt} from './userCard.js';
import {appearTerapevt, appearDentist, appearCardiolog} from "../functions/infoVisit.js";
import {renderCards} from '../index.js';
import { token } from "../index.js";

export default class UserForm {
    sendUserData(form,wrapper) { 
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let doctor = document.querySelector('#doctors').value;       
            let visitPurpose = document.querySelector('#visitPurpose').value;       
            let visitComplaint = document.querySelector('#visitComplaint').value;         
            let urgenty = document.querySelector('#urgenty').value;          
            let userName = document.querySelector('#userName').value;
            if(doctor==="Кардиолог"){
                let pressure = document.querySelector('#pressure').value;
                
                let bodyIndex = document.querySelector('#bodyIndex').value;
                
                let heartProblems = document.querySelector('#heartProblems').value;
                
                let userAge = document.querySelector('#userAge').value;
                

            addCard(token, JSON.stringify({
                title: 'Визит к Кардиологу',
                userName: userName ,
                userAge: userAge ,
                visitPurpose: visitPurpose,
                doctor: doctor,
                visitComplaint: visitComplaint,
                urgenty: urgenty,
                pressure: pressure,
                bodyIndex: bodyIndex,
                heartProblems: heartProblems,
              }))
                
                    .then(cardResponse => {
                        if(cardResponse){
                            
                            const card = new UserCardCardio(cardResponse);
                            card.renderCard(wrapper);
                            // addedUserSuccess()
                            console.log(card)
                        } 
                        // else{
                        //     addedUserError()
                        // }
                    })
            }
            if(doctor==="Стоматолог"){
                let lastVisit = document.querySelector('#lastVisit').value;
                 

                addCard(token, JSON.stringify({
                    title: 'Визит к Стоматологу',
                    userName: userName ,
                    lastVisit:lastVisit,
                    visitPurpose: visitPurpose,
                    doctor: doctor,
                    visitComplaint: visitComplaint,
                    urgenty: urgenty,
                  }))
                    
                        .then(cardResponse => {
                            if(cardResponse){
                                
                                const card = new UserCardDentist(cardResponse);
                                card.renderCard(wrapper);
                                // addedUserSuccess()
                                console.log(card)
                            } 
                            // else{
                            //     addedUserError()
                            // }
                        })
            }
            if(doctor==="Терапевт"){
                let userAge = document.querySelector('#userAge').value;
                console.log("userAge"+userAge) 
                addCard(token, JSON.stringify({
                    title: 'Визит к Терапевту',
                    userName: userName ,
                    userAge: userAge ,
                    visitPurpose: visitPurpose,
                    doctor: doctor,
                    visitComplaint: visitComplaint,
                    urgenty: urgenty,
                  }))
                    
                        .then(cardResponse => {
                            if(cardResponse){
                                
                                const card = new UserCardTerapevt(cardResponse);
                                card.renderCard(wrapper);
                                console.log(card)
                            } 
                            
                        })
            }
            
            let background = document.querySelector('.modal-backdrop')
            let modal = document.querySelector('.modal') 
            if (document.body.classList.contains('modal-open') || background || modal) {
                document.body.classList.remove('modal-open')
                background.remove()
                modal.remove()
            }  
        })
    } 
    render(wrapper) {
        this.formElem = document.createElement('form') 
        this.formElem.innerHTML = `   
        <div id="docsWrapper" class="form-group">
            <label for="doctors">Выбрать доктора</label>
            <select class="form-control" name="doctors-id" id="doctors">
                <option value="none" id="none" selected >Выберите из предложенных:</option>
                <option value="Кардиолог" id="cardiolog">Кардиолог</option>
                <option value="Стоматолог" id="dentist">Стоматолог</option>
                <option value="Терапевт" id="terapevt">Терапевт</option>
            </select>
        </div>
        <div class="visit-div" style="display:none;">
            <label class="form-label" style="width: 100%;">
                <p>Цель вашего визита</p>
                <input id="visitPurpose" class="form-control" name="visitPurpose" placeholder="Цель моего визита" required>
            </label>
            <label class="form-label" style="width: 100%;">
                <p>Опишите жалобы</p>
                <input id="visitComplaint" class="form-control" name="visitComplaint" placeholder="Я жалуюсь на ..." required>
            </label>
            
            <label for="urgenty">Выбрать срочность</label>
            <select class="form-control" name="urgenty-id" id="urgenty">
                <option value="none" id="none" selected >Срочность визита</option>
                <option value="Экстренно" id="urgent" >Экстренно</option>
                <option value="Могу подождать" id="wait" >Могу подождать</option>
                <option value="Не важно" id="noHurry" >Не важно</option>
            </select>

            <label class="form-label" style="width: 100%;">
                <p>ФИО</p>
                <input id="userName" class="form-control" name="userName" placeholder="ФИО..." required>
            </label>

            <div id="moreInfo"></div>
            <button type="submit" class="btn btn-primary">Добавить запись!</button>
        </div>
        ` 
        this.addEv(this.formElem)
        this.sendUserData(this.formElem,wrapper)
        return this.formElem;
    }
    addEv(elem){
        function addEventListener(){
            const selectDoctor = elem.querySelector('#doctors');
            const selectUrgenty = elem.querySelector('#urgenty');
            const visitDiv = elem.querySelector('.visit-div');
            const moreInfo = elem.querySelector('#moreInfo')
            selectDoctor.addEventListener('change',(event)=>{
                let userDoctor = event.target.value;
                // console.log(userDoctor)
                visitDiv.style.display = 'block';
            
                if(userDoctor==="Кардиолог"){
                    appearCardiolog()
                }
                if(userDoctor==="Стоматолог"){
                    appearDentist()
                }
                if(userDoctor==="Терапевт"){
                    appearTerapevt()
                }
            })
        }
        addEventListener()
    }
}

export class EditUserFormDentist {

    sendUserData(form,wrapper) { 
        form.addEventListener('submit', (event) => {
            let doctor = document.querySelector('.userDoc').innerText; 
            let visitNumber = document.querySelector('.visitNumber').textContent;
            let visitPurpose = document.querySelector('#visitPurpose').value;
            let visitComplaint = document.querySelector('#visitComplaint').value;
            let urgenty = document.querySelector('#urgenty').value;
            let userName = document.querySelector('#userName').value;
            if(doctor==="Кардиолог"){
                // let pressure = document.querySelector('#pressure').value;
                
                // let bodyIndex = document.querySelector('#bodyIndex').value;
                
                // let heartProblems = document.querySelector('#heartProblems').value;
                
                // let userAge = document.querySelector('#userAge').value;
                

            addCard(token, JSON.stringify({
                title: 'Визит к Кардиологу',
                userName: userName ,
                userAge: userAge ,
                visitPurpose: visitPurpose,
                doctor: doctor,
                visitComplaint: visitComplaint,
                urgenty: urgenty,
                pressure: pressure,
                bodyIndex: bodyIndex,
                heartProblems: heartProblems,
              }))
                
                    .then(cardResponse => {
                        if(cardResponse){
                            
                            const card = new UserCardCardio(cardResponse);
                            card.renderCard(wrapper);
                            // addedUserSuccess()
                            console.log(card)
                        } 
                        // else{
                        //     addedUserError()
                        // }
                    })
            }
            if(doctor==="Стоматолог"){
                let lastVisit = document.querySelector('.lastVisit').innerText;
                 

                editCard(token,visitNumber, JSON.stringify({
                    title: 'Визит к Стоматологу',
                    userName: userName ,
                    lastVisit:lastVisit,
                    visitPurpose: visitPurpose,
                    doctor: doctor,
                    visitComplaint: visitComplaint,
                    urgenty: urgenty,
                  }))

                  .then(response => console.log(response))
                  .then(data=>renderCards())
                //  renderCards()
            }
            if(doctor==="Терапевт"){
                let userAge = document.querySelector('#userAge').value;
                console.log("userAge"+userAge) 
                addCard(token, JSON.stringify({
                    title: 'Визит к Терапевту',
                    userName: userName ,
                    userAge: userAge ,
                    visitPurpose: visitPurpose,
                    doctor: doctor,
                    visitComplaint: visitComplaint,
                    urgenty: urgenty,
                  }))
                    
                        .then(cardResponse => {
                            if(cardResponse){
                                
                                const card = new UserCardTerapevt(cardResponse);
                                card.renderCard(wrapper);
                                // addedUserSuccess()
                                console.log(card)
                            } 
                            // else{
                            //     addedUserError()
                            // }
                        })
            }

            let background = document.querySelector('.modal-backdrop')
            let modal = document.querySelector('.modal')
            if (document.body.classList.contains('modal-open') || background || modal) { // проверям и удаляем все что связано по модалке
                document.body.classList.remove('modal-open')
                background.remove()
                modal.remove()
            } 
        })
    }
    
    render(wrapper, userName, visitPurpose, visitComplaint, urgenty, id, lastVisit, doctor) {
        // let urgenty=this.urgenty;
        this.formElem = document.createElement('form')
        
        this.formElem.innerHTML = `
        <p>Ваш доктор - <span class="userDoc">${doctor}</span></p>
        
        <div class="visit-div">
            <label class="form-label" style="width: 100%;">
                <p>Цель вашего визита</p>
                <input id="visitPurpose" class="form-control" name="visitPurpose" placeholder="Цель моего визита" required value="${visitPurpose}">
            </label>
            <label class="form-label" style="width: 100%;">
                <p>Опишите жалобы</p>
                <input id="visitComplaint" class="form-control" name="visitComplaint" placeholder="Я жалуюсь на ..." required value="${visitComplaint}">
            </label>
            
            <label for="urgenty">Выбрать срочность</label>
            <select class="form-control" name="urgenty-id" id="urgenty">
                <option value="none" id="none" selected >Срочность визита</option>
                <option value="Экстренно" id="urgent" >Экстренно</option>
                <option value="Могу подождать" id="wait" >Могу подождать</option>
                <option value="Не важно" id="noHurry" >Не важно</option>
            </select>

            <label class="form-label" style="width: 100%;">
                <p>ФИО</p>
                <input id="userName" class="form-control" name="userName" placeholder="ФИО..." required value="${userName}">
            </label>
            <p>Крайний визит: <span class="lastVisit">${lastVisit}</span></p>
            <p>Ваш номер записи: <span class="visitNumber">${id}<span></p>
            <div id="moreInfo"></div>
            <button type="submit" class="btn btn-primary">Записать!</button>
        </div>
        ` 
        this.addEv(this.formElem)
        this.sendUserData(this.formElem,wrapper)
        return this.formElem;
    }
    addEv(elem){
        function addEventListener(){
            const selectDoctor = elem.querySelector('#doctors');
            const selectUrgenty = elem.querySelector('#urgenty');
            const visitDiv = elem.querySelector('.visit-div');
            const moreInfo = elem.querySelector('#moreInfo')
            // selectDoctor.addEventListener('change',(event)=>{
            //     let userDoctor = event.target.value;
            //     // console.log(userDoctor)
            //     visitDiv.style.display = 'block';
            
            //     // if(userDoctor==="Кардиолог"){
            //     //     appearCardiolog()
            //     // }
            //     // if(userDoctor==="Стоматолог"){
            //     //     appearDentistEdit()
            //     // }
            //     // if(userDoctor==="Терапевт"){
            //     //     appearTerapevt()
            //     // }
            // })
            // selectUrgenty.value=urgenty;
            selectUrgenty.addEventListener('change', (event)=>{
                const visitUrgenty = event.target.value;
                
            });
        }
        addEventListener()
    }
}

export class EditUserFormCardio {

    sendUserData(form,wrapper) { 
        form.addEventListener('submit', (event) => {
event.preventDefault()
            let doctor = document.querySelector('.userDoc').innerText; 
            let visitNumber = document.querySelector('.visitNumber').textContent;
            let visitPurpose = document.querySelector('#visitPurpose').value;
            let visitComplaint = document.querySelector('#visitComplaint').value;
            let urgenty = document.querySelector('#urgenty').value;
            let userName = document.querySelector('#userName').value;
            if(doctor==="Кардиолог"){
                let pressure = document.querySelector('#pressure').innerText;
                
                let bodyIndex = document.querySelector('#bodyIndex').innerText;
                
                let heartProblems = document.querySelector('#heartProblems').innerText;
                
               
                
                editCard(token,visitNumber, JSON.stringify({
                    title: 'Визит к Кардиологу',
                    userName: userName ,
                    pressure:pressure,
                    bodyIndex:bodyIndex,
                    heartProblems:heartProblems,
                    
                    visitPurpose: visitPurpose,
                    doctor: doctor,
                    visitComplaint: visitComplaint,
                    urgenty: urgenty,
                  }))

                  .then(response => console.log(response))
                  .then(data=>renderCards())
            }
            let background = document.querySelector('.modal-backdrop')
            let modal = document.querySelector('.modal')
            if (document.body.classList.contains('modal-open') || background || modal) { // проверям и удаляем все что связано по модалке
                document.body.classList.remove('modal-open')
                background.remove()
                modal.remove()
            } 
        })
    }
    
    render(wrapper, userName, visitPurpose, visitComplaint, urgenty, id, pressure, doctor, bodyIndex, heartProblems) {
        // let urgenty=this.urgenty;
        this.formElem = document.createElement('form')
        
        this.formElem.innerHTML = `
        <p>Ваш доктор - <span class="userDoc">${doctor}</span></p>
        
        <div class="visit-div">
            <label class="form-label" style="width: 100%;">
                <p>Цель вашего визита</p>
                <input id="visitPurpose" class="form-control" name="visitPurpose" placeholder="Цель моего визита" required value="${visitPurpose}">
            </label>
            <label class="form-label" style="width: 100%;">
                <p>Опишите жалобы</p>
                <input id="visitComplaint" class="form-control" name="visitComplaint" placeholder="Я жалуюсь на ..." required value="${visitComplaint}">
            </label>
            
            <label for="urgenty">Выбрать срочность</label>
            <select class="form-control" name="urgenty-id" id="urgenty">
                <option value="none" id="none" selected >Срочность визита</option>
                <option value="Экстренно" id="urgent" >Экстренно</option>
                <option value="Могу подождать" id="wait" >Могу подождать</option>
                <option value="Не важно" id="noHurry" >Не важно</option>
            </select>

            <label class="form-label" style="width: 100%;">
                <p>ФИО</p>
                <input id="userName" class="form-control" name="userName" placeholder="ФИО..." required value="${userName}">
            </label>
            <p>Давление тела: <span id="pressure">${pressure}</span></p>
            <p>Проблемы сердца: <span id="heartProblems">${heartProblems}</span></p>
            <p>ИМТ: <span id="bodyIndex">${bodyIndex}</span></p>
            
            <p>Ваш номер записи: <span class="visitNumber">${id}<span></p>
            <div id="moreInfo"></div>
            <button type="submit" class="btn btn-primary">Записать!</button>
        </div>
        ` 
        this.addEv(this.formElem)
        this.sendUserData(this.formElem,wrapper)
        return this.formElem;
    }
    addEv(elem){
        function addEventListener(){
            const selectDoctor = elem.querySelector('#doctors');
            const selectUrgenty = elem.querySelector('#urgenty');
            const visitDiv = elem.querySelector('.visit-div');
            const moreInfo = elem.querySelector('#moreInfo')
            // selectDoctor.addEventListener('change',(event)=>{
            //     let userDoctor = event.target.value;
            //     // console.log(userDoctor)
            //     visitDiv.style.display = 'block';
            
            //     // if(userDoctor==="Кардиолог"){
            //     //     appearCardiolog()
            //     // }
            //     // if(userDoctor==="Стоматолог"){
            //     //     appearDentistEdit()
            //     // }
            //     // if(userDoctor==="Терапевт"){
            //     //     appearTerapevt()
            //     // }
            // })
            // selectUrgenty.value=urgenty;
            selectUrgenty.addEventListener('change', (event)=>{
                const visitUrgenty = event.target.value;
                
            });
        }
        addEventListener()
    }
}

export class EditUserFormTerapevt {

    sendUserData(form,wrapper) { 
        form.addEventListener('submit', (event) => {

            let doctor = document.querySelector('.userDoc').innerText; 
            let visitNumber = document.querySelector('.visitNumber').textContent;
            let visitPurpose = document.querySelector('#visitPurpose').value;
            let visitComplaint = document.querySelector('#visitComplaint').value;
            let urgenty = document.querySelector('#urgenty').value;
            let userName = document.querySelector('#userName').value;
            
           
            if(doctor==="Терапевт"){
                let userAge = document.querySelector('#userAge').value;
                editCard(token,visitNumber, JSON.stringify({
                    title: 'Визит к Терапевту',
                    userName: userName ,
                    userAge:userAge,
                    visitPurpose: visitPurpose,
                    doctor: doctor,
                    visitComplaint: visitComplaint,
                    urgenty: urgenty,
                  }))

                  .then(response => console.log(response))
                  .then(data=>renderCards())
            }

            let background = document.querySelector('.modal-backdrop')
            let modal = document.querySelector('.modal')
            if (document.body.classList.contains('modal-open') || background || modal) { 
                document.body.classList.remove('modal-open')
                background.remove()
                modal.remove()
            } 
        })
    }
    
    render(wrapper, userName, visitPurpose, visitComplaint, urgenty, id, userAge, doctor) {
        // let urgenty=this.urgenty;
        this.formElem = document.createElement('form')
        this.formElem.innerHTML = `
        <p>Ваш доктор - <span class="userDoc">${doctor}</span></p>
        
        <div class="visit-div">
            <label class="form-label" style="width: 100%;">
                <p>Цель вашего визита</p>
                <input id="visitPurpose" class="form-control" name="visitPurpose" placeholder="Цель моего визита" required value="${visitPurpose}">
            </label>
            <label class="form-label" style="width: 100%;">
                <p>Опишите жалобы</p>
                <input id="visitComplaint" class="form-control" name="visitComplaint" placeholder="Я жалуюсь на ..." required value="${visitComplaint}">
            </label>
            
            <label for="urgenty">Выбрать срочность</label>
            <select class="form-control" name="urgenty-id" id="urgenty">
                <option value="none" id="none" selected >Срочность визита</option>
                <option value="Экстренно" id="urgent" >Экстренно</option>
                <option value="Могу подождать" id="wait" >Могу подождать</option>
                <option value="Не важно" id="noHurry" >Не важно</option>
            </select>

            <label class="form-label" style="width: 100%;">
                <p>ФИО</p>
                <input id="userName" class="form-control" name="userName" placeholder="ФИО..." required value="${userName}">
            </label>
            <p>Ваш возраст: <span id="userAge">${userAge}</span></p>
            <p>Ваш номер записи: <span class="visitNumber">${id}<span></p>
            <div id="moreInfo"></div>
            <button type="submit" class="btn btn-primary">Записать!</button>
        </div>
        ` 
        this.addEv(this.formElem)
        this.sendUserData(this.formElem,wrapper)
        return this.formElem;
    }
    addEv(elem){
        function addEventListener(){
            const selectDoctor = elem.querySelector('#doctors');
            const selectUrgenty = elem.querySelector('#urgenty');
            const visitDiv = elem.querySelector('.visit-div');
            const moreInfo = elem.querySelector('#moreInfo')
            selectUrgenty.addEventListener('change', (event)=>{
                const visitUrgenty = event.target.value;
                
            });
        }
        addEventListener()
    }
}
