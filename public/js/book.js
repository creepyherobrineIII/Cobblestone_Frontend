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
let reserveLabel = document.getElementById("reserve-label") 

//Variables
let bookCatalogue = null;
let selectedBook = null;
let memReservations = null;
let reserveURL = 'http://localhost:8080/reservation/'
let loggedMem = JSON.parse(localStorage.getItem('loggedUser'));

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
    };

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


    //Checking if member can reserve book
    getMemReserves = reserveURL + `member-id/${loggedMem.MemberCardID}`;
    fetch(getMemReserves, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response =>{
        if(response.status !== 200){
            console.log(response.text());
            return response.text().then(text => {
                throw new Error(text);
            });
        }

        return response.json();
    }).then(data =>{
        localStorage.setItem('memReserves', JSON.stringify(data));
    }).catch(error =>{
        console.log(error);
    })
        
    if (selectedBook.availableCopies === 0 )
    {
        reserveButton.disabled = true;
    }else{
        memReservations = JSON.parse(localStorage.getItem('memReserves'));
        if (memReservations !== null){
            if (memReservations.length >0){
                for(let i = 0; i < memReservations.length; i++){
                    if(memReservations[i].BookISBN === selectedBook.ISBN){
                        reserveButton.disabled = true;
                        reserveLabel.textContent = "(Book already reserved)"; 
                    }  
                }
            }
        }else{
            reserveButton.removeAttribute('disabled');
            reserveLabel.textContent = ""; 
        }
    };


})

async function makeReservation(){
    let data = {
        MemberId: loggedMem.MemberCardID,
        BookISBN: selectedBook.ISBN
    };

    let createReserveURL = reserveURL + `add-reservation`;

    fetch(createReserveURL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response =>{
        if(response.status !== 201){
            return response.text().then(text => {
                throw new Error(text);
            });
        }

        return response.json()
    }).then(data=>{

        console.log(data);
        alert('Created reservation succesfully');
        window.location.reload(true);


    }).catch(error =>{
        alert(error);
    })
}