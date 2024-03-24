// ! Grabbing the elements needed from html / creating global variables used multiple times in the code
const [formButton, submitButton] = document.querySelectorAll("button");
const popUp = document.getElementById("pop-up");
const form = document.getElementById("form");
const bookList = document.getElementById("books")
const exitButton = document.getElementById("exit")
const errorMsg = document.createElement("p");
const completeMsg = document.createElement("p");
const template = document.createElement("p");

// ! Function to add the hidden class to the pop up to remove the popup form from display
const hidePopUp = () => {
    if(popUp.classList.contains("hidden")){
        popUp.classList.remove("hidden");
    }else {
        popUp.classList.add("hidden");
    }
}

// ! Function to append the children to the parent
const appendElements = (parent, children) => {
    children.forEach(child => parent.append(child));
}

// ! Function to set attributes to book
const settingAttributes = (element, arrayOfProperties) => {
    element.setAttribute(arrayOfProperties[0], arrayOfProperties[1]);
}

// ! Function to create text context for the book 
const creatingTextContent = (element, text) => {
    element.textContent = text;
}

// ! Function to remove the book when the trash is clicked
const removeBook = (trash, book) => {
    trash.addEventListener("click", () => {
        book.remove();
        loadTemplate();
    })
}

// * Not Working *
const resetValues = (elements) => {
    elements.forEach(element => {element.value = ""});
}

// ! Function to validate the input text
const validateForm = () => {
    for(let i = 0; i < form.length - 2; i++) {
        if(form[i].value.trim() === ""){
            handleErrorMsg();
            return false;
        }
    }
    handleCompleteMsg();
    return true;
}

// ! Function that generates an object of the form values
const handleFormValues = () => {
    const [title, author, img, price, stock] = form;
    const bookObj = {
            title: title.value, 
            author: author.value,
            img: img.value,
            price: price.value,
            stock: stock.value,
        }
    return bookObj;
}

// ! Function to generate the error message and display it
const handleErrorMsg = () => {
    settingAttributes(errorMsg, ["class", "incomplete"]);
    creatingTextContent(errorMsg, "Missing Required Information");
    appendElements(popUp, [errorMsg]);
    completeMsg.remove();
}

// ! Function to generrate the complete message and display it
const handleCompleteMsg = () => {
    settingAttributes(completeMsg, ["class", "complete"]);
    creatingTextContent(completeMsg, "Book Added");
    appendElements(bookList, [completeMsg]);
    errorMsg.remove();
}

// ! Function to add event listen to the stock button to change wether the book is stocked or not in stock
const changeStateOfStock = (stock) => {
    stock.addEventListener("click", () => {
        if(stock.classList.contains("notStocked")) {
            stock.classList.remove("notStocked");
            settingAttributes(stock, ["class", "stocked"]);
            creatingTextContent(stock, "In-Stock");
        }else {
            stock.classList.remove("stocked");
            settingAttributes(stock, ["class", "notStocked"]);
            creatingTextContent(stock, "Not-In-Stock");
        }
    })
}

const loadTemplate = () => {
    settingAttributes(template, ["class", "template"]);
    creatingTextContent(template, "Add Books To Your Inventory")
    appendElements(bookList, [template])
    checkAmountOfBooks();
}

const checkAmountOfBooks = () => {
    const listOfBooks = document.getElementsByTagName("li")
    if(listOfBooks.length !== 0) {
        settingAttributes(template, ["class", "template hidden"]);
        appendElements(bookList, [template]);
    }
}

// ! Function to create generate the book to add it to the book list
const generateBook = (bookObj) => {

    const book = document.createElement("li");
    const imgTag = document.createElement("img");
    const bookInfo = document.createElement("div");
    const titleTag = document.createElement("p");
    const authorTag = document.createElement("p");
    const priceTag = document.createElement("p");
    const stockButton = document.createElement("div");
    const trash = document.createElement("i");

    settingAttributes(book, ["class", "book"]);
    settingAttributes(imgTag, ["src", bookObj.img]);
    settingAttributes(bookInfo, ["class", "bookList__info"]);
    settingAttributes(titleTag, ["class", "title"]);
    settingAttributes(authorTag, ["class", "author"]);
    settingAttributes(priceTag, ["class", "price"]);
    settingAttributes(stockButton, ["class", `${bookObj.stock === "In-Stock" ? "stocked" : "notStocked"}`]);
    settingAttributes(stockButton, ["id", "stock"]);
    settingAttributes(trash, ["class", "fa-regular fa-trash-can"]);

    creatingTextContent(titleTag, bookObj.title);
    creatingTextContent(authorTag, bookObj.author);
    creatingTextContent(priceTag, bookObj.price);
    creatingTextContent(stockButton, bookObj.stock);

    appendElements(bookInfo, [titleTag, authorTag, stockButton, priceTag, trash]);
    appendElements(book, [imgTag, bookInfo]);
    
    removeBook(trash, book);
    changeStateOfStock(stockButton);

    return book;
}

// ! Adding an event listener to the formButton to display or not display the form pop up
formButton.addEventListener("click", (e) => {
    hidePopUp();
    e.preventDefault();
})

// ! Adding an event listener to the submit button to submit the form when function returns true
submitButton.addEventListener("click", (e) => {
    if(validateForm()) {

        appendElements(bookList, [generateBook(handleFormValues())]);
        popUp.classList.add("hidden"); // * Not working with settingAttributes function *

        form[0].value = "";
        form[1].value = "";
        form[2].value = "";
        form[3].value = "";
        // resetValues(form) // * Did not work resetting values *
    }
    loadTemplate();
    e.preventDefault();
})

// ! Adding an event listener to the exitbutton to hide the pop up when clicked
exitButton.addEventListener("click", (e) => {  
    hidePopUp();
    loadTemplate();
    e.preventDefault();
})


loadTemplate()