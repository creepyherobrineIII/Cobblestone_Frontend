//Constants

//Variables
var bookURL = 'http://localhost:8080/books/inventory';
let iTimeslooped = 0;

//Singular DOM object for memory managament
var BodyObj = {
  userOptions: null,
  loginEmail: null,
  loginPass: null,
  navBar: null,
  logErrLab: null,
  mainSearchBar: null
};

//Single values object for memory management
var BodyValuesObj = {
  loginEmailValue: null,
  loginPassValue: null
};


//Search bar and preloader functions
(function($) {

    "use strict";

    var searchPopup = function() {
      // open search box
      $('#header-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

    var countdownTimer = function() {
      function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }
  
      function initializeClock(id, endtime) {
        const clock = document.getElementById(id);
        const daysSpan = clock.querySelector('.days');
        const hoursSpan = clock.querySelector('.hours');
        const minutesSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');
  
        function updateClock() {
          const t = getTimeRemaining(endtime);
          daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
          if (t.total <= 0) {
            clearInterval(timeinterval);
          }
        }
        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
      }
  
      $('#countdown-clock').each(function(){
        const deadline = new Date(Date.parse(new Date()) + 28 * 24 * 60 * 60 * 1000);
        initializeClock('countdown-clock', deadline);
      });
    }

    var initProductQty = function(){

      $('.product-qty').each(function(){

        var $el_product = $(this);
        var quantity = 0;

        $el_product.find('.quantity-right-plus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            $el_product.find('#quantity').val(quantity + 1);
        });

        $el_product.find('.quantity-left-minus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            if(quantity>0){
              $el_product.find('#quantity').val(quantity - 1);
            }
        });

      });

    }

    $(document).ready(function() {

      searchPopup();
      initProductQty();
      countdownTimer();

      /* Video */
      var $videoSrc;  
        $('.play-btn').click(function() {
          $videoSrc = $(this).data( "src" );
        });

        $('#myModal').on('shown.bs.modal', function (e) {

        $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
      })

      $('#myModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src',$videoSrc); 
      })

      var mainSwiper = new Swiper(".main-swiper", {
        speed: 500,
        navigation: {
          nextEl: ".main-slider-button-next",
          prevEl: ".main-slider-button-prev",
        },
      });

      var productSwiper = new Swiper(".product-swiper", {
        spaceBetween: 20,        
        navigation: {
          nextEl: ".product-slider-button-next",
          prevEl: ".product-slider-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          660: {
            slidesPerView: 3,
          },
          980: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 5,
          }
        },
      });      

      var testimonialSwiper = new Swiper(".testimonial-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".testimonial-button-next",
          prevEl: ".testimonial-button-prev",
        },
      });

    }); // End of a document ready

    window.addEventListener("load", function () {
      const preloader = document.getElementById("preloader");
      preloader.classList.add("hide-preloader");
    });

})(jQuery);


//Check if user is logged in && user type for sidebar

window.addEventListener('load', function(){ 
//Get catalogue

  fetch(bookURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok){
            if(response.status === 400){
                throw new Error();
            }
        }
        return response.json();
    }).then(data => {
        localStorage.setItem('libraryBooks', JSON.stringify(data));
    }).catch(()=>{
        alert('Could not get catalogue');
    })

  //Get logged user
  if (localStorage.getItem('loggedUser') !== null){

    let loggedUser = localStorage.getItem('loggedUser');
    let user = JSON.parse(loggedUser);
    let userT = user.userType;

    changeNavBar(userT);

  }else{
    changeNavBar('Not logged');
  }
    
})


//Login user (independent of type)
async function userLog(){
  
  //Get login details
  BodyObj.loginEmail = document.getElementById("loginEmail");
  BodyObj.loginPass = document.getElementById("loginPass");
  BodyObj.logErrLab = document.getElementById("logErrLab");


  let user = {
    email: BodyObj.loginEmail.value,
    password: BodyObj.loginPass.value
  }


  //Login user
  fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  }).then(response => {
    if (response.status === 401 || response.status === 400){
      throw new Error('Incorrect email/password')
    }

    return response.json();
  }).then(data =>{
    
    if (data !== null && data !== undefined){
      localStorage.setItem('loggedUser', data);
      
      window.location.reload();
    }
  }).catch(error =>{

    BodyObj.logErrLab.textContent = error.toString();
  })

  //Change window to app pages
  let loggedUser = localStorage.getItem('loggedUser');
  var logUser = JSON.parse(loggedUser);
  let userT = logUser.userType;

    changeNavBar(userT);

    if(userT === 'Member'){
      window.location.href = 'index.html';
    } else if(userT === 'Librarian'){
      window.location.href = 'lib-index.html'
    }
}

//Function to change sidebar depending on usertype
function changeNavBar(userType){

  console.log(userType);
  BodyObj.userOptions = document.getElementById("userOptions");
  BodyObj.navBar = document.getElementById('navbar-element');
  BodyObj.mainSearchBar = document.getElementById('main-search');


  switch(userType){
    case 'Librarian':{
     BodyObj.navBar.innerHTML = `<li class="nav-item">
                  <a class="nav-link me-4" href="lib-index.html">Home</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link me-4 dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Loans</a>
                  <ul class="dropdown-menu animate slide border">
                    <li>
                      <a href="check-out.html" class="dropdown-item">Check-Out Books</a>
                    </li>
                    <li>
                      <a href="check-in.html" class="dropdown-item">Check-In Books</a>
                    </li>
                    <li>
                      <a href="fee-payment.html" class="dropdown-item">Fee Settlements</a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link me-4 dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Inventory</a>
                  <ul class="dropdown-menu animate slide border">
                    <li>
                      <a href="add-book.html" class="dropdown-item">Add New Book</a>
                    </li>
                    <li>
                      <a href="lib-catalogue.html" class="dropdown-item">Manage Catalogue</a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="stats.html">Analystics</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="lib-profile.html">Profile</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link me-4 dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin</a>
                  <ul class="dropdown-menu animate slide border">
                    <li>
                      <a href="lib-sign-up.html" class="dropdown-item">Add new librarian</a>
                    </li>
                  </ul>
                </li>`;
      
      BodyObj.mainSearchBar.classList.toggle('d-none', true);
      BodyObj.userOptions.innerHTML = `<li>
                        <button class="dropdown-item" onclick="logout()">Logout</button>
                      </li>`;
      break;
    }

    case 'Member':{
      BodyObj.navBar.innerHTML = `<li class="nav-item">
                  <a class="nav-link me-4" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="library.html">Library</a>
                </li>
                <li class="nav-item dropdown" id="account-drop">
                  <a class="nav-link me-4 dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Account</a>
                  <ul class="dropdown-menu animate slide border">
                    <li>
                      <a href="reservations.html" class="dropdown-item">Reservations</a>
                    </li>
                    <li>
                      <a href="loans.html" class="dropdown-item">Loans</a>
                    </li>
                    <li>
                      <a href="fees.html" class="dropdown-item">View Fees</a>
                    </li>
                    <li>
                      <a href="profile.html" class="dropdown-item">Profile</a>
                    </li>
                  </ul>
                </li>`;

      BodyObj.mainSearchBar.classList.toggle('d-none', false);
      BodyObj.userOptions.innerHTML = `<li>
                        <button class="dropdown-item" onclick="logout()">logout<button>
                      </li>`;
      break;
    };

    case 'Not logged':{
      BodyObj.navBar.innerHTML = `<li class="nav-item">
                  <a class="nav-link me-4" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="library.html">Library</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="sign-up.html">Sign-Up</a>
                </li>`;

      BodyObj.mainSearchBar.classList.toggle('d-none', false);
      BodyObj.userOptions.innerHTML = ` <li>
                        <a href="#" class="dropdown-item fw-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</a>
                      </li>`;
      break;
    };

    default:{
      BodyObj.navBar.innerHTML = `<li class="nav-item">
                  <a class="nav-link me-4" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="library.html">Library</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="sign-up.html">Sign-Up</a>
                </li>`;
      
      BodyObj.mainSearchBar.classList.toggle('d-none', false);
      BodyObj.userOptions.innerHTML = ` <li>
                        <a href="#" class="dropdown-item fw-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</a>
                      </li>`;
      break;
    }
  }

}

function logout(){
  const logResp = confirm('Are you sure of logging out?')

  if (logResp){
    localStorage.setItem('loggedUser', null);

    changeSidebar('Not logged');

    window.location.reload(true);
  }
}
/*function toggleNewUserIconDrop(){
  newUserDropdown.
}*/


