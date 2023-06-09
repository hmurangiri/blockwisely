
const domain = "https://blockwisely.com/"
const learn = domain + "learn/"
const news = domain + "news/"

const menuItems = [
    {label: 'Background', url: learn + 'background.html', id: 'background'},
    {label: 'Blockchain', url: learn + 'blockchain.html', id: 'blockchain'},
    {label: 'Types of Cryptocurrency', url: learn + 'crypto-types.html', id: 'crypto-types'},
    {label: 'Bitcoin', url: learn + 'bitcoin.html', id: 'bitcoin'},
    {label: 'Top Cryptocurrencies', url: learn + 'topcrypto.html', id: 'topcrypto'},
    {label: 'Stablecoins', url: learn + 'stablecoins.html', id: 'stablecoins'},
    {label: 'Crypto Trading', url: learn + 'crypto-trading.html', id: 'crypto-trading'},
    {label: 'NFT', url: learn + 'nft.html', id: 'nft'},
    {label: 'Smart Contracts', url: learn + 'smart-contracts.html', id: 'smart-contracts'},
    {label: 'Hashing', url: learn + 'hashing.html', id: 'hashing'}
];

var currentUrl = window.location.href;
if(currentUrl.includes("/learn/")) {
   var position = ""
}

let topMenu = '';
topMenu += '<div class="container-fluid"><a class="navbar-brand" href="' + domain + 'index.html">BLOCKWISELY</a>';
topMenu += '<button aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-bs-target="#main_nav" data-bs-toggle="collapse" type="button">';
topMenu += '    <span class="navbar-toggler-icon"></span>';
topMenu += '</button>';
topMenu += '<div class="collapse navbar-collapse" id="main_nav">';
topMenu += '    <ul class="navbar-nav">';
topMenu += '        <li class="nav-item active"><a class="nav-link" href="' + learn + 'background.html">Learn </a></li>';
topMenu += '        <li class="nav-item active"><a class="nav-link" href="' + news + 'index.html">News </a></li>';
topMenu += '    </ul>';
topMenu += '</div>';
topMenu += '</div>';

let sideContent = '';
sideContent += '<aside>';
sideContent += ' <nav class="sidebar card py-2" style="overflow:auto;">';
sideContent += '     <p style="margin: 5px 10px 2px 10px; font-size:1em; font-weight:200;">Table of Contents <span style="float:right;cursor:pointer;" id="tocControl" onClick="tocControlFunc()">[Hide]</span></p>';
sideContent += '     <hr id="hr">';
sideContent += '     <ul id="sideMenu" class="nav flex-column sideMenu"></ul>';
sideContent += ' </nav>';
sideContent += '</aside>';
  
// Generate the HTML code for the menu
function generateMenu() {
    document.getElementById('header').innerHTML = topMenu
    document.getElementById('sideContent').innerHTML = sideContent

    let menuHtml = '';
    for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        menuHtml += `<li class="nav-item"><a class="nav-link" id="${menuItem.id}" href="${menuItem.url}">${menuItem.label}</a></li>`;
    }

    document.getElementById('sideMenu').innerHTML = menuHtml;
    document.getElementById('sideMenu').onload = getUrlPosition();
}

function tocControlFunc() {
    var tocControl = document.getElementById('tocControl').innerHTML;
    
    if(tocControl == "[Hide]") {
        document.getElementById('tocControl').innerHTML = "[Show]"
        document.getElementsByClassName('sideMenu')[0].style.display = 'none'
        document.getElementById('hr').style.display = 'none'
        
    } else {
        document.getElementById('tocControl').innerHTML = "[Hide]"
        document.getElementsByClassName('sideMenu')[0].style.display = 'block'
        document.getElementById('hr').style.display = 'block'
    }
}

function getUrlPosition() {
    var path = window.location.href;
    var current = path.substring(path.lastIndexOf('/') + 1);
    current = current.split('.')[0];
    if (current === '') {
        current = 'index';
    }
    document.getElementById(current).classList.add("active");
}


document.addEventListener("DOMContentLoaded", function(){

    // Prevent closing from click inside dropdown
    document.querySelectorAll('.dropdown-menu').forEach(function(element){
        element.addEventListener('click', function (e) {
          e.stopPropagation();
        });
    })

    // make it as accordion for smaller screens
    if (window.innerWidth < 992) {

        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
            everydropdown.addEventListener('hidden.bs.dropdown', function () {
                // after dropdown is hidden, then find all submenus
                  this.querySelectorAll('.submenu').forEach(function(everysubmenu){
                      // hide every submenu as well
                      everysubmenu.style.display = 'none';
                  });
            })
        });
        
        document.querySelectorAll('.dropdown-menu a').forEach(function(element){
            element.addEventListener('click', function (e) {
    
                  let nextEl = this.nextElementSibling;
                  if(nextEl && nextEl.classList.contains('submenu')) {	
                      // prevent opening link if link needs to open dropdown
                      e.preventDefault();
                      console.log(nextEl);
                      if(nextEl.style.display == 'block'){
                          nextEl.style.display = 'none';
                      } else {
                          nextEl.style.display = 'block';
                      }

                  }
            });
        })
    }
    // end if innerWidth

}); 

