import loader from "../functions/loader.js";
import {cardsNotFound} from "../functions/cardsNotFound.js";

export default class filterForm {
    constructor () {
    }

    render(callback) {
        const filterState = document.querySelector('.icon-filter')
        filterState.classList.remove('used-filter');
        callback();

        this.formElem = document.createElement('form')
        this.formElem.insertAdjacentHTML("afterbegin", `
            <div class="form-group">
                  <label class="form-label" style="width: 100%;">
                     <p>Доктор</p>
                     <select class="form-control" id="doctors">
                             <option value="none" id="none" selected>не выбран</option>
                             <option value="Кардиолог" id="cardiolog">Кардиолог</option>
                             <option value="Стоматолог" id="dentist">Стоматолог</option>
                             <option value="Терапевт" id="terapevt">Терапевт</option>
                     </select>     
                  </label>               
            </div> 
            <div class="form-group">
                  <label class="form-label" style="width: 100%;">
                   <p>Срачность</p>
                   <select class="form-control" id="urgency">
                         <option value="none" id="none" selected>не выбран</option>
                         <option value="Экстренно" id="urgent" >Экстренно</option>
                         <option value="Могу подождать" id="wait" >Могу подождать</option>
                         <option value="Не важно" id="noHurry" >Не важно</option>
                   </select>       
                   </label>               
            </div> 
            <button type="submit" id="btn-apply-filter" class="btn btn-primary">Apply</button>`)

        this.formElem.addEventListener('submit',async e => {
            e.preventDefault();

            let nothingToRender = true;

            const cardDeck = document.querySelector(".card_deck");
            const cards = document.querySelectorAll(".card");

            let doctor = e.target.querySelector('#doctors').value;
            let urgency = e.target.querySelector('#urgency').value;

            let background = document.querySelector('.modal-backdrop')
            let modal = document.querySelector('.modal')

            if (document.body.classList.contains('modal-open') || background || modal) {
                document.body.classList.remove('modal-open')
                background.remove()
                modal.remove()
            }

            await loader(cardDeck);

            for (const card of cards) {

                let doctorDOM = card.querySelector('.doctor').innerHTML.split(': ')[1];
                let urgencyDOM = card.querySelector('.urgency').innerHTML.split(': ')[1];

                if (doctorDOM === doctor && urgencyDOM === urgency){
                    nothingToRender = false;
                    filterState.classList.add('used-filter');
                }else{
                    card.style.display = 'none';
                }
            }

            if (nothingToRender){
                cardsNotFound(cardDeck);
                filterState.classList.remove('used-filter');
            }

        })

        return this.formElem;
    }

}
