// ! Grabbing the elements needed from html / creating global variables used multiple times in the code
const [formButton, submitButton] = document.querySelectorAll("button");
const popUp = document.getElementById("pop-up");
const form = document.getElementById("form");
const bookList = document.getElementById("books")
const exitButton = document.getElementById("exit")
const errorMsg = document.createElement("p");
const completeMsg = document.createElement("p");
const template = document.createElement("p");



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

// ! Function to add the hidden class to the pop up to remove the popup form from display
const hidePopUp = () => {
    if(popUp.classList.contains("hidden")){
        popUp.classList.remove("hidden");
        
        setTimeout(() => {
            popUp.style.opacity = '95%'; // Smoothly transition the opacity to 95% (partialy visible)
        }, 50); 
    }else {; 
        setTimeout(() => {
            popUp.style.opacity = '0'; // Smoothly transition the opacity to 0 (fully transparent)
        }, 300);
        popUp.classList.add("hidden");
    }
    
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
        if(form[i].placeholder === "Image URL"){
            continue;
        }
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
    creatingTextContent(template, "Add Books To Your Inventory");
    checkAmountOfBooks();
    appendElements(bookList, [template]);
}

const checkAmountOfBooks = () => {
    const listOfBooks = document.getElementsByTagName("li");
    if(listOfBooks.length !== 0) {
        settingAttributes(template, ["class", "template hidden"]);
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
    settingAttributes(imgTag, ["onerror", "this.onerror=null; this.src='data:image/jpeg;base64,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';"])
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


loadTemplate();