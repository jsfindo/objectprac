const myLibrary = [];

const newBookBtn = document.getElementById('newBookBtn');
const formContainer = document.getElementById('formContainer');

newBookBtn.addEventListener('click', () => {
  formContainer.style.display = 'block';
});

function Book(author, title, genre, pagecount, read) {
  this.author = author;
  this.title = title;
  this.genre = genre;
  this.pagecount = pagecount;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(author, title, genre, pagecount, read) {
  const book = new Book(author, title, genre, pagecount, read);
  myLibrary.push(book);
  renderLibrary();
}

function renderLibrary() {
  const output = document.getElementById('output');
  output.innerHTML = '';

  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);

    const displayTitle = document.createElement("h3");
    displayTitle.innerText = book.title;

    const displayAuthor = document.createElement("h4");
    displayAuthor.innerText = `By: ${book.author}`;

    const displayGenre = document.createElement("h4");
    displayGenre.innerText = `Genre: ${book.genre}`;

    const displayPages = document.createElement("h5");
    displayPages.innerText = `Pages: ${book.pagecount}`;

    const displayRead = document.createElement("div");

    if (book.read === "Yes") {
      displayRead.innerHTML = `Status: <input type="checkbox" checked disabled> Read`;
    } else {
      displayRead.innerHTML = `Status: <span style="color: red; font-weight: bold;">✘</span> Not Read`;

      const changeReadStatus = document.createElement("button");
      changeReadStatus.innerText = "Set as Read";
      changeReadStatus.onclick = () => {
        book.read = "Yes";
        renderLibrary();
      };
      displayRead.appendChild(changeReadStatus);
    }

    bookCard.appendChild(displayTitle);
    bookCard.appendChild(displayAuthor);
    bookCard.appendChild(displayGenre);
    bookCard.appendChild(displayPages);
    bookCard.appendChild(displayRead);

    output.appendChild(bookCard);
  });
}

const form = document.getElementById('bookForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const genre = document.getElementById('genre').value;
  const pagecount = document.getElementById('pages').value;
  const read = document.querySelector('input[name="read"]:checked').value;

  addBookToLibrary(author, title, genre, pagecount, read);

  form.reset();
  formContainer.style.display = 'none';
});