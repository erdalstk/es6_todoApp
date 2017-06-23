"use strict";function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,o=Array(t.length);e<t.length;e++)o[e]=t[e];return o}return Array.from(t)}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),ES6ToDoApp=function(){function t(){var e=this;_classCallCheck(this,t),this.todoContainer=document.getElementById("todo-container"),this.todoText=document.getElementById("todo-text"),this.todoAdd=document.getElementById("save"),this.todoList=document.getElementById("todo-list"),this.todoDoneList=document.getElementById("todo-done-list"),this.todoAdd.addEventListener("click",function(){return e.todoSave()}),this.todoText.addEventListener("keyup",function(){return e.toggleButton()});for(var o in localStorage){var n=JSON.parse(localStorage.getItem(o));this.todoCreate(o,n)}window.addEventListener("storage",function(t){return e.todoCreate(t.key,t.newValue)})}return _createClass(t,[{key:"todoSave",value:function(){if(this.todoText.value){var t=Date.now().toString(),e={text:this.todoText.value,status:this.todoText.dataset.status};localStorage.setItem(t,JSON.stringify(e));var o=JSON.parse(localStorage.getItem(t));this.todoCreate(t,o),this.toggleButton()}}},{key:"todoCreate",value:function(t,e){var o=document.getElementById(t);o||""!=e.status||(o=document.createElement("to-do-item"),o.id=t,this.todoContainer.insertBefore(o,this.todoList.nextSibling),o.setMessage(e.text),o.setStatus(e.status)),o||"done"!=e.status||(o=document.createElement("to-do-item"),o.id=t,this.todoContainer.insertBefore(o,this.todoDoneList.nextSibling),o.setMessage(e.text),o.setStatus(e.status))}},{key:"toggleButton",value:function(t){this.todoText.value?this.todoAdd.removeAttribute("disabled"):this.todoAdd.setAttribute("disabled","true")}}]),t}();window.addEventListener("load",function(){return new ES6ToDoApp});var TodoItem=function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return _inherits(e,t),_createClass(e,[{key:"createdCallback",value:function(){var t,o=this;this.dataset.status="",(t=this.classList).add.apply(t,_toConsumableArray(e.CLASSES)),this.innerHTML=e.TEMPLATE,this.messageElement=this.querySelector(".message"),this.deleteButton=this.querySelector(".delete"),this.deleteButton.addEventListener("click",function(){return o.todoDelete()}),this.done=this.querySelector(".done"),this.done.addEventListener("click",function(){return o.todoDone()})}},{key:"attributeChangedCallback",value:function(t){if("id"==t){this.id?new Date(parseInt(this.id)):new Date}}},{key:"setMessage",value:function(t){this.messageElement.textContent=t,this.messageElement.innerHTML=this.messageElement.innerHTML.replace(/\n/g,"<br>")}},{key:"setStatus",value:function(t){this.dataset.status=t}},{key:"todoDelete",value:function(){localStorage.removeItem(this.id),this.parentNode.removeChild(this)}},{key:"todoDone",value:function(){this.dataset.status="done",this.parentNode.removeChild(this);var t=document.getElementById("todo-done-list");t.parentNode.insertBefore(this,t.nextSibling);var e=this.id,o=JSON.parse(localStorage.getItem(e));o.status="done",localStorage.setItem(e,JSON.stringify(o))}}]),e}(HTMLElement);TodoItem.TEMPLATE='\n    <div class="message"></div>\n    <a class="done"></a>\n    <a class="delete"></a>',TodoItem.CLASSES=["to-do-item"],document.registerElement("to-do-item",TodoItem);var stickyFooter=function(){var t=window.innerHeight,e=document.getElementById("header").clientHeight,o=t-e-61;document.getElementById("form-section").style.minHeight=o+"px"};window.onresize=function(){stickyFooter()},stickyFooter();