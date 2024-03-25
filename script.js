// ! Grabbing the elements needed from html / creating global variables used multiple times in the code
const books = document.getElementById("books");
const addButton = document.getElementById("add");
const template = document.getElementById("template")
const layout = document.getElementById("layout")
const title = document.getElementById("title");
const asideb = document.getElementById("aside-b");
const errorMsg = document.createElement("p");
const completionMsg = document.createElement("p");
const removeMsg = document.createElement("p");
const readyButton = document.getElementById("readyButton");
const popUp = document.getElementById("popUp");

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
    img.setAttribute("onerror", "this.onerror=null; this.src='data:image/jpeg;base64,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';")
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

readyButton.addEventListener("click", () => {
    popUp.remove()
    setTimeout(() => {
        popUp.style.opacity = '0'; // Smoothly transition the opacity to 0 (fully transparent)
    }, 30000);
});

// openingPopup()

// * Update BEM to appropriate naming, focus on component-based naming
// * Update your JS to incorporate the updated BEM names
// * create functions for code that is too long inside of other functions
// * create a completion element and create a separate errormessage element

 