import {cardsNotFound} from "./cardsNotFound.js";
import loader from "./loader.js";

const searchIcon = document.querySelector(".icon");
const searchInput = document.querySelector(".search_input");
const cardDeck = document.querySelector(".card_deck");


export function searchHandler ( callback ) {
    searchIcon.addEventListener('click',  async e => {
        e.preventDefault();

        if ((searchInput.value != '' && searchIcon.classList.contains('fa-search'))
            || searchIcon.classList.contains('fa-skull-crossbones')) {
            await loader(cardDeck);
            performSearch (callback)
        }
    })

    searchInput.addEventListener('keyup', async e => {
        e.preventDefault();

        if(e.keyCode === 13 && searchInput.value){
            await loader(cardDeck);
            performSearch (callback)
        }
    })
}

function performSearch (callback) {
    const searchInput = document.querySelector(".search_input")
    const searchIcon = document.querySelector(".icon")
    const cardRecords = document.querySelectorAll('.card-data')
    let nothingToRender = true;
    let listRenderCards = new Map();


    if (searchInput.value != '' && searchIcon.classList.contains('fa-search')) {
        searchIcon.classList.remove('fa-search');
        searchIcon.classList.add('fa-skull-crossbones');
        for (const record of cardRecords) {

            let currentCard = record.closest('.user-card').id;
            console.log(record.innerHTML)
            if (record.innerHTML.split(': ')[1].toLowerCase().includes(searchInput.value.toLowerCase())) {
                listRenderCards.set(currentCard, true)

                let oldRecord = record.innerHTML.split(': ')[1].toLowerCase()
                let recordParts = oldRecord.split(`${searchInput.value.toLowerCase()}`);
                let newRecord = '';

                for (let i = 0; i < recordParts.length; i++) {
                    if (i === recordParts.length - 1) {
                        newRecord += `${recordParts[i]}`;
                    } else {
                        newRecord += `${recordParts[i]}<span class="data-found">${searchInput.value}</span>`;
                    }
                }
                record.innerHTML = `${record.innerHTML.split(': ')[0]}: ${newRecord}`

            } else {
                if (!listRenderCards.get(currentCard)) {
                    listRenderCards.set(currentCard, false)
                }
            }

        }

        listRenderCards.forEach((value, key, map) => {
            if (value) {
                nothingToRender = false;
            } else {
                document.getElementById(`${key}`).style.display = 'none';
            }
        });

        if (nothingToRender) {
            cardsNotFound(cardDeck);
        }


    } else if (searchIcon.classList.contains('fa-skull-crossbones')) {

        searchIcon.classList.add('fa-search');
        searchIcon.classList.remove('fa-skull-crossbones');
        searchInput.value = '';

        callback();
    }
}
