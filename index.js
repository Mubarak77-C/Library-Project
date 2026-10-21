console.log('hi')

//1. create empty array 
const myLibrary = [];



//2. create construction function Book 
function Book(id, author, title, numberPage) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.numberPage = numberPage;

}
// 3. Function to create a book and push it to the array
function addBookToLibrary(author, title, numberPage) {
    // Generate a simple unique ID based on array length or random
    const id = myLibrary.length + 1;
    const newBook = new Book(id, author, title, numberPage);
    myLibrary.push(newBook);
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
   
    // Pass the values into your function (Order: author, title, numberPage)
    addBookToLibrary(author, title, Number(numberPage));

    // Clear out the form inputs
    bookForm.reset();


   
});







// 5. Initial test books (3 arguments only: author, title, pages)
 addBookToLibrary("robin", "JS", 4);

addBookToLibrary("John Doe", "DOM Mastery", 200);

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



