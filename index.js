console.warn('Connected');

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', formSubmit);

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

Display.prototype.add = function (book) {
    console.log('Adding to UI');
    tableBody = document.getElementById('tableBody');
    let html = `
    <tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    </tr>`
    tableBody.innerHTML += html;
}

Display.prototype.validate = function (book) {
    if(book.name.length>2 || book.author>2){
        return true;
    }
    return false;
}

Display.prototype.show = function (type,dispMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>Message: </strong>${dispMessage}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
    `;
    setTimeout(()=>{
        message.innerHTML = '';
    },2000);
}

Display.prototype.clear = function () {
    libraryForm.reset();
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
    console.log(book);

    let display = new Display();

    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success', 'Your Book is Added Successfully !!!');
    }
    else{
        display.show('danger', 'Book name or Author name length should be greater than 2.');
    }
}