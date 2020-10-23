//Selecting the elements of the DOM that we want to work with.
const container = document.querySelector('.container');
//Using SelectorAll to select all the seat that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
//Here we use the + operator to convert the value from String to Number
//We also use Let so we can have ticketPrice default available in multiple scopes.
populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price.
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update Total and Count
/*
  Weare going to copy the selected seats into an array with ..spread operator, so then we can map through that array and return new array indexes.
  We will use the indexes to store the seats into local storage.
  */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Creating Movie Select/Change event, and linking/updating  with the changes of seats clicked.
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Adding event listener on the Container element, and using e.target to  make sure its an  available seat that we clicking on .
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    //We using toggle so we can select and unselect the seat.
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

//Initial count and total set
updateSelectedCount();
