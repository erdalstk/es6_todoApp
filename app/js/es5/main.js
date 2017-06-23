'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** ES6 To Do App*/
var ES6ToDoApp = function () {
    function ES6ToDoApp() {
        var _this = this;

        _classCallCheck(this, ES6ToDoApp);

        this.todoContainer = document.getElementById('todo-container');
        this.todoText = document.getElementById('todo-text');
        this.todoAdd = document.getElementById('save');
        this.todoList = document.getElementById('todo-list');
        this.todoDoneList = document.getElementById('todo-done-list');
        /** to do ekle */
        this.todoAdd.addEventListener('click', function () {
            return _this.todoSave();
        });
        this.todoText.addEventListener('keyup', function () {
            return _this.toggleButton();
        });
        /** Local Storage'taki tüm to do öğelerini yükle */
        for (var key in localStorage) {
            var todoObjRetrieved = JSON.parse(localStorage.getItem(key));
            this.todoCreate(key, todoObjRetrieved);
        }
        window.addEventListener('storage', function (e) {
            return _this.todoCreate(e.key, e.newValue);
        });
    }

    /** to do öğelerini local storage a kaydeder*/


    _createClass(ES6ToDoApp, [{
        key: 'todoSave',
        value: function todoSave() {
            if (this.todoText.value) {
                var key = Date.now().toString();
                var todoObj = {
                    text: this.todoText.value,
                    status: this.todoText.dataset.status
                };
                localStorage.setItem(key, JSON.stringify(todoObj));
                var todoObjRetrieved = JSON.parse(localStorage.getItem(key));
                this.todoCreate(key, todoObjRetrieved);
                this.toggleButton();
            }
        }

        /** to do öğesini data-status'e göre  oluşturur */

    }, {
        key: 'todoCreate',
        value: function todoCreate(key, todoObj) {
            var note = document.getElementById(key);
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

    }, {
        key: 'toggleButton',
        value: function toggleButton(event) {
            if (this.todoText.value) {
                this.todoAdd.removeAttribute('disabled');
            } else {
                this.todoAdd.setAttribute('disabled', 'true');
            }
        }
    }]);

    return ES6ToDoApp;
}();

window.addEventListener('load', function () {
    return new ES6ToDoApp();
});

/** to-do-item html elementi */

var TodoItem = function (_HTMLElement) {
    _inherits(TodoItem, _HTMLElement);

    function TodoItem() {
        _classCallCheck(this, TodoItem);

        return _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).apply(this, arguments));
    }

    _createClass(TodoItem, [{
        key: 'createdCallback',
        value: function createdCallback() {
            var _classList,
                _this3 = this;

            this.dataset.status = "";
            (_classList = this.classList).add.apply(_classList, _toConsumableArray(TodoItem.CLASSES));
            this.innerHTML = TodoItem.TEMPLATE;
            this.messageElement = this.querySelector('.message');
            this.deleteButton = this.querySelector('.delete');
            this.deleteButton.addEventListener('click', function () {
                return _this3.todoDelete();
            });
            this.done = this.querySelector('.done');
            this.done.addEventListener('click', function () {
                return _this3.todoDone();
            });
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(attributeName) {
            if (attributeName == 'id') {
                var date = void 0;
                if (this.id) {
                    date = new Date(parseInt(this.id));
                } else {
                    date = new Date();
                }
            }
        }
    }, {
        key: 'setMessage',
        value: function setMessage(message) {
            this.messageElement.textContent = message;
            this.messageElement.innerHTML = this.messageElement.innerHTML.replace(/\n/g, '<br>');
        }
    }, {
        key: 'setStatus',
        value: function setStatus(status) {
            this.dataset.status = status;
        }
    }, {
        key: 'todoDelete',
        value: function todoDelete() {
            localStorage.removeItem(this.id);
            this.parentNode.removeChild(this);
        }
    }, {
        key: 'todoDone',
        value: function todoDone() {
            this.dataset.status = "done";
            this.parentNode.removeChild(this);
            var todoDoneList = document.getElementById('todo-done-list');
            todoDoneList.parentNode.insertBefore(this, todoDoneList.nextSibling);
            var key = this.id,
                todoObjRetrieved = JSON.parse(localStorage.getItem(key));
            todoObjRetrieved.status = 'done';
            localStorage.setItem(key, JSON.stringify(todoObjRetrieved));
        }
    }]);

    return TodoItem;
}(HTMLElement);

/** to do öğesi html şablonu*/


TodoItem.TEMPLATE = '\n    <div class="message"></div>\n    <a class="done"></a>\n    <a class="delete"></a>';
TodoItem.CLASSES = ['to-do-item'];
document.registerElement('to-do-item', TodoItem);

/** footer alanını aşağıya yapışık yapan bölüm*/
var stickyFooter = function stickyFooter() {
    var viewPortHeight = window.innerHeight,
        headerHeight = document.getElementById("header").clientHeight,
        sectionHeight = viewPortHeight - headerHeight - 61,
        section = document.getElementById("form-section");
    section.style.minHeight = sectionHeight + "px";
};

window.onresize = function () {
    stickyFooter();
};
stickyFooter();