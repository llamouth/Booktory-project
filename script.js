// ! Grabbing the elements needed from html / creating global variables used multiple times in the code
const books = document.getElementById("books");
const addButton = document.getElementById("add");
const template = document.getElementById("template")
const layout = document.getElementById("layout")
const title = document.getElementById("title");
const asideb = document.getElementById("aside-b");
const errorMsg = document.createElement("p");
const completionMsg = document.createElement("p");
const removeMsg = document.createElement("p")

// ! Adding Event listener to the add button
addButton.addEventListener("click", (e) => {
    // ! Retrieving the form after the click is pressed 
    const form = e.target.form;
    
    // ! Checking if all of the forms inputs are valid
    if (validateForm(form)) { 
        // ! Destructing the form array / Creating an object to hold the values
        const [title, author, image, price, stock] = form;
        const bookObj = {
            title: title.value,
            author: author.value,
            image: image.value,
            price: `$${price.value}`,
            stockValue: stock.value, 
            inStock: `${stock.value === "In-Stock"}`
        };

        // ! Appending the completed returned book to the book list
        books.append(generateBook(bookObj)); 
        
        // ! Displaying complete message when form is completed correctly / calling display Template function
        handleFormCompleteMessage();
        displayTemplate();

        // ! Resetting the values
        title.value = "";
        author.value = "";
        image.value = "";
        price.value = "";
    }else { 
        // ! If the form had an invalid input it will run this code that will display error message
        handleFormErrorMessage(); 
    }

    // ! Prevents the default action of the event
    e.preventDefault();
})

// ! Validate the form by looping through the form array and returning false if any of the values are empty. else return true
const validateForm = (formArr) => {

    for (let i = 0; i < formArr.length - 1; i++) {
        if (formArr[i].value === "") {
            return false;
        }
    }
    return true;
}

// ! Funnction to display the error message
const handleFormErrorMessage = () => {

    errorMsg.textContent = "Missing Required Book Information. Please fill out all fields";
    errorMsg.setAttribute("class", "form__incomplete");
    asideb.append(errorMsg);  
    completionMsg.remove();    
}

// ! Function to display the complete Message
const handleFormCompleteMessage = () => {

    completionMsg.textContent = "Book Added"
    completionMsg.setAttribute("class", "form__complete");
    asideb.append(completionMsg)
    errorMsg.remove()
}

// ! Function to display the template if the book like is emptty
const displayTemplate = () => {

    const bookList = books.getElementsByTagName("li")
    if(bookList.length === 0) {
        books.append(template)
    }else {
        template.remove()
    }
}

// ! Function to create the book element with its respective information
const generateBook = (bookObj) => {

    const book = document.createElement("li");
    const bookInfo = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const stock = document.createElement("div");
    const price = document.createElement("p");
    const trash = document.createElement("i");

    book.setAttribute("class", "books__book")
    bookInfo.setAttribute("class", "books__book-info")
    img.setAttribute("src", bookObj.image)
    title.setAttribute("class", "title")
    author.setAttribute("class","author")
    stock.setAttribute("class", `${bookObj.stockValue === "In-Stock" ? "stocked" : "notStocked"}`)
    price.setAttribute("class", "price")
    trash.setAttribute("class", "fa-solid fa-trash-can")
    
    title.textContent = bookObj.title
    author.textContent = bookObj.author
    stock.textContent = bookObj.stockValue
    price.textContent = bookObj.price
    
    bookInfo.append(title, author, stock,  price, trash)
    book.append(img, bookInfo)

    addEventsToBook([trash, book], stock)

    return book
}


// ! Function that adds event listeners to the buttons within the book
const addEventsToBook = (trashButtonArray, stockButton) => {

    trashButtonArray[0].addEventListener("click", () => {
        trashButtonArray[1].remove()
        removeMsg.setAttribute("class", "remove");
        removeMsg.textContent = "Book Removed"
        
        displayTemplate()
    })

    stockButton.addEventListener("click", () => {
        if(stockButton.classList.contains("notStocked")) {
            stockButton.classList.remove("notStocked")
            stockButton.classList.add("stocked")
            stockButton.textContent = "In-Stock"
        }else {
            stockButton.classList.remove("stocked")
            stockButton.classList.add("notStocked")
            stockButton.textContent = "Not-In-Stock"
        }
    })
}

// * Update BEM to appropriate naming, focus on component-based naming
// * Update your JS to incorporate the updated BEM names
// * create functions for code that is too long inside of other functions
// * create a completion element and create a separate errormessage element

 