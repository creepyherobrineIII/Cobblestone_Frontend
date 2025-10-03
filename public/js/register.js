//Validating name lengths
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const fNameErrLab = document.getElementById("fNameErrLab");
const lNameErrLab = document.getElementById("lNameErrLab");

let validFName = false;
let validLName = false;


fName.addEventListener('input', function(){
    const fNameValue = this.value;
    
   if(fNameValue.length < 2){
    fNameErrLab.textContent = '(Invalid name length)';
    this.classList.toggle("invalid-box", true);
    validFName = false;
   }else{
    fNameErrLab.textContent = '';
    this.classList.toggle("invalid-box", false);
    validFName = true;
   }

   if (fNameValue === ""  || fNameValue === ''){
    this.value = null;
    validFName = false;
   }
})


lName.addEventListener('input', function(){
    const lNameValue = this.value;
    
   if(lNameValue.length < 2){
    lNameErrLab.textContent = '(Invalid name length)';
    this.classList.toggle("invalid-box", true);
    validLName = false;
   }else{
    lNameErrLab.textContent = '';
    this.classList.toggle("invalid-box", false);
    validLName = true;
   }
})



//Check if address has value
const memAddr = document.getElementById("memAddr");
let validAddr = true;


//Check if phone number is valid
const memPhone = document.getElementById("memPhone");
let validPhone = true;


//Check if email is valid
const memEmail = document.getElementById("memEmail");
let validEmail = false;

//Check if passwords match
const iniPass = document.getElementById("memIniPass");
const confPass = document.getElementById("memConfPass");

let passMatch = true;



//Check if all flags are true



//Register member
async function memRegister(){
    let boolArray = [validFName, validLName, validAddr, validPhone, validEmail, passMatch];
    let allPass = null;


    const data = {
        firstName: fName.value,
        lastName: lName.value,
        phoneNo: memPhone.value,
        address: memAddr.value,
        email:  memEmail.value,
        password: iniPass.value
    }

    allPass = boolArray.every(flag => flag === true);
    console.log("Conditions:", allPass);

    if(allPass === true){

        fetch('http://localhost:8080/member/create-member', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)})
        .then(response => {
            if (!response.ok){
                throw new Error(response.statusText);
            }

            return response.json();
        })
        .then(data =>{
            console.log(data);
            localStorage.setItem('loggedUser', JSON.stringify(data));
        })
        .catch(error => {
            alert(error);
        })
    }else{
        alert('Incomplete data');
    }
}

//Register librarian
