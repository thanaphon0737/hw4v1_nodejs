
class Form {
    constructor(name, email, subject, msg) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.msg = msg;
    }
}

class UI {
    static displayForms() {

        const contactform = Store.getContacts();

        contactform.forEach((con) => UI.addFormToList(con));
    }

    // 4. add Form
    static addFormToList(con) {
        const list = document.querySelector('#conform-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${con.name}</td>
        <td>${con.email}</td>
        <td>${con.subject}</td>
        <td>${con.msg}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
      `;

        list.appendChild(row);
    }

    // 11. delete Form  
    static deleteForm(el) {
        // if element contains .delete class
        if (el.classList.contains('delete')) {
            // remove <a> -> <td> -> <tr>       
            el.parentElement.parentElement.remove();
        }
    }

    // 13. show alert  
    // <div class="alert alert-success/alert-danger>Message</div>
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#con-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // 9. clear fields  
    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#subject').value = '';
        document.querySelector('#msg').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getContacts() {
        let forms;
        if (localStorage.getItem('forms') === null) {
            forms = [];
        } else {
            forms = JSON.parse(localStorage.getItem('forms'));
        }

        return forms;
    }

    static addForm(form) {
        const forms = Store.getContacts();
        forms.push(form);
        localStorage.setItem('forms', JSON.stringify(forms));
    }

    static removeForm(ee) {
        console.log(ee);
        const forms = Store.getContacts();
        console.log(forms);
        forms.forEach((form, index) => {
            console.log(form.msg);
            if (form.msg === ee) {
                forms.splice(index, 1);
            }
        });

        localStorage.setItem('forms', JSON.stringify(forms));
    }
}

// 4. Event: Display Forms
document.addEventListener('DOMContentLoaded', UI.displayForms);

// 5. Event: Add a Form
document.querySelector('#con-form').addEventListener('submit', (e) => {
    // 7. Prevent actual submit action
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const msg = document.querySelector('#msg').value;

    // 12. Validate
    if (!name || !email || !subject || !msg) {
        alert('Please fill all data');
    } else {
        // 6. Instatiate Form
        const form = new Form(name, email, subject, msg);
        // console.log(book);
        console.log(form);
        // 8. Add Form to UI
        UI.addFormToList(form);

        // Add Form to store
        Store.addForm(form);

        // 13. Show success message
        UI.showAlert('Form Added', 'success');

        // 9. Clear fields
        UI.clearFields();
    }
});

// 10. Event: Remove a form - event propagation by selecting the parent
document.querySelector('#conform-list').addEventListener('click', (e) => {
    // console.log(e.target);

    // 11. Remove form from UI
    UI.deleteForm(e.target);

    // Remove form from store
    Store.removeForm(e.target.parentElement.previousElementSibling.textContent);

    // 13. Show success message
    UI.showAlert('Form Removed', 'success');
});