const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=242b3e9b165181a50b18b6b550dc337b&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=242b3e9b165181a50b18b6b550dc337b&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


returnMovies(APILINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            main.innerHTML = ''; // Clear previous results
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                // Fallback image if poster_path is missing
                image.src = element.poster_path ? imgPath + element.poster_path : 'fallback.jpg';

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');
                title.innerHTML = element.title;

                div_card.appendChild(image);
                div_card.appendChild(title);

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');
                div_column.appendChild(div_card);

                main.appendChild(div_column);
            });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value;
    if (searchItem) {
        returnMovies(searchAPI + searchItem);
        search.value = "";
    }
});
