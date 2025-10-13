//Body elements
let bookPic = document.getElementById("main-book-pic");
let bookTitle = document.getElementById("book-title");
let bookAuthor = document.getElementById("book-author");
let inventoryLabel = document.getElementById("inventory-label");
let reserveButton = document.getElementById("reserve-button");
let isbnLi = document.getElementById("isbn-li");
let genreList = document.getElementById("main-genre-list");
let subGenreList = document.getElementById("sub-genre-list");
let bookDescription = document.getElementById("nav-home");
let addInfo = document.getElementById("nav-information");


//Variables
let bookCatalogue = null;
let selectedBook = null;

//Load event listener
window.addEventListener('load', function(){
    //Get ISBN
    const urlString = window.location.search;
    const urlParamObj = new URLSearchParams(urlString);
    let bookISBN = urlParamObj.get('isbn');
    console.log(bookISBN);
    bookCatalogue = JSON.parse(localStorage.getItem('libraryBooks'));

    if (bookCatalogue !== null){
        for (let i = 0; i < bookCatalogue.length; i++){
            if (bookCatalogue[i].ISBN === bookISBN){
                selectedBook = bookCatalogue[i]
            }
        }
    }

    if (selectedBook !== null){
        //Adding book details to page
        bookPic.innerHTML = `<img src="${selectedBook.picture}" alt="single-product" class="img-fluid">`
        bookTitle.innerText = `${selectedBook.bookTitle}`;
        bookAuthor.innerText = `${selectedBook.author}`;
        inventoryLabel.innerText = `Available copies: ${selectedBook.BookInventory.availableCopies} `;
        isbnLi.innerHTML = `<li data-value="S" class="select-item">${selectedBook.ISBN}</li>`;
        genreList.innerHTML = ` <li data-value="S" class="select-item">
                      <a href="#">${selectedBook.genre}</a>
                    </li>`;
        subGenreList.innerHTML = `<li data-value="S" class="select-item">
                      <a href="#">${selectedBook.subgenre}</a>
                    </li>`;
        bookDescription.innerHTML = `<p>${selectedBook.bookDescription}</p>`
        addInfo.innerHTML = `<p><span style="font-weight: 600">Publisher: </span> ${selectedBook.publisher}</p>
            <p><span style="font-weight: 600">Publication Date: </span> ${selectedBook.pubDate}</p>
            <p><span style="font-weight: 600">Format: </span> ${selectedBook.bookFormat}</p>
            <p><span style="font-weight: 600">Edition: </span> ${selectedBook.edition}</p>`
    }

    if (selectedBook.availableCopies === 0 )
    {
        reserveButton.pr;
    }else{
        reserveButton.classList.toggle('disabled', false);
    }
})

async function makeReservation(){

}