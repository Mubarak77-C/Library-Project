// 2. Create constructor function Book
class Book {
  constructor(id, author, title, numberPage, read) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.numberPage = numberPage;
    this.read = read; // boolean (true/false)
  }
  // Prototype method for toggling read status
  toggleRead() {
    this.read = !this.read;
  }
}

// 1. Load from localStorage or start empty
//why taken here below class because it error
//Uncaught ReferenceError: can't access lexical declaration 'Book' before initialization
//JavaScript throws a "Temporal Dead Zone" error-mean exit class
//JavaScript classes are not hoisted(mean allocate memory to variable,method, class function )
let myLibrary = loadLibraryFromStorage();

// Storage helper functions
function saveLibraryToStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibraryFromStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (storedLibrary) {
    const parsed = JSON.parse(storedLibrary);
    return parsed.map(
      (book) =>
        new Book(book.id, book.author, book.title, book.numberPage, book.read),
    );
  }
  return [];
}

// 3. Function to create a book and push it to the array
function addBookToLibrary(author, title, numberPage, read) {
  const id = myLibrary.length + 1;
  const newBook = new Book(id, author, title, numberPage, read);
  myLibrary.push(newBook);
  saveLibraryToStorage();
}

// Function to calculate and update stats
function updateStats() {
  const totalBooks = myLibrary.length;
  const readBooks = myLibrary.filter((book) => book.read === true).length;
  const unreadBooks = totalBooks - readBooks;

  document.querySelector("#stat-total").textContent = totalBooks;
  document.querySelector("#stat-read").textContent = readBooks;
  document.querySelector("#stat-unread").textContent = unreadBooks;
}

// Function to display all books on the screen
function renderLibrary() {
  const libraryContainer = document.querySelector("#library-container");
  libraryContainer.innerHTML = "";

  updateStats();

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    if (book.read) {
      bookCard.classList.add("is-read");
    } else {
      bookCard.classList.add("is-unread");
    }

    let readStatus = book.read ? "Read" : "Not Read Yet";

    bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.numberPage}</p>
            <p><strong>Status:</strong> ${readStatus}</p>
            <button class="toggle-read-btn" data-index="${i}">Toggle Read</button>
            <button class="delete-btn" data-index="${i}">Delete Book</button>
        `;

    libraryContainer.appendChild(bookCard);
  }
}

// DOM & Event Listeners
const bookForm = document.querySelector("#book-form");
const bookDialog = document.querySelector("#book-dialog");
const openModalBtn = document.querySelector("#open-modal-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const libraryContainer = document.querySelector("#library-container");

const titleInput = document.querySelector("#title");
const titleError = document.querySelector("#title-error");
const authorInput = document.querySelector("#author");
const authorError = document.querySelector("#author-error");
const pagesInput = document.querySelector("#pages");
const pagesError = document.querySelector("#pages-error");

// Hook up live validation event listeners
titleInput.addEventListener("input", validateTitle);
authorInput.addEventListener("input", validateAuthor);
pagesInput.addEventListener("input", validatePages);

openModalBtn.addEventListener("click", () => bookDialog.showModal());
cancelBtn.addEventListener("click", () => bookDialog.close());

bookDialog.addEventListener("click", (event) => {
  const dialogDimensions = bookDialog.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    bookDialog.close();
  }
});

bookForm.addEventListener("submit", function (event) {
  // Run validation checks to ensure custom messages are populated if empty
  validateTitle();
  validateAuthor();
  validatePages();

  // If the form is invalid, prevent submission
  if (!bookForm.checkValidity()) {
    event.preventDefault();
    return;
  }

  event.preventDefault(); // Keep this to manage adding via JS
  const title = titleInput.value;
  const author = authorInput.value;
  const numberPage = pagesInput.value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(author, title, Number(numberPage), read);
  bookForm.reset();

  // Clear error states/messages after closing
  titleError.textContent = "";
  authorError.textContent = "";
  pagesError.textContent = "";

  bookDialog.close();
  renderLibrary();
});

libraryContainer.addEventListener("click", function (event) {
  const index = event.target.getAttribute("data-index");

  if (event.target.classList.contains("delete-btn")) {
    myLibrary.splice(index, 1);
    saveLibraryToStorage();
    renderLibrary();
  }

  if (event.target.classList.contains("toggle-read-btn")) {
    myLibrary[index].toggleRead();
    saveLibraryToStorage();
    renderLibrary();
  }
});

// Initial test books (Only add them if the library is completely empty)
if (myLibrary.length === 0) {
  addBookToLibrary("robin", "JS", 4, true);
  addBookToLibrary("John Doe", "DOM Mastery", 200, false);
}

// Initial render on page load
renderLibrary();

function validateTitle() {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("The book title must be filled!");
    titleError.textContent = "The book title must be filled!";
    titleError.className = "error-message active";
  } else {
    titleInput.setCustomValidity("");
    titleError.textContent = "";
    titleError.className = "error-message";
  }
}

function validateAuthor() {
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("The author name must be filled!");
    authorError.textContent = "The author name must be filled!";
    authorError.className = "error-message active";
  } else {
    authorInput.setCustomValidity("");
    authorError.textContent = "";
    authorError.className = "error-message";
  }
}

function validatePages() {
  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity("The number of pages must be filled!");
    pagesError.textContent = "The number of pages must be filled!";
    pagesError.className = "error-message active";
  } else if (pagesInput.validity.rangeUnderflow) {
    pagesInput.setCustomValidity("Pages must be at least 1!");
    pagesError.textContent = "Pages must be at least 1!";
    pagesError.className = "error-message active";
  } else {
    pagesInput.setCustomValidity("");
    pagesError.textContent = "";
    pagesError.className = "error-message";
  }
}
// Hook up live validation event listeners
titleInput.addEventListener("input", validateTitle);
authorInput.addEventListener("input", validateAuthor);
pagesInput.addEventListener("input", validatePages);
