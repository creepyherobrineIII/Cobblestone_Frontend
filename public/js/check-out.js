//Body elements
const memSearch = document.getElementById("memNumSearch");
const resTable = document.getElementById("res-nest-table");
const resTableMemId = document.getElementById("res-table-mem-id");
const innerTBody = document.getElementById("inner-tbody");
const searchlab = document.getElementById("search-label");

//Variables 
//URLS
let reserveURL = 'http://localhost:8080/reservation/';
let loanURL = 'http://localhost:8080/loans/create-loan'

let expDate = null;
let currentDate = null;
let timeLeft = null;
let memCard = null;
let memReservations = null;
let getMemReserves = null;
let libCat = null;
let comISBN = null;
let book = null;

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
            getMemReserves = reserveURL + `member-id/${memCard}`;

            console.log(getMemReserves);


            fetch(getMemReserves, {
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
                memReservations = data;

                localStorage.setItem('memberReservations', JSON.stringify(memReservations));

                libCat = JSON.parse(localStorage.getItem('libraryBooks'));

                innerTBody.innerHTML = '';
               
                //Getting book titles
                for(let i = 0; i< memReservations.length; i++){
                    let searchISBN = memReservations[i].BookISBN

                    //Getting date data
                    expDate = new Date(memReservations[i].resDateExpiry);
                    currentDate = new Date();

                    timeLeft = Math.ceil(((expDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60)) + 23);

                    console.log(timeLeft);


                    for(let j = 0; j < libCat.length; j++){

                        comISBN = libCat[j].ISBN;
                        book = null;

                        if(comISBN === searchISBN){
                            book = libCat[j];

                            innerTBody.innerHTML += `<tr>
                        <td>${book.bookTitle}</td>
                        <td>${book.ISBN}</td>
                        <td>${timeLeft} hours left</td>
                      </tr>`
                        }
                    }
                }

                resTable.classList.toggle("d-none", false);
                
            }).catch(error =>{
                resTable.classList.toggle("d-none", true);
                alert(error);
            })

            
        }

        
    }
})


//Check out books
async function createLoans(){
    let loansToCreate = JSON.parse(localStorage.getItem('memberReservations'));

    const libConfirm = confirm(`Do you wish to check-out these books for Member ${memSearch.value}`);

    if(libConfirm){
        for(let i = 0; i < loansToCreate.length; i++){

        let data = {
            loanStartDate: new Date(),
            MemberId: memSearch.value,
            BookISBN: loansToCreate[i].BookISBN
        }


        fetch(loanURL, {
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
            alert('Checked-out books successfully!');

            console.log(data);

            window.location.href = "lib-index.html";

        })
        .catch(error => {
            alert(error);
        })
    }
    }
}