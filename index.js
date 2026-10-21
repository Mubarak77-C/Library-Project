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

//dom graping or access the html attribute each with btn
//a .selecting form element
const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior (which refreshes the page)
    event.preventDefault();

    // Grab the values INSIDE the event listener when the user submits
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numberPage = document.querySelector("#pages").value;

    // Pass the values into your function
    addBookToLibrary(author, title, Number(numberPage));

    // Clear out the form inputs
    bookForm.reset();


    addBookToLibrary(title, author, pages);
    bookForm.reset();
});








// 4. Call the function to add books
const fetch = addBookToLibrary(1, "robin", "JS", 4);
// console.log(fetch);  //undefined because we aadding this data to empty arr since we know how to fetch data from arr by loop
addBookToLibrary(2, "John Doe", "DOM Mastery", 200);

// 5. Loop through the array and fetch each key/value
console.log("--- Fetching Library Books ---");

// for (let i = 0; i < myLibrary.length; i++) {
//     let currentBook = myLibrary[i];
//     console.log(`\n Book Index ${i} : `);

//     for (key in currentBook) {
//         console.log(` ${key} -> ${currentBook[key]}`);
//     }
// }

//using secure loop for of 
// --- LOOPING SECTION ---


// 1. Use FOR...OF to loop through the array of books
for (let book of myLibrary) {
    console.log("\n--- Book Details ---");

    // 2. Use Object.entries() to safely loop through the keys and values of the book object
    for (let [key, value] of Object.entries(book)) {
        console.log(`${key}: ${value}`);
    }
}



