// 1. Load from localStorage or start empty
let myLibrary = loadLibraryFromStorage();

// 2. Create constructor function Book 
function Book(id, author, title, numberPage, read) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.numberPage = numberPage;
    this.read = read; // boolean (true/false)
}

// Prototype method for toggling read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Storage helper functions
function saveLibraryToStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibraryFromStorage() {
    const storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary) {
        const parsed = JSON.parse(storedLibrary);
        return parsed.map(book => new Book(
            book.id, 
            book.author, 
            book.title, 
            book.numberPage, 
            book.read
        ));
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
    const readBooks = myLibrary.filter(book => book.read === true).length;
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
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numberPage = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(author, title, Number(numberPage), read);
    bookForm.reset();
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