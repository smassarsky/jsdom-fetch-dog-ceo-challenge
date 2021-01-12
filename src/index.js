const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let breeds = []

document.addEventListener("DOMContentLoaded", () => {
  const dogImages = document.querySelector("#dog-image-container")
  const dogBreeds = document.querySelector("#dog-breeds")
  const dropDown = document.querySelector("#breed-dropdown")

  fetchPictures();
  fetchBreeds();
  colorsListener();
  dropDownListener();

  function fetchPictures() {
    fetch(imgUrl)
      .then(resp => resp.json())
      .then(json => updateImages(json))
  }

  function updateImages(json) {
    if (json.status === "success") {
      dogImages.innerHTML = ""
      for (let url of json.message) {
        dogImages.innerHTML += `<img src="${url}" height="200px">`;
      }
    }
  }

  function fetchBreeds() {
    fetch(breedUrl)
      .then(resp => resp.json())
      .then(breedsJson => {
        parseBreeds(breedsJson);
        updateBreeds("all");
      })
  }

  function parseBreeds(breedsJson) {
    for (const name in breedsJson.message) {
      console.log(breedsJson[name])
      if (breedsJson.message[name].length === 0) {
        
        breeds.push(name)
      } else {
        for (const sname of breedsJson.message[name]) {
          breeds.push(`${sname} ${name}`)
        }
      }
    }
    breeds = breeds.sort()
  }

  function updateBreeds(flag) {
    dogBreeds.innerHTML = ""
    let subSet
    if (flag === "all") {
      subSet = breeds
    } else {
      subSet = breeds.filter(breed => breed.startsWith(flag))
    }
    for (let breed of subSet) {
      dogBreeds.innerHTML += `<li>${breed}</li>`
    }
  }

  function colorsListener() {
    dogBreeds.addEventListener("click", e => {
      if (e.target.nodeName === "LI") {
        e.target.style.color = "green";
      }
    })
  }

  function dropDownListener() {
    dropDown.addEventListener("change", e => {
      updateBreeds(e.target.value)
    })
  }

})



