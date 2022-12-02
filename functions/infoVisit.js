
export function appearCardiolog(){
    moreInfo.innerHTML=
    `<label class="form-label" style="width: 100%;">
    <p>Ваше обычное давление:</p>
    <input id="pressure" class="form-control" name="pressure" placeholder="Ваше давление..." required>
</label>
<label class="form-label" style="width: 100%;">
    <p>Индекс массы тела:</p>
    <input id="bodyIndex" class="form-control" name="bodyIndex" placeholder="ИМТ..." required>
</label>
<label class="form-label" style="width: 100%;">
    <p>Болезни сердца</p>
    <input id="heartProblems" class="form-control" name="heartProblems" placeholder="Болезнь..." required>
</label>
<label class="form-label" style="width: 100%;">
    <p>Ваш возраст</p>
    <input id="userAge" class="form-control" name="userAge" placeholder="Возраст..." required>
</label>`
    
}

export function appearDentist(){
    moreInfo.innerHTML=
    `<label class="form-label" style="width: 100%;">
    <p>Дата последнего визита:</p>
    <input id="lastVisit" class="form-control" name="lastVisit" placeholder="Дата последнего визита..." required>
</label>
`   
}

export function appearTerapevt(){
    moreInfo.innerHTML=
    `<label class="form-label" style="width: 100%;">
    <p>Ваш возраст</p>
    <input id="userAge" class="form-control" name="userAge" placeholder="Возраст..." required>
    </label>
`
    
}