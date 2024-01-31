(() => {

    /* LOADING SPINNER */
    const spinner = `<img src="images/tail-spin.svg" alt="loading" class="spinner"> `;

    function displaySpinner(element) {
        const spinnerDiv = document.createElement('div');
        spinnerDiv.classList.add('custom-spinner');
        spinnerDiv.innerHTML = spinner;
        element.appendChild(spinnerDiv);
    }

    function removeSpinner(element) {
        const spinnerDiv = element.querySelector(".custom-spinner");
        if (spinnerDiv) {
            spinnerDiv.remove();
        }
    }


    /* API FETCH */
    const starBox = document.querySelector("#star-box");
    const movieCon = document.querySelector("#movie-con");

    function displayCharacters() {
        displaySpinner(starBox);
        fetch('https://swapi.dev/api/people/?format=json')
            .then(response => response.json())
            .then(data => {
                removeSpinner(starBox);
                const chars = document.createElement("ul");
                data.results.forEach(character => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.textContent = character.name;
                    link.href = "#";
                    const filmIndex = Math.floor(Math.random() * character.films.length);
                    link.dataset.filmUrl = character.films[filmIndex];
                    link.addEventListener("click", (e) => {
                        e.preventDefault();
                        displaystarDetails(link.dataset.filmUrl);
                    });

                    listItem.appendChild(link);
                    chars.appendChild(listItem);
                });
                starBox.appendChild(chars);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
                removeSpinner(starBox);
            });
    }

    function displaystarDetails(filmUrl) {
        movieCon.innerHTML = '';
        displaySpinner(movieCon);

        fetch(filmUrl)
            .then(response => response.json())
            .then(filmData => {
                const starImage = `images/image${filmData.episode_id}.jpg`;
                movieCon.innerHTML = `
          <h3 class="movie-title"> ${filmData.episode_id} - ${filmData.title}</h3>
          <div class="flexcon">
          <div><img  class="img" src="${starImage}" alt="star Poster: ${filmData.title}"></div>
          <div>          <P>Release date: ${filmData.release_date}</P>
          <P>Director: ${filmData.director}</P>
          <P>Producer(s): ${filmData.producer}</P></div>
          </div>

          <div class="p-box">
            <p>${filmData.opening_crawl}</p>
          </div>`;
                removeSpinner(movieCon);
            })
            .catch(error => {
                console.error('Error fetching star details:', error);
                removeSpinner(movieCon);
            });
    }

    displayCharacters();



    /* GSAP ANIMATIONS */
    gsap.fromTo('.title', {
        y: 40, opacity: 0,
    },
        {
            delay: 0.5, duration: .8, y: 0, opacity: 1, ease: 'power2.easeOut',

        })

    gsap.fromTo('.subtitle', {
        y: -40, opacity: 0,
    },
        {
            delay: 1.5, duration: .3, y: 0, opacity: 1, ease: 'power2.easeOut',

        })

    gsap.fromTo('.review-description', {
        y: 40, opacity: 0,
    },
        {
            delay: 0.5, duration: .5, y: 0, opacity: 1, ease: 'power2.easeOut',

        })
})();
