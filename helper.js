    // for (let i = 0; i < formArr.length - 2; i++) {
    //     if (formArr[i].value === "") {
    //         completion = document.createElement("p");
    //         completion.textContent = "Missing Required Book Information. Please fill out all fields";
    //         completion.setAttribute("class", "layout__aside-b__form__incomplete");
    //         asideb.append(completion);
    //         e.target.form[0].value = "";
    //         e.target.form[1].value = "";
    //         e.target.form[2].value = "";
    //         e.target.form[3].value = "";
    //         return;
    //     }
    // }

    // const title = e.target.form[0].value;
    // const author = e.target.form[1].value;
    // const image = e.target.form[2].value;
    // const priceValue = `$${e.target.form[3].value}`;
    // const stockValue = e.target.form[4].value;
    // const book = document.createElement("li");
    // const imgElement = document.createElement("img");
    // const price = document.createElement("span");
    
    // // ! Removing the set completion status
    // if (completion && completion.parentNode) {
    //     completion.parentNode.removeChild(completion);
    // }


    // completion = document.createElement("p");
    // completion.textContent = "Book added!";
    // price.textContent = priceValue;
    // imgElement.src = image;
    
    // template.remove()
    // completion.setAttribute("class", "layout__aside-b__form__complete")
    // completion.setAttribute("id", "completion")
    // asideb.append(completion);
    
    // generateBook(book, imgElement, [title, author, stockValue, priceValue], ["class", "id"],["layout__main__books__book", title]);
    // books.append(book);


    // const stockButton = document.getElementById("stocked")
    // stockButton.addEventListener("click", () => {
    //     if(stockButton.classList.contains("notStocked")){
    //         stockButton.classList.remove("notStocked");
    //         stockButton.classList.add("stocked");
    //         stockButton.textContent = "In stock";
    //     }else {
    //         stockButton.classList.remove("stocked");
    //         stockButton.classList.add("notStocked");
    //         stockButton.textContent = "Not in stock";
    //     }
    // })
    
    // e.target.form[0].value = ""
    // e.target.form[1].value = ""
    // e.target.form[2].value = ""
    // e.target.form[3].value = ""

    trashcan.addEventListener("click", () => {
        book.remove();
        // if(books.textContent === "") {
        //     template.setAttribute("class", "template")
        //     layout.append(template)
        //     completion.textContent = "Book Removed"
        // }
    })

    completion = document.createElement("p");
      completion.textContent = "Book added!";
      price.textContent = priceValue;
      imgElement.src = image;
      template.remove()
      completion.setAttribute("class", "form__complete")
      completion.setAttribute("id", "completion")