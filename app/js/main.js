/** ES6 To Do App*/
class ES6ToDoApp {
    constructor() {
        this.todoContainer = document.getElementById('todo-container');
        this.todoText = document.getElementById('todo-text');
        this.todoAdd = document.getElementById('save');
        this.todoList = document.getElementById('todo-list');
        this.todoDoneList = document.getElementById('todo-done-list');
        /** to do ekle */
        this.todoAdd.addEventListener('click', () => this.todoSave());
        this.todoText.addEventListener('keyup', () => this.toggleButton());
        /** Local Storage'taki tüm to do öğelerini yükle */
        for (let key in localStorage) {
            let todoObjRetrieved = JSON.parse(localStorage.getItem(key));
            this.todoCreate(key, todoObjRetrieved);
        }
        window.addEventListener('storage', e => this.todoCreate(e.key, e.newValue));
    }

    /** to do öğelerini local storage a kaydeder*/
    todoSave() {
        if (this.todoText.value) {
            let key = Date.now().toString();
            let todoObj = {
                text: this.todoText.value,
                status : this.todoText.dataset.status
            };
            localStorage.setItem(key, JSON.stringify(todoObj));
            let todoObjRetrieved = JSON.parse(localStorage.getItem(key));
            this.todoCreate(key, todoObjRetrieved);
            this.toggleButton();
        }

    }

    /** to do öğesini data-status'e göre  oluşturur */
    todoCreate(key, todoObj) {
        let note = document.getElementById(key);
        /** yeni to do oluştur*/
        if (!note && todoObj.status == "") {
            note = document.createElement('to-do-item');
            note.id = key;
            this.todoContainer.insertBefore(note, this.todoList.nextSibling);
            note.setMessage(todoObj.text);
            note.setStatus(todoObj.status);
        }
        if (!note && todoObj.status == "done") {
            note = document.createElement('to-do-item');
            note.id = key;
            this.todoContainer.insertBefore(note, this.todoDoneList.nextSibling);
            note.setMessage(todoObj.text);
            note.setStatus(todoObj.status);
        }
    }

    /** ekle düğmesi disable - enable aksiyonu */
    toggleButton(event) {
        if (this.todoText.value) {
            this.todoAdd.removeAttribute('disabled');
        } else {
            this.todoAdd.setAttribute('disabled', 'true');
        }
    }
}

window.addEventListener('load', () => new ES6ToDoApp());

/** to-do-item html elementi */
class TodoItem extends HTMLElement {
    createdCallback() {
        this.dataset.status = "";
        this.classList.add(...TodoItem.CLASSES);
        this.innerHTML = TodoItem.TEMPLATE;
        this.messageElement = this.querySelector('.message');
        this.deleteButton = this.querySelector('.delete');
        this.deleteButton.addEventListener('click', () => this.todoDelete());
        this.done = this.querySelector('.done');
        this.done.addEventListener('click', () => this.todoDone());
    }
    attributeChangedCallback(attributeName) {
        if (attributeName == 'id') {
            let date;
            if (this.id) {
                date = new Date(parseInt(this.id));
            } else {
                date = new Date();}
        }
    }
    setMessage(message) {
        this.messageElement.textContent = message;
        this.messageElement.innerHTML = this.messageElement.innerHTML.replace(/\n/g, '<br>');
    }
    setStatus(status) {
        this.dataset.status = status;
    }
    todoDelete() {
        localStorage.removeItem(this.id);
        this.parentNode.removeChild(this);}
    todoDone() {
        this.dataset.status = "done";
        this.parentNode.removeChild(this);
        let todoDoneList = document.getElementById('todo-done-list');
        todoDoneList.parentNode.insertBefore(this, todoDoneList.nextSibling);
        let key = this.id,
            todoObjRetrieved = JSON.parse(localStorage.getItem(key));
            todoObjRetrieved.status = 'done';
        localStorage.setItem(key, JSON.stringify(todoObjRetrieved));
    }
}

/** to do öğesi html şablonu*/
TodoItem.TEMPLATE = `
    <div class="message"></div>
    <a class="done"></a>
    <a class="delete"></a>`;
TodoItem.CLASSES = ['to-do-item'];
document.registerElement('to-do-item', TodoItem);

/** footer alanını aşağıya yapışık yapan bölüm*/
var stickyFooter = () => {
    var viewPortHeight = window.innerHeight,
        headerHeight = document.getElementById("header").clientHeight,
        sectionHeight = viewPortHeight - headerHeight -61,
        section = document.getElementById("form-section");
    section.style.minHeight = sectionHeight + "px";
};

window.onresize = function(){
    stickyFooter();
};
stickyFooter();