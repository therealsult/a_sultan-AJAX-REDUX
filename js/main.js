(() => {

    window.addEventListener("load", () => {
        document.querySelector(".loader-wrapper").classList.add("loader-wrapper--hidden");
    })

    const movieBox = document.querySelector("#movie-box");
    const reviewTemplate = document.querySelector("#review-template");
    const reviewCon = document.querySelector("#review-con");
    const baseUrl = `https://search.imdbot.workers.dev/`;
    // const baseUrl = `https://swapi.dev/api/films/2/`;


    function getMovies() {
        fetch(`${baseUrl}?q=Star Wars`)
            .then((response) => response.json())
            .then(function (response) {
                const movies = response.description;
                const ul = document.createElement("ul");
                movies.forEach((movie) => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.textContent = movie["#TITLE"];
                    a.dataset.review = movie["#IMDB_ID"];
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                movieBox.appendChild(ul);
            })

            .then(function () {
                const links = document.querySelectorAll("#movie-box li a");
                links.forEach((link) => {
                    link.addEventListener("click", getReview);
                });
            })

            .catch((error) => {
                console.log(error);
            });
    }



    function getReview(e) {
        const reviewID = e.currentTarget.dataset.review;
        //  https://search.imdbot.workers.dev/?tt=tt0111257
        fetch(`${baseUrl}?tt=${reviewID}`)
            .then((response) => response.json())
            .then(function (response) {
                reviewCon.innerHTML = "";
                console.log(response.short.review.reviewBody);
                const template = document.importNode(reviewTemplate.content, true);
                const reviewBody = template.querySelector(".review-description");
                reviewBody.innerHTML = response.short.review.reviewBody;
                reviewCon.appendChild(template);
            })

            .catch((error) => {
                console.log(error);
            });
    }

    getMovies();


    gsap.fromTo('.title', {
        y: 40, opacity: 0,
    },
      {delay: 0.5, duration: .5, y: 0, opacity: 1, ease: 'power2.easeOut',
 
    })

    gsap.fromTo('.subtitle', {
        y: 40, opacity: 0,
    },
      {delay: 1.5, duration: .5, y: 0, opacity: 1, ease: 'power2.easeOut',
 
    })

    gsap.fromTo('.review-description', {
        y: 40, opacity: 0,
    },
      {delay: 0.5, duration: .5, y: 0, opacity: 1, ease: 'power2.easeOut',
 
    })


})();


