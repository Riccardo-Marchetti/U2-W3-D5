const generatecard = function (arrayOfProducts) {
  arrayOfProducts.forEach((prod) => {
    const newCol = document.createElement("div");
    newCol.classList.add(
      "col-12",
      "col-sm-6",
      "col-md-6",
      "col-lg-4",
      "col-xl-4",
      "col-xxl-3",
      "mb-5"
    );
    newCol.innerHTML = `
        <div class="card h-100">
            <img src="${prod.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${prod.name}</h5>
                <p class="card-text flex-grow-1">${prod.description}</p>
                <p class="card-text">${prod.brand}</p>
                <p>${prod.price}€</p>
                <a id="modifica" href="./backoffice.html?productId=${prod._id}" class="btn btn-info mt-2">
                 MODIFICA 
                </a>
                <a id="scopri" href="./details.html?productId=${prod._id}" class="btn btn-success mt-2">
                 Scopri di più 
                </a>
            </div>
        </div>`;
    const row = document.getElementById("riga");
    row.appendChild(newCol);
  });
};

const getproduct = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDEzNjE4N2U1YzAwMTgxNGM2MjMiLCJpYXQiOjE3MDU2NTY2MzAsImV4cCI6MTcwNjg2NjIzMH0.xnT5YFK1dFd3pfCQ6qUlNsZLSIhYVwRfHVnbBFbC1-M",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "non sono riuscito a recuperare l'evento per ripopolare il form"
        );
      }
    })
    .then((data) => {
      console.log("DATA", data);
      generatecard(data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};
getproduct();
