let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', formSubmit);
let tableBody = document.getElementById('tableBody');
let table = document.getElementById('table');

showDetails();

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {

    add(book) {
        let notes = localStorage.getItem('book');
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        let myObj = { name: book.name, author: book.author, type: book.type }
        notesObj.push(myObj);
        localStorage.setItem('book', JSON.stringify(notesObj));
        showDetails();
    }

    validate(book) {
        if (book.name.length > 2 || book.author > 2) {
            return true;
        }
        return false;
    }

    show(type, dispMessage) {
        let message = document.getElementById('message');
        message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>Message: </strong>${dispMessage}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
        `;
        setTimeout(() => {
            message.innerHTML = '';
        }, 2000);
    }

    clear() {
        libraryForm.reset();
    }
}


function formSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let programming = document.getElementById('programming');
    let stories = document.getElementById('stories');
    let cooking = document.getElementById('cooking');
    let type;
    if (programming.checked) {
        type = programming.value;
    }
    else if (stories.checked) {
        type = stories.value;
    }
    else {
        type = cooking.value;
    }

    let book = new Book(name, author, type);

    let display = new Display();
    if (display.validate(book)) {
        display.clear();
        display.add(book);
        display.show('success', 'Your Book is Added Successfully !!!');
        showDetails();
    }
    else {
        display.show('danger', 'Book name or Author name length should be greater than 2.');
        showDetails();
    }
}

function showDetails() {
    let notes = localStorage.getItem('book');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button id="${index}" onclick='del(this.id)' href="#" class="btn btn-primary">Delete Note</button></td>
        </tr>`;
    });
    if (notesObj.length != 0) {
        tableBody.innerHTML = html;
    }
    else {
        table.innerHTML = `<h3 class="text-white">Nothing to Show...Use Add Book Option to add the Book</h3>`
    }
}

function del(index) {
    let notes = localStorage.getItem('book');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('book', JSON.stringify(notesObj));
    showDetails();
}
