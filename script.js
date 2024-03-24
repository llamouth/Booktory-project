const [formButton, submitButton] = document.querySelectorAll("button");
const popUp = document.getElementById("pop-up");
const form = document.getElementById("form");
const errorMsg = document.createElement("p");
const completeMsg = document.createElement("p");
const bookList = document.getElementById("books")
const exitButton = document.getElementById("exit")

const openPopUp = () => {
    popUp.classList.remove("hidden")
}

const validateForm = () => {
    for(let i = 0; i < form.length - 2; i++) {
        if(form[i].value === ""){
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


const stockButtonEvent = (stock) => {
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
    
    
    const book = document.createElement("li")
    const imgTag = document.createElement("img")
    const bookInfo = document.createElement("div")
    const titleTag = document.createElement("p")
    const authorTag = document.createElement("p")
    const priceTag = document.createElement("p")
    const stockButton = document.createElement("div")

    book.setAttribute("class", "book");
    imgTag.setAttribute("src", bookObj.img);
    bookInfo.setAttribute("class", "bookList__info");
    titleTag.setAttribute("class", "title");
    authorTag.setAttribute("class", "author");
    priceTag.setAttribute("class", "price")
    stockButton.setAttribute("class", `${bookObj.stock === "In-Stock" ? "stocked" : "notStocked"}`)
    stockButton.setAttribute("id", "stock")

    titleTag.textContent = bookObj.title;
    authorTag.textContent = bookObj.author
    priceTag.textContent = bookObj.price
    stockButton.textContent = bookObj.stock

    stockButtonEvent(stockButton)
    bookInfo.append(titleTag, authorTag, stockButton, priceTag)
    book.append(imgTag, bookInfo)
    bookList.append(book)
}


formButton.addEventListener("click", (e) => {
    openPopUp()
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
    popUp.classList.add("hidden")
})