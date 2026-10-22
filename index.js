console.log('hi')

//1. create empty array 
//const myLibrary = [];
// 1. Load from localStorage or start empty
let myLibrary = loadLibraryFromStorage();
// Modal Elements
const bookDialog = document.querySelector("#book-dialog");
const openModalBtn = document.querySelector("#open-modal-btn");
const cancelBtn = document.querySelector("#cancel-btn");

// 9.1. Open the modal
openModalBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

// 9.2. Close the modal when clicking Cancel
cancelBtn.addEventListener("click", () => {
    bookDialog.close();
});

//9.3 
// Close modal when clicking on the grey backdrop outside the dialog
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

//2. create construction function Book 
function Book(id, author, title, numberPage, read) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.numberPage = numberPage;
    this.read = read; // boolean (true/false)

}
// 3. Function to create a book and push it to the array
function addBookToLibrary(author, title, numberPage, read) {
    // Generate a simple unique ID based on array length or random
    const id = myLibrary.length + 1;
    const newBook = new Book(id, author, title, numberPage, read);
    myLibrary.push(newBook);

    // 👉 SAVE TO LOCALSTORAGE
    saveLibraryToStorage();
}

// 4. DOM grabbing & Event Listener for the form
//a .selecting form element
const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior (which refreshes the page)
    event.preventDefault();

    // Grab the values INSIDE the event listener when the user submits
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numberPage = document.querySelector("#pages").value;
    // Grab the checkbox status (true if checked, false if not)
    const read = document.querySelector("#read").checked;

    // Pass the values into your function (Order: author, title, numberPage)
    addBookToLibrary(author, title, Number(numberPage), read);

    // Clear out the form inputs
    bookForm.reset();

    // 👉 CLOSE THE MODAL AFTER SUBMITTING
    bookDialog.close();

    // ADD THIS LINE to see the updated array right away in the console!
    console.log("Updated Library Array:", myLibrary);
    // Re-render the library so the new book appears on screen!
    renderLibrary();

});


// Function to display all books on the screen
function renderLibrary() {
    const libraryContainer = document.querySelector("#library-container");

    // 1. Clear the container first so we don't duplicate old cards
    libraryContainer.innerHTML = "";

    updateStats();

    // 2. Loop through the array and create a card for each book
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];

        // Create a card div
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        // 👉 Add a status class depending on whether it's read or not
        if (book.read) {
            bookCard.classList.add("is-read");
        } else {
            bookCard.classList.add("is-unread");
        }

        // Display "Read" or "Not Read Yet" based on the boolean
        let readStatus = book.read ? "Read" : "Not Read Yet";

        // Add the book details inside the card using template literals
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.numberPage}</p>
            <p><strong>Status:</strong> ${readStatus}</p>
            <button class="toggle-read-btn" data-index="${i}">Toggle Read</button>
            <button class="delete-btn" data-index="${i}">Delete Book</button>
        `;

        // Append the card to the container on the page
        libraryContainer.appendChild(bookCard);
    }
}

//DELETE BTN 
// Select the library container
const libraryContainer = document.querySelector("#library-container");

libraryContainer.addEventListener("click", function (event) {
    const index = event.target.getAttribute("data-index");

    // If they clicked the delete button
    if (event.target.classList.contains("delete-btn")) {
        myLibrary.splice(index, 1);
        saveLibraryToStorage(); // 👉 SAVE TO LOCALSTORAGE
        renderLibrary();
    }

    // If they clicked the toggle read button
    if (event.target.classList.contains("toggle-read-btn")) {
        // Flip the boolean value (true becomes false, false becomes true)
        myLibrary[index].read = !myLibrary[index].read;
        saveLibraryToStorage(); // 👉 SAVE TO LOCALSTORAGE
        renderLibrary();
    }
});



// 5. Initial test books (3 arguments only: author, title, pages)
//// 5. Initial test books (Only add them if the library is completely empty)
if (myLibrary.length === 0) {
    addBookToLibrary("robin", "JS", 4, true);

    addBookToLibrary("John Doe", "DOM Mastery", 200, false);
}

// 👉 ADD THIS LINE HERE so they show up on screen immediately
renderLibrary();

// 6. Loop through the array and fetch each key/value
console.log("--- Fetching Library Books ---");

// 1. Use FOR...OF to loop through the array of books
for (let book of myLibrary) {
    console.log("\n--- Book Details ---");

    // 2. Use Object.entries() to safely loop through the keys and values of the book object
    for (let [key, value] of Object.entries(book)) {
        console.log(`${key}: ${value}`);
    }
}

//7.local Storage
// Save the current array to localStorage
function saveLibraryToStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Load the array from localStorage (if it exists)
function loadLibraryFromStorage() {
    const storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary) {
        // Parse the JSON string back into a normal JS array of objects
        const parsed = JSON.parse(storedLibrary);

        // Re-assign or map them back so they are actual Book instances if needed, 
        // or just load them directly into myLibrary:
        return parsed;
    }
    return []; // Return empty array if nothing in storage
}

//8.count stat with
//to think it just array total book so arr.length 
//read status count- we just need to arr.filter(arra=>arra.read ===true).length //it boolean return with length if true 
//unread status count -unread = total book length - read book length

// Function to calculate and update stats
function updateStats() {
    const totalBooks = myLibrary.length;

    // Count how many books have read === true
    // We can use the .filter() method or a simple loop
    const readBooks = myLibrary.filter(book => book.read === true).length;
    const unreadBooks = totalBooks - readBooks;

    console.log(`the count stat totat book is : ${totalBooks} and \n read status: ${readBooks} \n unread status : ${unreadBooks} `)

    // Grab the span elements from the DOM
    document.querySelector("#stat-total").textContent = totalBooks;
    document.querySelector("#stat-read").textContent = readBooks;
    document.querySelector("#stat-unread").textContent = unreadBooks;
}