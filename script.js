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

addButton.addEventListener("click", (e) => {
   
    const form = e.target.form;
        
    if (validateForm(form)) { 
        const [title, author, image, price, stock] = form;
        const bookObj = {
            title: title.value,
            author: author.value,
            image: image.value,
            price: `$${price.value}`,
            stockValue: stock.value, 
            inStock: `${stock.value === "In-Stock"}`
        };

        books.append(generateBook(bookObj)); 
        
        
        handleFormCompleteMessage();
        displayTemplate();

        title.value = "";
        author.value = "";
        image.value = "";
        price.value = "";
    }else { 
        handleFormErrorMessage(); 
    }

    e.preventDefault();
})

const validateForm = (formArr) => {

    for (let i = 0; i < formArr.length - 1; i++) {
        if (formArr[i].value === "") {
            return false;
        }
    }
    return true;
}

const handleFormErrorMessage = () => {

    errorMsg.textContent = "Missing Required Book Information. Please fill out all fields";
    errorMsg.setAttribute("class", "form__incomplete");
    asideb.append(errorMsg);  
    completionMsg.remove();    
}

const handleFormCompleteMessage = () => {

    completionMsg.textContent = "Book Added"
    completionMsg.setAttribute("class", "form__complete");
    asideb.append(completionMsg)
    errorMsg.remove()
}

const displayTemplate = () => {

    const bookList = books.getElementsByTagName("li")
    if(bookList.length === 0) {
        books.append(template)
    }else {
        template.remove()
    }
}

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

 