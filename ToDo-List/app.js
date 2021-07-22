$(function() {

    const buttonEnter = $('#enter')
    const userInput = $('#userInput')
    const ul = $('ul')

    // local storage
    const items = JSON.parse(localStorage.getItem('todos') || '[]');

    function saveItems() {
        localStorage.setItem('todos', JSON.stringify(items))
    }

    function addItem(text) {
        const item = {
            id: Date.now(),
            text
        };

        items.push(item);
        saveItems();

        return item;
    }

    function removeItem(id) {
        const idx = items.findIndex(i => i.id === id)

        if (idx > -1) {
            items.splice(idx, 1)
        }

        saveItems();
    }

    function updateItem(id, v) {
        const idx = items.findIndex(i => i.id === id)

        if (idx > -1) {
            items[idx].text = v;
        }

        saveItems();
    }

    function toggleItem(id) {
        const idx = items.findIndex(i => i.id === id)

        if (idx > -1) {
            items[idx].done = !items[idx].done;
        }

        saveItems();
    }


    // elements
    function createItemDOM(item) {
        const id = item.id;
        const li = $('<li>')
        li.html('<span>' + item.text + "</span>");
        ul.append(li)

        li.click(function() {
            toggleItem(id)
            $(this).toggleClass('done')
        })

        if (item.done) {
            li.toggleClass('done')
        }

        li.addClass(item.color)

        const deleteButton = $('<button>')
        deleteButton.html('X')
        li.append(deleteButton)
        deleteButton.click(function(e) {
            e.stopPropagation();
            removeItem(id);
            li.remove();
        })
    }

    function renderItems() {
        ul.html('');

        items.forEach((i) => {
            createItemDOM(i)
        });
    }

    function inputLength() {
        return userInput.val().length > 0
    }

    function createTodo() {
        const item = addItem(userInput.val())
        createItemDOM(item);
        userInput.val('')
    }

    function changeListAfterKeypress(event) {
        if (inputLength() && event.which == 13) {
            createTodo()
        }
    }

    function changeListAfterClick() {
        if (inputLength()) {
            createTodo()
        }
    }

    userInput.keypress(changeListAfterKeypress)
    buttonEnter.click(changeListAfterClick);

    renderItems();
});