// Remember: no copy pasting!

// Controlled input. This is similar to what you did in react.
function inputChanged() {
    setState({ formInput: event.target.value });
}

// We're going to try and stick with React's way of doing things
let state = { items: [], formInput: "" }

// Calling rerender changes the UI to reflect what's in the state

function rerender() {
    let inputElement = document.getElementById('inp');
    inputElement.value = state.formInput; // you can ignore this line

    let d = document.getElementById("items");
    d.innerHTML = '';
    state.items.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        d.appendChild(li)
    })
}

// Our good friend setState paying us a visit from ReactVille
function setState(newState) {
    if (newState.items) state.items = newState.items;
    if (newState.formInput) state.formInput = newState.formInput;
    rerender();
}

    let cb = (itemsFromServer) => {
        let parsedItems = JSON.parse(itemsFromServer)
         setState({ items: parsedItems })

     }
function sendItemToServer(item) {

    fetch('/addItem', {
        method:'POST',
        body: JSON.stringify(item)
    })
    .then(response =>response.text())
    .then(responseBody => cb ? cb(responseBody) : undefined )
}

// When you submit the form, it sends the item to the server
function submitForm() {
    event.preventDefault();
    sendItemToServer(state.formInput);
    setState({formInput: " "})

}

// When the client starts he needs to populate the list of items
function getAllItems() {

    fetch('/items', {
        method:'GET'
    })
    .then(response =>response.text())
    .then(responseBody => cb ? cb(responseBody) : undefined )
}


function clearItems() {

    fetch('/clearItem', {
        method:'GET'
    })
    .then(response =>response.text())
    .then(responseBody => cb ? cb(responseBody) : undefined )
}

function reverseItems() {

    fetch('/reverseitems', {
        method:'GET'
    })
    .then(response =>response.text())
    .then(responseBody => cb ? cb(responseBody) : undefined )
}

// We define a function and then call it right away. I did this to structure the file.
getAllItems();
