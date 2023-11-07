// 1. Define my url
const garageUrl = "https://wagon-garage-api.herokuapp.com/notCreativeTooLogical/cars "

// 2. Make a fetch request to grab all cars
const refreshCars = () => {
  fetch(garageUrl)
    .then(response => response.json())
    .then((data) => {
      // 3. For each car, create a card and insert into the page
      const carsList = document.querySelector(".cars-list")
      carsList.innerHTML = ""
      data.forEach((car) => {
        const carCard = `<div class="car">
              <div class="car-image">
                <img src="http://loremflickr.com/300/300/${car.brand}${car.model}">
              </div>
              <div class="car-info">
                <h4>${car.brand} - ${car.model}</h4>
                <p><strong>Owner:</strong> ${car.owner}</p>
                <p><strong>Plate:</strong> ${car.plate}</p>
              </div>
            </div>`

        carsList.insertAdjacentHTML("beforeend", carCard)
      })
    })
}


const addCar = (event) => {
  // 4. event.preventDefault()
  event.preventDefault()
  // 3. Grab the fields filled by the user
  const brand = document.getElementsByName("brand")[0].value
  const model = document.getElementsByName("model")[0].value
  const plate = document.getElementsByName("plate")[0].value
  const owner = document.getElementsByName("owner")[0].value
  // 5. Make the post request
  const requestDetails = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand: brand,
            model: model,
            owner: owner,
            plate: plate
        })
  }

  fetch(garageUrl, requestDetails)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
  refreshCars()
}

refreshCars()

// 1. Select the form
const carForm = document.querySelector(".car-form")
// 2. Listen to the submit of the form
carForm.addEventListener("submit", addCar)
