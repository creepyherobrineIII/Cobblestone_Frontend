let newBookURL = 'http://localhost:8080/books/add-book'

//Body elements to get values
const imagePrev = document.getElementById("image-preview");
//Input object (for mem management and boolean checking)
let InputObj ={
    bookisbn : null,
    booktitle: null,
    bookauthor: null,
    publisher: null,
    pubdate: null,
    bookdesc: null,
    genreChoice: null,
    subgenreChoice: null,
    bookpic: null,
    formatChoice: null,
    bookEdition: null,
    numCopies: null
}

const formAddBook = document.getElementById("form-add-book");

formAddBook.addEventListener('submit', async (event) =>{
    event.preventDefault();
})

InputObj.bookisbn = document.getElementById("bookisbn");
InputObj.booktitle = document.getElementById("booktitle");
InputObj.bookauthor = document.getElementById("bookauthor");
InputObj.publisher = document.getElementById("publisher");
InputObj.pubdate = document.getElementById("pubdate");
InputObj.bookdesc = document.getElementById("bookdesc");
InputObj.genreChoice = document.getElementById("genreChoice");
InputObj.subgenreChoice = document.getElementById("subgenreChoice");
InputObj.bookpic = document.getElementById("bookPic"); 
InputObj.formatChoice = document.getElementById("formatChoice"); 
InputObj.bookEdition = document.getElementById("bookedition");
InputObj.numCopies = document.getElementById("bookCopies") 

//Label object (for mem management and boolean checking)
let labelObj ={
    isbnlabel: null,
    titlelabel: null,
    authorlabel: null,
    publisherlabel: null,
    pubdatelabel: null,
    desclabel: null,
    genrelabel: null,
    subgenrelabel: null,
    bookpiclabel: null,
    bookformatlabel: null,
    editionlabel: null,
    copieslabel: null
}


labelObj.isbnlabel = document.getElementById("isbn-label"); 
labelObj.titlelabel = document.getElementById("title-label"); 
labelObj.authorlabel = document.getElementById("author-label"); 
labelObj.publisherlabel = document.getElementById("publisher-label"); 
labelObj.pubdatelabel = document.getElementById("pubDate-label"); 
labelObj.desclabel = document.getElementById("desc-label"); 
labelObj.genrelabel = document.getElementById("genre-label"); 
labelObj.subgenrelabel = document.getElementById("subgenre-label"); 
labelObj.bookpiclabel = document.getElementById("bookpic-label"); 
labelObj.bookformatlabel = document.getElementById("format-label");
labelObj.editionlabel = document.getElementById("edt-label");
labelObj.copieslabel = document.getElementById("copies-label") 


let boolObj ={
    validISBN: true,
    validBookTitle: true,
    validAuthor: true,
    validPublisher: true,
    validPubDate: true,
    validDescription: true,
    validGenre: true,
    validSubgenre: true,
    validBookPic: true,
    validFormat: true,
    validEdition: true,
    validNumCopies: true
}

//Event listeners for data validation
InputObj.bookisbn.addEventListener('input', function(){
    let isbn_val = this.value;

    const ISBNReg = /^\d+$/;

    let ISBNcheck = ISBNReg.test(isbn_val);
    
   if(isbn_val.length !== 13 || !ISBNcheck){
        labelObj.isbnlabel.textContent = '(Invalid ISBN Number)';
        this.classList.toggle("invalid-box", true);
        boolObj.validISBN = false;
   }else{
        labelObj.isbnlabel.textContent = '';
        this.classList.toggle("invalid-box", false);
        boolObj.validISBN = true;
   };
});

//Book Title data validation
InputObj.booktitle.addEventListener('input', function(){
    let book_title = this.value.toString();

    if(book_title.trim() === ""){
        labelObj.titlelabel.textContent = '(Field cannot be empty)';
        this.classList.toggle("invalid-box", true);
        boolObj.validBookTitle = false;
    }else{
        labelObj.titlelabel.textContent = '';
        this.classList.toggle("invalid-box", false);
        boolObj.validBookTitle = true;
    }
});

//Book author data validation
InputObj.bookauthor.addEventListener('input', function(){
    let book_author = this.value.toString();

    if(book_author.trim() === ""){
        labelObj.authorlabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validAuthor = false;
    }else{
        labelObj.authorlabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validAuthor = true;
    }

});

//Book publisher data validation
InputObj.publisher.addEventListener('input', function(){
    let book_publisher = this.value.toString();

    if(book_publisher.trim() === ""){
        labelObj.publisherlabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validPublisher = false;
    }else{
        labelObj.publisherlabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validPublisher = true;
    }

});


//Book publication date data validation
InputObj.pubdate.addEventListener('input', function(){
    let book_pubDate = this.value.toString();

    if(book_pubDate.trim() === ""){
        labelObj.pubdatelabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validPubDate = false;
    }else{
        labelObj.pubdatelabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validPubDate = true;
    }

});

//Book description data validation
InputObj.bookdesc.addEventListener('input', function(){
    let book_desc = this.value.toString();

    if(book_desc.trim() === ""){
        labelObj.desclabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validDescription = false;
    }else{
        labelObj.desclabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validDescription = true;
    }

});

//Book Genre data validation
InputObj.genreChoice.addEventListener('input', function(){
    let book_genre = this.value.toString();

    if(book_genre.trim() === ""){
        labelObj.genrelabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validGenre = false;
    }else{
        labelObj.genrelabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validGenre = true;
    }

});

//Book subgenre data validation
InputObj.subgenreChoice.addEventListener('input', function(){
    let book_subgenre = this.value.toString();

    if(book_subgenre.trim() === ""){
        labelObj.subgenrelabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validSubgenre = false;
    }else{
        labelObj.subgenrelabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validSubgenre = true;
    }

});


//Preview image
InputObj.bookpic.addEventListener('change', function(){
    imagePrev.src = URL.createObjectURL(InputObj.bookpic.files[0]);
});

//Book format data validation
InputObj.formatChoice.addEventListener('input', function(){
    let book_format = this.value.toString();

    if(book_format.trim() === ""){
     labelObj.bookformatlabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validFormat = false;
    }else{
        labelObj.bookformatlabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validFormat= true;
    }

});

//Book edition data validation
InputObj.bookEdition.addEventListener('input', function(){
    let book_edition = this.value.toString();

    if(book_edition.trim() === ""){
        labelObj.editionlabel.textContent = "(Field cannot be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validEdition = false;
    }else{
        labelObj.editionlabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validEdition = true;
    }

});

//Get ordinal number edition
function convertToOrd(i){
    let suffix = i + 'th';

    if (i % 10 == 1 && i % 100 != 11){
        suffix = i + 'st';
    }else if (i % 10 == 2 && i % 100 != 12){
        suffix = i + 'nd';
    }else if (i % 10 == 3 && i % 100 != 13){
        suffix = i + 'rd';
    }else if(i === 0){
        suffix = 'N/A'
    }

    return suffix;
}

//Button event listener
const addBookButton = document.getElementById("createButton");

addBookButton.addEventListener('click', async (event) =>{
    event.preventDefault();
})

//Number of copies data validation
InputObj.numCopies.addEventListener('input', function(){
    let num_copies = this.value.toString();

    if (num_copies.trim() === ""){
        labelObj.copieslabel.textContent = "(Field must not be empty)";
        this.classList.toggle("invalid-box", true);
        boolObj.validNumCopies = false;
    }else{
        labelObj.copieslabel.textContent = "";
        this.classList.toggle("invalid-box", false);
        boolObj.validNumCopies = true;
    }
})

//Pagination
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const bookTab1 = document.getElementById("add-book-1");
const bookTab2 = document.getElementById("add-book-2");


prevButton.addEventListener('click', function(){
    bookTab1.style.removeProperty('display');
    bookTab2.style.display = 'none';
    addBookButton.style.display = 'none';
    prevButton.style.display = 'none';
    nextButton.style.removeProperty('display');
});

nextButton.addEventListener('click', function(){
    nextButton.style.display = 'none';
    prevButton.style.removeProperty('display')
    bookTab2.style.removeProperty('display');
    addBookButton.style.removeProperty('display');
    bookTab1.style.display = 'none';

})

async function createBook(){

    //Arrays for checking flags and adjusting form error handling
    let boolArray = [boolObj.validISBN, boolObj.validBookTitle, boolObj.validAuthor, boolObj.validPublisher, boolObj.validPubDate,boolObj.validDescription, boolObj.validGenre, boolObj.validSubgenre, boolObj.validBookPic, boolObj.validFormat, boolObj.validEdition, boolObj.validNumCopies];
    let formArray = [InputObj.bookisbn, InputObj.booktitle, InputObj.bookauthor, InputObj.publisher, InputObj.pubdate, InputObj.bookdesc, InputObj.genreChoice, InputObj.subgenreChoice, InputObj.bookpic, InputObj.formatChoice, InputObj.bookEdition, InputObj.numCopies]
    let labelArray = [labelObj.isbnlabel, labelObj.titlelabel, labelObj.authorlabel, labelObj.publisherlabel, labelObj.pubdatelabel, labelObj.desclabel, labelObj.genrelabel, labelObj.subgenrelabel, labelObj.bookpiclabel, labelObj.bookformatlabel, labelObj.editionlabel, labelObj.copieslabel]
    let allNotEmpty = true;
    let allPass = null;
    let inputEle = null;

    console.log(InputObj.formatChoice);


    for (let i = 0 ; i< formArray.length; i++){
        inputEle = formArray[i].value.toString();

        console.log(formArray[i].placeholder + ':' + boolArray[i]);
        console.log(inputEle);
        switch(inputEle.trim()){
            case "":{
                allNotEmpty = false;
                formArray[i].classList.toggle("invalid-box");
                labelArray[i].textContent = '(Field cannot be empty)';
                boolArray[i] = false;
                break;
            }

            case undefined:{
                allNotEmpty = false;
                formArray[i].classList.toggle("invalid-box");
                labelArray[i].textContent = '(Field cannot be empty)';
                boolArray[i] = false;
                break;
            }

            case 0:{
                allNotEmpty = false;
                formArray[i].classList.toggle("invalid-box");
                labelArray[i].textContent = '(Field cannot be empty)';
                boolArray[i] = false;
                break;
            }
            
            default:{
                continue;
            }
        }
    }

    


    allPass = boolArray.every(flag => flag === true);
    console.log("Conditions:", allPass);
    console.log("All not empty: ", allNotEmpty);

    if(allPass === true && allNotEmpty == true){
        let imageResData = null;
        let imageData = new FormData();
        imageData.append('book-cover', InputObj.bookpic.files[0]);
        
        let imageFile = await fetch('http://localhost:3000/server/catalogue', {
            method: 'POST',
            body: imageData,
        }).then(response =>{
            if (response.status !== 201)
            {
                throw new Error('Unable to upload image');
            }

            return response.json()
        }).then(data =>{
            if (data !== null){
                imageResData = data;
            }
        }).catch(error =>{
            alert('Error:' ,error);
        });

       
        const data = {
        ISBN: InputObj.bookisbn.value,
        bookTitle: InputObj.booktitle.value,
        author: InputObj.bookauthor.value,
        genre: InputObj.genreChoice.value,
        subgenre: InputObj.subgenreChoice.value,
        pubDate: InputObj.pubdate.value,
        edition: convertToOrd(InputObj.bookEdition.value),
        publisher: InputObj.publisher.value,
        bookDescription: InputObj.bookdesc.value,
        picture: 'images/catalogue/'+ imageResData.filename,
        bookFormat: InputObj.formatChoice.value,
        BookInventory:{
            availableCopies: InputObj.numCopies.value,
            totalCopies: InputObj.numCopies.value
        }
    }

        fetch(newBookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),})
        .then(response => {
            if (!response.ok){
                return response.text().then(text => {
                throw new Error(text);
            });
            }

            return response.json();
        })
        .then(data => {
            alert('Uploaded book successfully!');
            console.log(data);
            window.location.href = "lib-index.html";

            //Deallocating memory
            //Arrays
            labelArray = null;
            formArray = null;
            boolArray = null;

            //Objects 
            boolObj= null;
            InputObj = null;
            labelObj = null;

        })
        .catch(error => {
            alert(error);
        })
    }
}