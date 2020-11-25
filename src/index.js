// DOM CONTENT

const tableBody = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')

// EVENT LISTENERS

tableBody.addEventListener('click', ({target}) => {
  if (target.tagName === 'BUTTON') {
    editDogFetch(target.dataset.id)
  }
})

dogForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const dog = {
    name: dogForm.name.value,
    breed: dogForm.breed.value, 
    sex: dogForm.sex.value
  }

  const dogId = document.querySelector('#editBtn').dataset.id
  submitEditFetch(dog, dogId)
  dogForm.reset()
})

// FETCH REQUESTS 

const fetchAllDogs = () => {
  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => renderDogsTable(dogs))
}

const editDogFetch = (dogId) => {
  fetch(`http://localhost:3000/dogs/${dogId}`)
    .then(resp => resp.json())
    .then(dogObj => renderEditForm(dogObj))
}

const submitEditFetch = (dogObj, dogId) => {
  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dogObj)
  })
 //For some reason this isn't updating in real time and
 //needs a second look.
}

// RENDER FUNCTIONS

const renderDogsTable = (dogs) => {
  dogs.forEach(dog => renderOneDog(dog))
}

const renderOneDog = (dog) => {
  const tr = document.createElement('tr')
    const nameTd = document.createElement('td')
    const breedTd = document.createElement('td')
    const sexTd = document.createElement('td')
    const editBtn = document.createElement('button')

    nameTd.textContent = dog.name
    breedTd.textContent = dog.breed
    sexTd.textContent = dog.sex
    editBtn.dataset.id = dog.id
    editBtn.textContent = "EDIT DOG"
    tr.dataset.id = dog.id

    tr.append(nameTd, breedTd, sexTd, editBtn)

    tableBody.append(tr)
}

const renderEditForm = ({id, name, breed, sex}) => {
  dogForm.name.value = name
  dogForm.breed.value = breed
  dogForm.sex.value = sex
  dogForm.editBtn.dataset.id = id
}

// INITIALIZE

const initialize = () => {
  fetchAllDogs()
}

initialize()