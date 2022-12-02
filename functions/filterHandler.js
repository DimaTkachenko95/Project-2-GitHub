import Modal from "../modules/modal.js";
import filterForm from "../modules/filterForm.js";

export function filterHandler (callback) {
    const filterBtn = document.querySelector(".btn-filter")
    filterBtn.addEventListener('click', e => {
        const newFilter = new filterForm();

        const newUserModal = new Modal ({
            headerTitle: 'Filter',
            body: newFilter.render(callback),
            closeOutside: true,
        })
        document.body.append(newUserModal.render());
    })
}
