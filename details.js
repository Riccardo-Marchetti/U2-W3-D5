const nameInp = document.getElementById("name");
const descriptionInp = document.getElementById("description-product");
const brandInp = document.getElementById("brand-prod");
const imageInp = document.getElementById("image-product-url");
const priceInp = document.getElementById("price");
const form = document.getElementById("car");
const myUrl = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);

const productId = addressBarContent.get("productId");
console.log(productId);

if (productId) {
  fetch(myUrl + "/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDEzNjE4N2U1YzAwMTgxNGM2MjMiLCJpYXQiOjE3MDU2NTY2MzAsImV4cCI6MTcwNjg2NjIzMH0.xnT5YFK1dFd3pfCQ6qUlNsZLSIhYVwRfHVnbBFbC1-M",
      "Content-Type": "application/json",
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
    .then((singleProduct) => {
      nameInp.innerHTML = singleProduct.name;
      descriptionInp.innerHTML = singleProduct.description;
      brandInp.innerHTML = singleProduct.brand;
      imageInp.src = singleProduct.imageUrl;
      priceInp.innerHTML = singleProduct.price + "€";
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: nameInp.value,
    description: descriptionInp.value,
    brand: brandInp.value,
    imageUrl: imageInp.value,
    price: priceInp.value,
  };

  console.log("ecco i dati raccolti dal form che sto per inviare:", newProduct);

  let URLToUse;
  let methodToUse;

  if (productId) {
    methodToUse = "PUT";
    URLToUse = myUrl + "/" + productId;
  } else {
  }

  fetch(URLToUse, {
    method: methodToUse,

    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDEzNjE4N2U1YzAwMTgxNGM2MjMiLCJpYXQiOjE3MDU2NTY2MzAsImV4cCI6MTcwNjg2NjIzMH0.xnT5YFK1dFd3pfCQ6qUlNsZLSIhYVwRfHVnbBFbC1-M",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        alert("PRODOTTO SALVATO!");

        nameInp.value = "";
        descriptionInp.value = "";
        brandInp.value = "";
        imageInp.value = "";
        priceInp.value = "";
        location.assign("./homepage.html");
      } else {
        alert("PROBLEMA NEL SALVATAGGIO!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
