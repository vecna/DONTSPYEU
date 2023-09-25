
function baseURL() {
  let server = window.location.hostname;
  if (server === 'localhost') {
    server = 'http://localhost:2024';
  } else {
    server = 'https://' + server;
  }
  return server;
}

function serverURL(path, filter) {
  /* if we're in production the server is at the same address as the website, otherwise
   * the server is at localhost:2024 */
  return baseURL() + '/api/' + path + '/' + JSON.stringify(filter);
}

/* a kind of global variable to keep track the images index */
let currentIndex = 0;
async function loadCarousel() {

  const url = serverURL('individuals', { isfake: true });
  const response = await fetch(url);
  const data = await response.json();

  const carouselItem = document.querySelector('.carousel-item');
  const imgElement = carouselItem.querySelector('img');
  const detailsE = carouselItem.querySelector('.info');

  function updateCarousel() {
    const o = data[currentIndex];

    imgElement.src = `${baseURL()}/${o.image}`;
    imgElement.alt = o.Description;
    detailsE.querySelector('.description').textContent = o.Description;
    detailsE.querySelector('.country').textContent = o.Country;
    detailsE.querySelector('.official').textContent = o.OfficialRole;
  }

  carouselItem.addEventListener('click', (event) => {
    if (event.clientY < window.innerHeight / 2) {
      currentIndex = (currentIndex - 1 + data.length) % data.length;
    } else {
      currentIndex = (currentIndex + 1) % data.length;
    }
    updateCarousel();
  });


  // Avvio iniziale
  updateCarousel();

}