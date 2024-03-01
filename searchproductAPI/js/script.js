document.addEventListener(('DOMContentLoaded'), function () {
  //  this is the endpoint for the dummy data
  // https://dummyjson.com/products


  

  fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(result => printElement(result.products))
  .catch(error => console.log('error', error));

  const products = document.querySelector('.products')
  const modal = document.querySelector('.modal')
  
  const printElement = (array) => {

    products.innerHTML = ''

    array.forEach(element => {

      const template = `
        <div class="product">
            <div class="content">
              <h2>${element.category}</h2>
              <img
                src="${element.thumbnail}"
                alt="${element.title}"
              />
              <h3>${element.title}</h3>
              <p>${element.brand}</p>
              <p> $  ${element.price}</p>
              <p>In stock: ${element.stock}</p>
            </div>
            <button class="btn button--product" data-id='${element.id}'>View</button>
          </div>
        `


      products.innerHTML += template
    });


    //ciclo sui bottoni view

    const buttonView = document.querySelectorAll('.button--product')
    buttonView.forEach(element => {
      element.addEventListener('click', function(){
        
        //prendo il data id del elemento genitore del viwe cliccato
        const id = this.getAttribute('data-id')

        //qui richiamo la funzione che prende l'id tramite api
        getSingleRecipe(id)  

    
      })
    })
  }

  const stampCard = (result) => {

    modal.innerHTML =''


//variabile e ciclo per inserire le immagini in base a quante ne sono 
    let allImages = ''
    result.images.forEach(element => {
      allImages += `<img src="${element}" alt"${result.title}"> `
    })


    const templatePopUp = `
    
      <div class="modal-inner" data-id='${result.id}' >
      <button class="btn btn--close-modal">
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
      <div class="modal-content">
        <img
          class="modal-image"
          src="${result.thumbnail}"
          alt="${result.name}"
        />
        <ul class="list-image">
          <li class="list-image">
            ${allImages}
          </li>
        </ul>
        <div class="modal-text">
          <h2 class="modal-title">${result.title}</h2>
          <p class="modal-price"> $ ${result.price}</p>
          <h3 class="modal-title-description">Description: </h3>
          <p class="modal-description">${result.description}</p>
          <p class="modal-rating">Rating: ${result.rating}</p>
          <button class="btn btn--add-to-cart">Add to cart</button>
        </div>
      </div>
    </div>

    `

    modal.innerHTML += templatePopUp

  
    const modalInner = document.querySelector('.modal-inner') //richiamo il contenitore
    const divPopUp = modalInner.closest('.modal') //richiamo il div genitore di tutto con colsest
    divPopUp.classList.toggle('modal--hidden') //metto e tolgo con toggle 

    //qua prendo tutti i pulsanti close 
    const closePopUp = document.querySelectorAll('.btn--close-modal')
    //creo un ciclo su di essi
    closePopUp.forEach(element => {
      element.addEventListener('click', function(){
        const closeDiv = element.closest('.modal') //richiamo il div genitore sempre con closest
        closeDiv.classList.toggle('modal--hidden')
      })
    })
  }

   const getSingleRecipe=(id)=>{
    fetch(`https://dummyjson.com/products/${id}`)
        .then(response => response.json())
        .then(result => stampCard(result)) //come risultato prendiamo la funzione che da il secondo template
        .catch(error => console.log('error', error));
  }





  //codice per stampare al cerca

  const input = document.getElementById('textInput')
  const buttonSearch = document.getElementById('searchButton')

  buttonSearch.addEventListener('click', function(){
  const inputValue = input.value
  const newArray = []

    fetch(`https://dummyjson.com/products/search?q=${inputValue}`)
        .then(response => response.json())
        .then(result => resultSearch(result,inputValue, newArray))
        .catch(error => console.log('error', error));
  })

  const resultSearch = (result, inputValue, newArray) => {

    result.products.forEach(element => {
        if (element.title.toLowerCase().includes(inputValue) && inputValue.length) {
      ;
        newArray.push(element)
        printElement(newArray)

        
      }
    })

  }



  //codice per il reset

  const buttonReset = document.getElementById('resetButton')

  buttonReset.addEventListener('click', function(){
    const inputValue = input.value
    
    fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(result => printElement(result.products))
  .catch(error => console.log('error', error));

  input.value = ''
    
  })


}) //ended





