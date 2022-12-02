const alert = (text,status) => {
    document.body.insertAdjacentHTML('beforebegin', `
        <div class="alert alert-${status}" role="alert">
            ${text}
        </div>
    `)
    setTimeout(()=>{
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove()
        }
    },2000)
}

export const delUserSuccess = () => alert('Deleted User success', 'success')
export const delUserError = () => alert('Deleted User error', 'danger')
export const addedUserSuccess = () => alert('Added User success', 'success')
export const addedUserError = () => alert('Added User error', 'danger')

