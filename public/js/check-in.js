//Body elements
const memSearch = document.getElementById("memNumSearch");
const loanaccordian = document.getElementById("check-table");
const loanAccMemId = document.getElementById("acc-header");
const innerTBody = document.getElementById("check-in-table-body");
const searchlab = document.getElementById("search-label");
const checkBooksButton = document.getElementById("check-in-button");

//Variables 
//URLS
let loansForMemURL = 'http://localhost:8080/loans/';


let getLoansForMem = null;
let memLoans = null;
let currentDate = null;
let timeLeft = null;
let newLoanStatus = null;
let memCard = null;
let libCat = null;
let comISBN = null;
let book = null;
let booksToReturn = 0;

//Functions to populate table
//Get reservations

memSearch.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter'){
        memCard = memSearch.value;

        if (memCard.length !== 16){
            memSearch.classList.toggle("invalid-box", true);
            searchlab.classList.toggle("d-none", false);
            searchlab.textContent = 'Invalid member card number';
            resTable.classList.toggle("d-none", true);
        }else{
            memSearch.classList.toggle("invalid-box", false);
            searchlab.classList.toggle("d-none", true);
        }

        //Fetching reservations for member

        memReservations = null;


        if(memCard.length === 16){
            getLoansForMem = loansForMemURL + `member-id/${memCard}`;

            fetch(getLoansForMem, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
                }
            }).then(response =>{
                if(response.status !== 200){
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }

                return response.json();
            }).then(data =>{
                memLoans = data;

                localStorage.setItem('memberLoans', JSON.stringify(memLoans));

                libCat = JSON.parse(localStorage.getItem('libraryBooks'));

                innerTBody.innerHTML = '';
               
                //Getting book titles
                for(let i = 0; i< memLoans.length; i++){
                    let searchISBN = memLoans[i].BookISBN
                    
                    for(let j = 0; j < libCat.length; j++){

                        comISBN = libCat[j].ISBN;
                        book = null;


                        if(memLoans[i].loanStatus === 'Loaned' || memLoans[i].loanStatus === 'Loaned: Overdue'){
                            if(comISBN === searchISBN){
                                book = libCat[j];

                                innerTBody.innerHTML += `<tr>
                            <td>
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="check-id-${memLoans[i].id}">
                                </div>
                            </td>
                            <td>${book.bookTitle}</td>
                            <td>${book.ISBN}</td>
                            <td>${memLoans[i].loanStatus}</td>
                        </tr>`;

                                
                            }


                        }

                    }
                }


                loanaccordian.classList.toggle("d-none", false);
                
            }).catch(error =>{
                loanaccordian.classList.toggle("d-none", true);
                alert(error);
            })

            
        }

        
    }
})




//Check in books
async function checkInBooks(){
    let booksToCheck = JSON.parse(localStorage.getItem('memberLoans'));

    const libConfirm = confirm(`Do you wish to check-in these books for Member ${memSearch.value}`);

    currentDate = new Date();

    if(libConfirm){
        for(let i = 0; i < booksToCheck.length; i++){

        let bookCheck = document.getElementById(`check-id-${memLoans[i].id}`);

        //'Loaned','Loaned: Overdue','Returned: Not Overdue', 'Returned: Overdue - Not paid', 'Returned: Overdue - Paid'
        if (bookCheck.checked === true){
            switch(memLoans[i].loanStatus){
                case 'Loaned':{
                    newLoanStatus = 'Returned: Not Overdue';
                    break;
                }

                case 'Loaned: Overdue':{
                    newLoanStatus = 'Returned: Overdue - Not paid';
                }
            }

            let updatedLoan = {
                id: memLoans[i].id,
                loanStatus: newLoanStatus,
                loanReturnDate: currentDate
            }

            loansForMemURL += `update`
        fetch(loansForMemURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLoan),})
            .then(response => {
                if (!response.ok){
                    return response.text().then(text => {
                    throw new Error(text);
                });
                }

                return response.json();
            })
            .then(data => {
                alert('Checked-in books successfully!');

                console.log(data);

                window.location.href = "lib-index.html";

            })
            .catch(error => {
                alert(error);
            })
        }
        
    }
    }
}