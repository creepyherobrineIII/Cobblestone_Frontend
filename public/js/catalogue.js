//Get elements to be used
let catalogueGrid = document.getElementById("catalogue-grid");
let loadResults = document.getElementById("catalogue-results");
let pageIndex = document.getElementById("page-index");

//Variables
let currentPage = 1;
let numPages = 0;
let libraryCatalogue = null;

//Constants
const itemsPerPage = 12;
    

// Get number of pages for catalogue browsing
function getPages(){
    let templibCat = JSON.parse(localStorage.getItem('libraryBooks'));
    libraryCatalogue = templibCat;
    

    currentPage = 1;
    numPages = 0;
    if (libraryCatalogue !== null){
        numPages = Math.ceil(libraryCatalogue.length / itemsPerPage);
        console.log(numPages);

        if (numPages > 1){
            pageIndex.innerHTML = `<li class="page-item disabled">
                  <a class="page-link" href="#">Prev</a>
                </li>
                <li class="page-item active"><span class="page-link" aria-current="page">${currentPage}</span></li>
                <li class="page-item"><a class="page-link" onclick="nextPageButton()" href="#">${currentPage + 1}</a></li>
                <li class="page-item">
                  <a class="page-link" onclick="nextPageButton()" href="#">Next</a>
                </li>`
        }else if(numPages === 1){
            pageIndex.innerHTML = `<li class="page-item disabled">
                  <a class="page-link" href="#">Prev</a>
                </li>
                <li class="page-item active"><span class="page-link" aria-current="page">${currentPage}</span></li>
                <li class="page-item disabled">
                  <a class="page-link" onclick="nextPageButton()" href="#">Next</a>
                </li>`
        }

        
    }
};

// Next page function (next button)
function nextPageButton(){
    currentPage++;

    if (currentPage < numPages){
        pageIndex.innerHTML = `<li class="page-item">
                  <a class="page-link" onclick="prevPageButton()" href="#">Prev</a>
                </li>
                <li class="page-item">
                  <a class="page-link" onclick="prevPageButton()" href="#">${currentPage - 1}</a>
                </li>
                <li class="page-item active"><span class="page-link" aria-current="page">${currentPage}</span></li>
                <li class="page-item"><a class="page-link" onclick="nextPageButton()" href="#">${currentPage + 1}</a></li>
                <li class="page-item">
                  <a class="page-link" onclick="nextPageButton()" href="#">Next</a>
                </li>`
    }

    if (currentPage === numPages){
        pageIndex.innerHTML = `<li class="page-item">
                  <a class="page-link" onclick="prevPageButton()" href="#">Prev</a>
                </li>
                <li class="page-item">
                  <a class="page-link" onclick="prevPageButton()" href="#">${currentPage - 1}</a>
                </li>
                <li class="page-item active"><span class="page-link" aria-current="page">${currentPage}</span></li>
                <li class="page-item disabled">
                  <a class="page-link" href="#">Next</a>
                </li>`
    }

    displayResults();
}



// Previous page function (prev button)
function prevPageButton(){
   currentPage--;

    if (currentPage > 1){
        pageIndex.innerHTML = `<li class="page-item">
                  <a class="page-link" onclick="prevPageButton()" href="#">Prev</a>
                </li>
                <li class="page-item">
                  <a class="page-link" onclick="prevPageButton()" href="#">${currentPage - 1}</a>
                </li>
                <li class="page-item active"><span class="page-link" aria-current="page">${currentPage}</span></li>
                <li class="page-item"><a class="page-link" onclick="nextPageButton()" href="#">${currentPage + 1}</a></li>
                <li class="page-item">
                  <a class="page-link" onclick="nextPageButton()" href="#">Next</a>
                </li>`
    }

    if (currentPage === 1){
        pageIndex.innerHTML = `<li class="page-item disabled">
                  <a class="page-link" onclick="prevPageButton()" href="#">Prev</a>
                </li>
                <li class="page-item active"><span class="page-link" aria-current="page">${currentPage}</span></li>
                <li class="page-item"><a class="page-link" onclick="nextPageButton()" href="#">${currentPage + 1}</a></li>
                <li class="page-item">
                  <a class="page-link" onclick="nextPageButton()" href="#">Next</a>
                </li>`
    }

    displayResults();
}



//Function to display items
async function displayResults(){

    catalogueGrid.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage; 
    const end = start + itemsPerPage;

    libraryCatalogue = JSON.parse(localStorage.getItem('libraryBooks'));

    let limitedLibraryCatalogue = libraryCatalogue.slice(start, end);

    console.log(Object.entries(localStorage));

    if(limitedLibraryCatalogue !== null && limitedLibraryCatalogue !== undefined){

        limitedLibraryCatalogue.forEach(book => {
            let bookItem = document.createElement("div");
            bookItem.classList.toggle("col-lg-3", true);
            bookItem.classList.toggle("col-md-4", true);
            bookItem.classList.toggle("mb-4", true);

            bookItem.innerHTML = `<div class="card position-relative p-4 border rounded-3">
                        <a href="book.html/?isbn=${book.ISBN}"><img src="${book.picture}" class="img-fluid shadow-sm" alt="${book.bookTitle}"></a>
                        <h6 class="mt-4 mb-0 fw-bold"><a href="book.html/?isbn=${book.ISBN}">${book.bookTitle}</a></h6>
                        <p class="my-2 me-2 fs-6 text-black-50">${book.author}</p>
                    </div>`;

            catalogueGrid.appendChild(bookItem);
    });
    };

}

//Fill up catalogue
window.addEventListener('load', function(){
    //Load display
    getPages();
    displayResults();
    
});

