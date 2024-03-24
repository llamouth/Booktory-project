// ! Grabbing the elements needed from html / creating global variables used multiple times in the code
const [formButton, submitButton] = document.querySelectorAll("button");
const popUp = document.getElementById("pop-up");
const form = document.getElementById("form");
const bookList = document.getElementById("books")
const exitButton = document.getElementById("exit")
const errorMsg = document.createElement("p");
const completeMsg = document.createElement("p");

// ! Function to remove the hidden class from the pop up to display the popup form
const openPopUp = () => {
    popUp.classList.remove("hidden")
}

// ! Function to add the hidden class to the pop up to remove the popup form from display
const hidePopUp = () => {
    popUp.classList.add("hidden")
}

// ! Function to validate the input text
const validateForm = () => {
    for(let i = 0; i < form.length - 2; i++) {
        if(form[i].value.trim() === ""){
            errorMsg.classList.add("incomplete")
            errorMsg.textContent = "Missing Required Information"
            popUp.append(errorMsg)
            completeMsg.remove()
            return false
        }
    }
    completeMsg.classList.add("complete")
    completeMsg.textContent = "Book Added"
    bookList.append(completeMsg)
    errorMsg.remove()
    return true
}

const removeBook = (trash, book) => {
    trash.addEventListener("click", () => {
        book.remove()
    })
}

const changeStateOfStock = (stock) => {
    stock.addEventListener("click", () => {
        if(stock.classList.contains("notStocked")) {
            stock.classList.remove("notStocked")
            stock.classList.add("stocked")
            stock.textContent = "In-Stock"
        }else {
            stock.classList.remove("stocked")
            stock.classList.add("notStocked")
            stock.textContent = "Not-In-Stock"
        }
    })
}

const createBook = (bookObj) => {

    const book = document.createElement("li");
    const imgTag = document.createElement("img");
    const bookInfo = document.createElement("div");
    const titleTag = document.createElement("p");
    const authorTag = document.createElement("p");
    const priceTag = document.createElement("p");
    const stockButton = document.createElement("div");
    const trash = document.createElement("i");

    book.setAttribute("class", "book");
    imgTag.setAttribute("src", bookObj.img);
    bookInfo.setAttribute("class", "bookList__info");
    titleTag.setAttribute("class", "title");
    authorTag.setAttribute("class", "author");
    priceTag.setAttribute("class", "price")
    stockButton.setAttribute("class", `${bookObj.stock === "In-Stock" ? "stocked" : "notStocked"}`)
    stockButton.setAttribute("id", "stock")
    trash.setAttribute("class", "fa-regular fa-trash-can")

    titleTag.textContent = bookObj.title;
    authorTag.textContent = bookObj.author
    priceTag.textContent = bookObj.price
    stockButton.textContent = bookObj.stock

    bookInfo.append(titleTag, authorTag, stockButton, priceTag, trash);
    book.append(imgTag, bookInfo);
    bookList.append(book);

    removeBook(trash, book);
    changeStateOfStock(stockButton);
}


formButton.addEventListener("click", (e) => {
    if(popUp.classList.contains("hidden")){
        openPopUp();
    }else {
        hidePopUp();
    }
    e.preventDefault()
})

submitButton.addEventListener("click", (e) => {
    if(validateForm()){
        const [title, author, img, price, stock] = form
        const bookObj = {
            title: title.value, 
            author: author.value,
            img: img.value,
            price: price.value,
            stock: stock.value,
        }

        createBook(bookObj)
        popUp.classList.add("hidden")

        form[0].value = ""
        form[1].value = ""
        form[2].value = ""
        form[3].value = ""
    }
    e.preventDefault()
})

exitButton.addEventListener("click", () => {  
    hidePopUp();
    e.preventDefault();
})