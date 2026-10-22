//#destructing - it is unpact or extract value from object and array also api ,to etch data from incoming data like obj arr api etc
//

function getdata(responseData) {
    const { username, location } = responseData.user.id;
    console.log(username, location);
}


const complexApiData = {
    status: 200,
    result: {
        post: {
            title: "Mastering JavaScript",
            author: {
                name: "Alex",
                contact: {
                    email: "alex@code.com"
                }
            },
            tags: ["tech", "coding", "web"]
        }
    }
};
//The title of the post (rename it to postTitle).
// const {result:{post: {title:postTitle}}}= complexApiData;
// console.log(postTitle);
// // The email of the author.
// const {result:{post:{author:{contact:{email}}}}} = complexApiData;
// console.log(email)
// // The very first tag from the tags array.
// const {result:{post:{tags:[index0]}}} =complexApiData;
// console.log(index0);
// // Give status a default value of "draft" (since it's missing in the object).
// const {status:draft}=complexApiData;
// console.log(draft); //this is just remaining;
// // If 'status' is missing or undefined, it defaults to "draft"
// const { status = "draft" } = complexApiData;
// console.log([draft]); 
// console.log(draft)

//we have fetch one by one but in production level here it is at once way
const {
    status = "draft",
    result: {
        post: { title: postTitle,
        author: { contact: { email } },
        tags: [firtTag]
    }
}

} = complexApiData;

console.log(postTitle);
console.log(email);
console.log(firtTag);
console.log(status);

// Destructuring right inside the function parameters!
function printBookInfo({ title, author }) {
    console.log(`${title} by ${author}`);
}

const myFavBook = { title: "JS Mastery", author: "Robin", pages: 100 };
printBookInfo(myFavBook); // "JS Mastery by Robin"