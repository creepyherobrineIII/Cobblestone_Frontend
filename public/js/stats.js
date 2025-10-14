const chart = document.getElementById("myChart");

//URLS
let loansURL = 'http://localhost:8080/loans/';


//Variables
let booksTotal = 0;
let booksInventory = 0;
let loansArr = null;
let loansTotal = 0;
let loanedInvenPercentage = Math.ceil((loansTotal / booksTotal) * 100);
let availableInventory = null;
let availableInventoryPercentage = null;
let dataArr = null;

window.addEventListener('load', async function(){
    let books = JSON.parse(localStorage.getItem('libraryBooks'));

    loansArr = fetch(loansURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(response => {
            if (!response.ok){
                return response.text().then(text => {
                throw new Error(text);
            });
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            alert(error);
        })


        //Fetch all loans
        if (books !== null){

        for(let i = 0; i< books.length; i++){
                let bookInven = books[i].BookInventory;

                booksTotal += bookInven.totalCopies;
            }


            loansTotal = loansArr.length;

            

            let loanedInvenPercentage = Math.ceil((loansTotal / booksTotal) * 100);
            let availableInventory = booksTotal - loansTotal;

            let availableInventoryPercentage = Math.ceil((availableInventory / booksTotal) * 100);
            
            let dataArr = [availableInventoryPercentage, loanedInvenPercentage]

        

        }

        new Chart("myChart", {
            type: "pie",
            data: {
                labels: [`Available Inventory`, `Loaned Inventory`],
                datasets: [{
                label: 'Inventory availability',
                data: [56, 44],  
                backgroundColor: ['rgba(186, 184, 108)', 'rgba(255, 3, 99)'],
                }]
            },
            options: {
                title: {
                display: true,
                text: "World Wide Wine Production"
                }
            }
        });


})
