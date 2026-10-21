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
function addBookToLibrary(id, author, title, numberPage) {
    // let idBook=id.push(myLibrary);
    // let authorBook=author.push(myLibrary);
    //  let titleBook=title.push(myLibrary);
    // let numberPageBook=numberPage.push(myLibrary);
    //above completely wrong syntax 

    //here i dont how to create that store value and push inside empty aray
    //##solution create new instance obj construction then and call it 
    const newBook = new Book(id, author, title, numberPage);
    //Push the obj into empty array
    myLibrary.push(newBook);

}
// 4. Call the function to add books
const fetch = addBookToLibrary(1, "robin", "JS", 4);
// console.log(fetch);  //undefined because we aadding this data to empty arr since we know how to fetch data from arr by loop

// 5. Loop through the array and fetch each key/value
console.log("--- Fetching Library Books ---");

for (let i = 0; i < myLibrary.length; i++) {
    let currentBook = myLibrary[i];
    console.log(`\n Book Index ${i} : `);

    for (key in currentBook) {
        console.log(` ${key} -> ${currentBook[key]}`);
    }
}

