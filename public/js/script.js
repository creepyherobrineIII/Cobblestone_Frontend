//Constants
const sidebar = document.querySelector(".sidebar");
const sideDrop = document.querySelector(".sidebar-dropdown-button");
const newUserDropdown = document.getElementById("log-wishlist-drop");
//Variables
let bookURL = 'http://localhost:8080/books/inventory';

//Toggle sidebar dropdown
function toggleSubMenu(button){
  button.nextElementSibling.classList.toggle('show');
  button.classList.toggle('rotate');
}

//Singular DOM object for memory managament
let BodyObj = {
  userIcon: null,
  loginEmail: null,
  loginPass: null,
  sideMenuBar: null,
  sideMenuList: null,
  fullSideMenu: null,
  logErrLab: null
};

//Single values object for memory management
let BodyValuesObj = {
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

      var thumb_slider = new Swiper(".thumb-swiper", {
        slidesPerView: 1,
      });
      var large_slider = new Swiper(".large-swiper", {
        spaceBetween: 10,
        effect: 'fade',
        thumbs: {
          swiper: thumb_slider,
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

  BodyObj.fullSideMenu = document.getElementById("full-side");
  BodyObj.sideMenuList = document.getElementById("side-menu-list");

  const toggle = document.querySelector(".toggle");

  //Toggle sidebar
    toggle.addEventListener("click", () =>{
      sidebar.classList.toggle("close");
      //body.classList.toggle("blurred");
    });
  
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

    changeSidebar(userT);



  }else{
    changeSidebar(null);
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
}

//Function to change sidebar depending on usertype
function changeSidebar(userType){
  BodyObj.userIcon = this.document.getElementById("userIcon");

  switch(userType){
    case 'Librarian':{
      BodyObj.fullSideMenu.classList.toggle('sidebar', true);
      BodyObj.fullSideMenu.classList.toggle('close', true);
      BodyObj.fullSideMenu.style.removeProperty('display');
      BodyObj.userIcon.style.display = 'none';
      BodyObj.sideMenuList.innerHTML = `<li class="sm-nav-link">
                            <a href="lib-index.html">
                                <i class="ri-home-3-line icon"></i>
                                <span class="text sm-nav-text">Home</span>
                            </a>
                        </li>
                        <li class="sm-nav-link side-drop">
                             <button onclick="toggleSubMenu(this)" class="sidebar-dropdown-button" id="books-dropdown">
                                <i class="ri-book-shelf-line"></i>
                                <span class="text sm-nav-text">Books</span>
                                <i class="ri-arrow-drop-down-line d-icon"></i>
                           </button>
                           <ul class="sidebar-sub-menu" id="books-sub-menu">
                                <li><a href="check-in.html"><span class="text sm-nav-text">Check-In</span></a></li>
                                <li><a href="check-out.html"><span class="text sm-nav-text">Check-Out</span></a></li>
                           </ul>
                        </li>
                        <li class="sm-nav-link side-drop">
                           <button onclick="toggleSubMenu(this)" class="sidebar-dropdown-button" id="loans-dropdown">
                                <i class="ri-archive-stack-fill icon"></i>
                                <span class="text sm-nav-text">Loans</span>
                                <i class="ri-arrow-drop-down-line d-icon"></i>
                           </button>
                           <ul class="sidebar-sub-menu" id="loan-sub-menu">
                                <li><a href="fee-payment.html"><span class="text sm-nav-text">Fee Payment</span></a></li>
                           </ul>
                        </li>
                        <li class="sm-nav-link side-drop">
                             <button onclick="toggleSubMenu(this)" class="sidebar-dropdown-button" id="inventory-dropdown">
                                <i class="ri-survey-line"></i>
                                <span class="text sm-nav-text">Inventory</span>
                                <i class="ri-arrow-drop-down-line d-icon"></i>
                           </button>
                           <ul class="sidebar-sub-menu" id="inventory-sub-menu">
                                <li><a href="add-book.html"><span class="text sm-nav-text">Add book</span></a></li>
                                <li><a href="lib-catalogue.html"><span class="text sm-nav-text">Update inventory</span></a></li>
                           </ul>
                        </li>
                        <li class="sm-nav-link">
                            <a href="stats.html">
                                <i class="ri-bar-chart-line"></i>
                                <span class="text sm-nav-text">Analytics</span>
                            </a>
                        </li>
                        <li class="sm-nav-link side-drop">
                             <button onclick="toggleSubMenu(this)" class="sidebar-dropdown-button" id="profile-dropdown">
                                <i class="ri-user-line icon"></i>
                                <span class="text sm-nav-text">Profile</span>
                                <i class="ri-arrow-drop-down-line d-icon"></i>
                           </button>
                           <ul class="sidebar-sub-menu" id="profile-sub-menu">
                                <li><a href="#"><span class="text sm-nav-text">Change details</span></a></li>
                           </ul>
                        </li>`
    }

    case 'Member':{
      BodyObj.fullSideMenu.classList.toggle('sidebar', true);
      BodyObj.fullSideMenu.classList.toggle('close', true);
      BodyObj.fullSideMenu.style.removeProperty('display');
      BodyObj.userIcon.style.display = 'none';
      BodyObj.sideMenuList.innerHTML = `<li class="sm-nav-link">
                            <a href="#">
                                <i class="ri-home-3-line icon"></i>
                                <span class="text sm-nav-text">Home</span>
                            </a>
                        </li>
                        <li class="sm-nav-link">
                            <a href="#">
                                <i class="ri-time-line icon"></i>
                                <span class="text sm-nav-text">Reservations</span>
                            </a>
                        </li>
                        <li class="sm-nav-link side-drop">
                           <button onclick="toggleSubMenu(this)" class="sidebar-dropdown-button" id="loans-dropdown">
                                <i class="ri-archive-stack-fill icon"></i>
                                <span class="text sm-nav-text">Loans</span>
                                <i class="ri-arrow-drop-down-line d-icon"></i>
                           </button>
                           <ul class="sidebar-sub-menu" id="loan-sub-menu">
                                <li><a href="#"><span class="text sm-nav-text">Active Loans</span></a></li>
                                <li><a href="#"><span class="text sm-nav-text">Past Loans</span></a></li>
                           </ul>
                        </li>
                        <li class="sm-nav-link side-drop">
                             <button onclick="toggleSubMenu(this)" class="sidebar-dropdown-button" id="profile-dropdown">
                                <i class="ri-user-line icon"></i>
                                <span class="text sm-nav-text">Profile</span>
                                <i class="ri-arrow-drop-down-line d-icon"></i>
                           </button>
                           <ul class="sidebar-sub-menu" id="profile-sub-menu">
                                <li><a href="#"><span class="text sm-nav-text">Change details</span></a></li>
                           </ul>
                        </li>`;
    }

    case null:{
      BodyObj.userIcon.style = '';
      BodyObj.fullSideMenu.style.display = 'none'
    }

    default:{
      BodyObj.userIcon.style = '';
    }
  }

}

/*function toggleNewUserIconDrop(){
  newUserDropdown.
}*/


