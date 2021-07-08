const button = document.getElementById("enter")
const field = document.getElementById("userInput")
const list = document.querySelector("ul")

function isEmpty() {
    return !(field.value.length > 0)
}

button.addEventListener('click', check)

field.addEventListener('keypress', checkButton)

function check() {
    if (!isEmpty()) {
        createTodo()
    }
}

function checkButton(event) {
    if (!isEmpty() && event.which == 13) {
        createTodo()
    }
}

function createTodo() {
    let todoElem = document.createElement('li')
    todoElem.appendChild(document.createTextNode(field.value))
    list.appendChild(todoElem)
    todoElem.addEventListener('click', done)
    field.value = ''

    let deleteButton = document.createElement('button')
    deleteButton.appendChild(document.createTextNode('x'))
    todoElem.appendChild(deleteButton)
    deleteButton.addEventListener('click', deleteTodoElem)

    function deleteTodoElem() {
        todoElem.classList.add('delete')
    }

    function done() {
        todoElem.classList.toggle('done')
    }
}


