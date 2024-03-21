// ! Retrieving the elements needed from the HTML
const books = document.getElementById("books");
const addButton = document.getElementById("add");
let completion;

// ! Generate the book element
const generateBook = (book, img, items, attributes, attrValue) => {
    const infoDiv = document.createElement("div");
    const trashcan = document.createElement("i");
    const classArr = ["title", "author", "_", "price"];

    // ! Setting The Attributes for the trash can and the infodiv
    trashcan.setAttribute("class","fa-solid fa-trash-can");
    infoDiv.setAttribute("class", "layout__main__books__book__info");
    book.append(img); // ! Append the image to the book element

    // ! Adding an eventlistener to the trashcan to remove the whole book element
    trashcan.addEventListener("click", () => {
        book.remove();
    })

    // ! Looping through the items array 
    for(let i = 0; i < items.length; i++) {
        const item = document.createElement("p")

        // ! Here checking if the current element equals the stockvalue, if its not equal the stockvalue, generate the infodiv setting the textcontent of the item, set the attribute to the item and append it to the infodiv
        if (items[i] === "In-Stock") {
            item.textContent = "In stock";
            item.classList.add("stocked");
            infoDiv.append(item);
        }else if (items[i] === "Not-In-Stock"){
            item.textContent = "Not in stock";
            item.classList.add("notStocked");
            infoDiv.append(item);
        }else {
            item.textContent = items[i];
            item.setAttribute("class", classArr[i]);
            infoDiv.append(item);
        }
        // ! To avoid looping twice we only access the attributes array for the first 2 indexs because both arrays only have 2 elements within them
        if(i < 2) {
            book.setAttribute(attributes[i], attrValue[i]);
        }  
    }
    
    infoDiv.append(trashcan);
    book.append(infoDiv);
}




addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formArr = e.target.form;
    const title = e.target.form[0].value;
    const author = e.target.form[1].value;
    const image = e.target.form[2].value;
    let priceValue = e.target.form[3].value;
    const stockValue = e.target.form[4].value;
    const book = document.createElement("li");
    const imgElement = document.createElement("img");
    const price = document.createElement("span");
    const asideb = document.getElementById("aside-b")
    
    
    if (completion && completion.parentNode) {
        completion.parentNode.removeChild(completion);
    }

    for (let i = 0; i < formArr.length - 2; i++) {
        if (formArr[i].value === "") {
            completion = document.createElement("p");
            completion.textContent = "Missing Required Book Information. Please fill out all fields";
            completion.setAttribute("class", "layout__aside-b__form__incomplete");
            asideb.append(completion);
            e.target.form[0].value = "";
            e.target.form[1].value = "";
            e.target.form[2].value = "";
            e.target.form[3].value = "";
            return;
        }
    }

    priceValue = `$${priceValue}`;
    completion = document.createElement("p");
    completion.textContent = "Book added!";
    price.textContent = priceValue;
    imgElement.src = image;
    
    completion.setAttribute("class", "layout__aside-b__form__complete")
    asideb.append(completion);
    
    generateBook(book,  imgElement, [title, author, stockValue, priceValue], ["class", "id"],["layout__main__books__book", title]);
    books.append(book);

    e.target.form[0].value = ""
    e.target.form[1].value = ""
    e.target.form[2].value = ""
    e.target.form[3].value = ""
})

