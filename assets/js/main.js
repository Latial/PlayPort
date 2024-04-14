function fetchData(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              callback(data);
          } else {
              console.error('Error fetching data:', xhr.statusText);
          }
      }
  };
  xhr.open('GET', url, true);
  xhr.send();
}
fetchData('assets/data/categories.json',showAllCategories)
fetchData('assets/data/games.json', function(gameData) {
  // Fetch type data
  fetchData('assets/data/type.json', function(typeData) {
      // Call showGames with both data sets
      showGames(gameData, typeData);
  });
});
function showGames(gameData, typeData) {
  typeData.forEach(type => {
      let filteredGames;
      if (type.name === "trending") {
          filteredGames = gameData.filter(game => game.type === type.id);
          displayCorrectGames(filteredGames, ".trending");
      } 
      else if (type.name === "preorders") {
          filteredGames = gameData.filter(game => game.type === type.id);
          displayCorrectGames(filteredGames, ".preorders");
      }
      else if (type.name === "bestSellers") {
          filteredGames = gameData.filter(game => game.type === type.id);
          displayCorrectGames(filteredGames, ".bestSellers");
      }
      
  });
  function displayCorrectGames(gamesData, div) {
      console.log(gamesData)
      const gameCards = gamesData.map(game => `
      <div class="item banner-similar">
         <a class="cover video" href="assets/pages/prducts.html">
            <picture>
               <img class="picture" data-src="${game.img.src}" alt="${game.img.alt}" src="${game.img.src}" loading="lazy" onload="lazyLoadImage(this)">
            </picture>
            <div class="discount">${game.discount}</div>
         </a>
         <div class="information">
            <div class="text">
               <div class="name">
                  <span class="title">${game.name}</span>
               </div>
            </div>
            <div class="price">${game.price}<span>RSD</span></div>
         </div>
      </div>
  `);
  $(div).html(gameCards);
  }
}
function showAllCategories(data) {
    const categorieCard = data.map(caterogie => `
        <a href="" class="item ${caterogie.item} ${caterogie.att}" style="background-image: url('${caterogie.background_image}');">
        <div class="content">
        <div class="name">${caterogie.name}</div>
        <div class="cover" style="background-image: url('${caterogie.cover_image}');"></div>
        </div>
        </a>
    `);
    console.log(categorieCard)
    $('.higher').html(categorieCard);

    const links = document.querySelectorAll('.categories-container a:not(.best)');
    const button = document.getElementById('showAllCategories');

    button.addEventListener('click', function() {
        links.forEach(link => {
            if (link.style.display === 'block') {
                link.style.display = 'none';
            } 
            else 
            {
                link.style.display = 'block';
            }
        });
    });
}
function fetchData(url,dataGet) {
    $.ajax({
        url : url,
        type : "GET",
        dataType : "json",
        success : function(data) {
            dataGet(data);
        },
        error : function(xhr, status, err) {
            alert(status, err);
        }
    })
}
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
    var searchInput = document.getElementById("header-search-input");
    searchInput.placeholder = "";
});

function lazyLoadImage(item) {
    const image = new Image();
    const src = item.getAttribute('data-src');

    if (null === src) {
        return;
    }

    item.onload = null;
    image.src = src;

    image.onload = function () {
        item.setAttribute('src', src);
    };
}


document.addEventListener("DOMContentLoaded", function() {

    // Function to toggle display property
    function toggleDisplay(elementId) {
        var element = document.getElementById(elementId);
        if (element.style.display === "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }

    // Add click event listeners to nav pc, nav playstation, and nav xbox
    document.getElementById("nav-pc").addEventListener("click", function() {
        toggleDisplay("nav-pc-panel");
    });

    document.getElementById("nav-playstation").addEventListener("click", function() {
        toggleDisplay("nav-playstation-panel");
    });

    document.getElementById("nav-xbox").addEventListener("click", function() {
        toggleDisplay("nav-xbox-panel");
    });
    document.getElementById("nav-nintendo").addEventListener("click", function() {
        toggleDisplay("nav-nintendo-panel");
    });
});
document.addEventListener("DOMContentLoaded", function() {

    // Function to handle scroll event
    function handleScroll() {
        if (window.scrollY > 0) {
            document.body.classList.add("scrolled");
        } else {
            document.body.classList.remove("scrolled");
        }
    }

    // Add scroll event listener to the window
    window.addEventListener("scroll", handleScroll);
});
document.addEventListener("DOMContentLoaded", function() {
    var searchForm = document.getElementById("search-site");
    var closeSearchButton = document.querySelector(".close-search");
    var searchInput = document.getElementById("header-search-input");
    var body = document.body;

    searchForm.addEventListener("click", function() {
        body.classList.add("search-open");
        searchInput.placeholder = "Baldur's Gate, HellDivers 2, Factorio.....";
    });

    closeSearchButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent the click event from bubbling up to the search form
        body.classList.remove("search-open");
        searchInput.placeholder = "";
    });
});
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
$('.badge').text(cartItems.length);
