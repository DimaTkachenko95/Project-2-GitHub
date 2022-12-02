export default function loader (wrapper) {
    //wrapper.style.display = 'none';
    wrapper.insertAdjacentHTML('beforeend',`<div class="loader"><div class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></div></div>`);
    const sleep = async () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(), 500)
        })
    }
    return sleep().then(() => {
        document.querySelector('.loader').remove();
    })
}
