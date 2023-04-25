const pageInput = document.querySelector('#page');
const resultsContainer = document.querySelector('#resultsContainer');
const formBuscar = document.querySelector('form[role="search"]');
const inputBuscar = document.querySelector('#inputBuscar');


let row = document.createElement('div');
row.classList.add('row');
let colCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const page = 1; // Define la página inicial
  const limit = 10;
  const url = `https://digimon-api.vercel.app/api/digimon?page=${page}&limit=${limit}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Limpiar los resultados previos
      resultsContainer.innerHTML = '';

      // Ordenar los datos por el atributo 'name'
      data.sort((a, b) => a.name.localeCompare(b.name));

      // Recorrer los resultados y crear dinámicamente los elementos HTML
      data.forEach(digimon => {
        const digimonElement = document.createElement('div');
        digimonElement.classList.add('card');
        digimonElement.innerHTML = `
          <img src="${digimon.img}" class="card-img-top remove-bg" alt="${digimon.name}">
          <div class="card-body">
            <h5 class="card-title">${digimon.name}</h5>
            <p class="card-text">${digimon.level}</p>
          </div>
        `;
        let col = document.createElement('div');
        col.classList.add('col-6', 'col-md-3', 'col-lg-3', 'col-xl-3');
        col.appendChild(digimonElement);
        row.appendChild(col);
        colCount++;

        if (colCount === 4) {
          resultsContainer.appendChild(row);
          row = document.createElement('div');
          row.classList.add('row');
          colCount = 0;
        }
      });
      // Agregar la última fila (si no se completó con cuatro columnas)
      if (colCount > 0) {
        // Agregar columnas vacías para completar la fila
        for (let i = colCount; i < 4; i++) {
          let emptyCol = document.createElement('div');
          emptyCol.classList.add('col-6', 'col-md-3', 'col-lg-3', 'col-xl-3');
          row.appendChild(emptyCol);
        }

        resultsContainer.appendChild(row);
      }
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });

});

//Evento para buscar digimon
formBuscar.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = `https://digimon-api.vercel.app/api/digimon/name/${inputBuscar.value}`;
  fetch(url)
    .then(response => response.json())
    .then(dataSearch => {

      dataSearch.forEach(digimon => {
        const digimonElement = document.createElement('div');
        digimonElement.classList.add('card');
        resultsContainer.innerHTML = '';
        resultsContainer.innerHTML = `
          <img src="${digimon.img}" class="card-img-top remove-bg" alt="${digimon.name}">
          <div class="card-body">
            <h5 class="card-title">${digimon.name}</h5>
            <p class="card-text">${digimon.level}</p>
          </div>
        `;
      });
      // Establecer estilo en JavaScript
      resultsContainer.style.maxWidth = '600px';
      resultsContainer.style.margin = '0 auto';
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
});


//Evento para buscar por nivel
const levelLinks = document.querySelectorAll('[data-level]');

levelLinks.forEach(levelLink => {
  levelLink.addEventListener('click', (event) => {
    event.preventDefault();
    const level = event.target.dataset.level;
    const url = `https://digimon-api.vercel.app/api/digimon/level/${level}`;
    fetch(url)
      .then(response => response.json())
      .then(dataLevel => {
        console.log(dataLevel);

        resultsContainer.innerHTML = '';
        dataLevel.forEach(digimon => {
          const digimonLevel = document.createElement('div');
          digimonLevel.classList.add('card');
          digimonLevel.innerHTML = `
            <img src="${digimon.img}" class="card-img-top remove-bg" alt="${digimon.name}">
            <div class="card-body">
              <h5 class="card-title">${digimon.name}</h5>
              <p class="card-text">${digimon.level}</p>
            </div>
          `;
          let col = document.createElement('div');
          col.classList.add('col-6', 'col-md-3', 'col-lg-3', 'col-xl-3');
          col.appendChild(digimonLevel);
          row.appendChild(col);
          colCount++;

          if (colCount === 4) {
            resultsContainer.appendChild(row);
            row = document.createElement('div');
            row.classList.add('row');
            colCount = 0;
          }
        });

        // Filtrar por nivel de digimon al hacer clic en los enlaces de nivel
        levelLinks.forEach(levelLink => {
          levelLink.addEventListener('click', (event) => {
            event.preventDefault();
            const level = event.target.dataset.level;
            resultsContainer.querySelectorAll('.card').forEach(card => {
              if (level === '' || card.querySelector('.card-text').textContent === level) {
                card.style.display = 'block';
              } else {
                card.style.display = 'none';
              }
            });
          });
        });
      })
      .catch(error => {
        console.error('Error en la petición:', error);
      });
  });
});
