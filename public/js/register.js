//Registration Javascript

//Singular DOM object for memory managament
let DOMObj = {
    fName : null, 
    lName : null,
    memAddr : null,
    memPhone :null,
    memEmail : null,
    iniPass : null,
    confPass : null,
    fNameErrLab : null,
    lNameErrLab : null,
    memAddrErrLab : null,
    memPhoneErrLab : null,
    memEmailErrLab : null,
    iniPassErrLab : null,
    confPassErrLab : null
}


//Single values object for memory management
let ValuesObj = {
    fNameValue : null,
    lNameValue : null,
    memAddrValue : null,
    memPhoneValue : null,
    memEmailValue : null,
    iniPassValue : null,
    confPassValue : null
}

//Boolean flags object for memory management
let BoolObj = {
    validFName : true,
    validLName : true,
    validAddr : true,
    validPhone : true,
    validEmail : true, 
    validPass : true,
    validConf : true
}

//API Url
let memberURL = 'http://localhost:8080/member/create-member'

//Validating name lengths
//DOM Object(s)
DOMObj.fName = document.getElementById("fName");
DOMObj.lName = document.getElementById("lName");

//Error Label(s)
DOMObj.fNameErrLab = document.getElementById("fNameErrLab");
DOMObj.lNameErrLab = document.getElementById("lNameErrLab");


DOMObj.fName.addEventListener('input', function(){
    ValuesObj.fNameValue = this.value;
    
   if(ValuesObj.fNameValue.length < 2){
    DOMObj.fNameErrLab.textContent = '(Invalid name length)';
    this.classList.toggle("invalid-box", true);
    BoolObj.validFName = false;
   }else{
    DOMObj.fNameErrLab.textContent = '';
    this.classList.toggle("invalid-box", false);
    BoolObj.validFName = true;
   }
})


DOMObj.lName.addEventListener('input', function(){
    ValuesObj.lNameValue = this.value;
    
   if(ValuesObj.lNameValue.length < 2){
    DOMObj.lNameErrLab.textContent = '(Invalid name length)';
    this.classList.toggle("invalid-box", true);
    BoolObj.validLName = false;
   }else{
    DOMObj.lNameErrLab.textContent = '';
    this.classList.toggle("invalid-box", false);
    BoolObj.validLName = true;
   }
})



//Check if address has value
//DOM Object(s)
DOMObj.memAddr = document.getElementById("memAddr");

//Error Label(s)
DOMObj.memAddrErrLab = document.getElementById("memAddrErrLab");

DOMObj.memAddr.addEventListener('input', function(){
    ValuesObj.memAddrValue = this.value;
    
   if(ValuesObj.memAddrValue.length < 2){
    DOMObj.memAddrErrLab.textContent = '(Invalid address)';
    this.classList.toggle("invalid-box", true);
    BoolObj.validAddr = false;
   }else{
    DOMObj.memAddrErrLab.textContent = '';
    this.classList.toggle("invalid-box", false);
    BoolObj.validAddr = true;
   }
})


//Check if phone number is valid
//DOM Object(s)
DOMObj.memPhone = document.getElementById("memPhone");

//Error Label(s)
DOMObj.memPhoneErrLab = document.getElementById("memPhoneErrLab");


DOMObj.memPhone.addEventListener('input', function(){
    ValuesObj.memPhoneValue = this.value;

    const phoneReg = /^\d+$/;

    let numbcheck = phoneReg.test(ValuesObj.memPhoneValue);
    
   if(ValuesObj.memPhoneValue.length !== 10 || !numbcheck){
    DOMObj.memPhoneErrLab.textContent = '(Invalid phone number)';
    this.classList.toggle("invalid-box", true);
    BoolObj.validPhone = false;
   }else{
    DOMObj.memPhoneErrLab.textContent = '';
    this.classList.toggle("invalid-box", false);
    BoolObj.validPhone = true;
   };


})


//Check if email is valid

//DOM Object(s)
DOMObj.memEmail = document.getElementById("memEmail");

//Error Label(s)
DOMObj.memEmailErrLab = document.getElementById("memEmailErrLab");


DOMObj.memEmail.addEventListener('input', function(){
    ValuesObj.memEmailValue = this.value;

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    BoolObj.validEmail = emailReg.test(ValuesObj.memEmailValue);

    if (BoolObj.validEmail === false){
        DOMObj.memEmailErrLab.textContent = '(Invalid email, must contain: @ and email domain)';
        this.classList.toggle("invalid-box", true);
    }else{
        DOMObj.memEmailErrLab.textContent = '';
        this.classList.toggle("invalid-box", false);
    }
})



//Check if passwords match
//DOM Object(s)
DOMObj.iniPass = document.getElementById("memIniPass");
DOMObj.confPass = document.getElementById("memConfPass");

//Error Label(s)
DOMObj.iniPassErrLab = document.getElementById("iniPassErrLab");
DOMObj.confPassErrLab = document.getElementById("confPassErrLab");


DOMObj.confPass.addEventListener('input', function(){

    ValuesObj.iniPassValue = DOMObj.iniPass.value;
    ValuesObj.confPassValue = this.value;

    
    if (ValuesObj.iniPassValue.trim() === ""){
        DOMObj.iniPassErrLab.textContent = '(Password field must be filled first)';
        DOMObj.iniPass.classList.toggle("invalid-box", true);
        BoolObj.validPass = false;
    }else{
        DOMObj.iniPassErrLab.textContent = '';
        DOMObj.iniPass.classList.toggle("invalid-box", false);
        BoolObj.validPass = true;
    }

    if (ValuesObj.confPassValue !== ValuesObj.iniPassValue){
        DOMObj.confPassErrLab.textContent = '(Passwords do not match)';
        this.classList.toggle("invalid-box", true);
        BoolObj.validConf = false;
    }else{
        DOMObj.confPassErrLab.textContent = '';
        this.classList.toggle("invalid-box", false);
        BoolObj.validConf = true;
    }
})



//Register member
async function memRegister(){

    //Arrays for checking flags and adjusting form error handling
    let boolArray = [BoolObj.validFName, BoolObj.validLName, BoolObj.validAddr, BoolObj.validPhone, BoolObj.validEmail, BoolObj.validPass, BoolObj.validConf];
    let formArray = [DOMObj.fName, DOMObj.lName, DOMObj.memAddr, DOMObj.memPhone, DOMObj.memEmail, DOMObj.iniPass, DOMObj.confPass]
    let labelArray = [DOMObj.fNameErrLab, DOMObj.lNameErrLab, DOMObj.memAddrErrLab, DOMObj.memPhoneErrLab, DOMObj.memEmailErrLab, DOMObj.iniPassErrLab, DOMObj.confPassErrLab]
    let allNotEmpty = true;
    let allPass = null;
    let inputEle = null;

    //Assign values to each 
    ValuesObj.fNameValue = DOMObj.fName.value;
    ValuesObj.lNameValue = DOMObj.lName.value;
    ValuesObj.memAddrValue = DOMObj.memAddr.value;
    ValuesObj.memPhoneValue = DOMObj.memPhone.value;
    ValuesObj.memEmailValue = DOMObj.memEmail.value;
    ValuesObj.confPassValue = DOMObj.confPass.value;

    for (let i = 0 ; i< formArray.length; i++){
        inputEle = formArray[i].value;

        console.log(formArray[i].placeholder + ':' + boolArray[i]);
        console.log(inputEle);
        switch(inputEle.trim()){
            case "":{
                allNotEmpty = false;
                formArray[i].classList.toggle("invalid-box");
                labelArray[i].textContent = '(' + labelArray[i].placeholder + ' field cannot be empty)';
                boolArray[i] = false;
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

        const data = {
        firstName: ValuesObj.fNameValue,
        lastName: ValuesObj.lNameValue,
        phoneNo: ValuesObj.memPhoneValue,
        address: ValuesObj.memAddrValue,
        email:  ValuesObj.memEmailValue,
        password: ValuesObj.iniPassValue
    }

        console.log(data);

        fetch(memberURL, {
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
        .then(data => {
            console.log(data);
            data.userType = 'Member'
            localStorage.setItem('loggedUser', JSON.stringify(data));


            //Load window with logged profile

            //Deallocating memory
            //Arrays
            labelArray = null;
            formArray = null;
            boolArray = null;

            //Objects 
            BoolObj = null;
            ValuesObj = null;
            DOMObj = null;

            window.location.href = "index.html"
            alert('Succesfully registered. \n   Redirecting to homepage     ');
        })
        .catch(error => {
            alert(error);
        })
    }
}

//Register librarian
