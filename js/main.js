const apiKey = 'a9d625c4';
let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=Home-Alone`;
let domain = `https://www.omdbapi.com/?`;
let data, totalPages;
let totalResults = 0;
let test = `https://www.omdbapi.com/?apikey=a9d625c4&s=avatar&page=1&type=`;
let radio = false;
let page = 1;
let name = '';



class Movie {
    constructor(data) {
        this.title = data.Title;
        this.year = data.Year;
        this.imdbID = data.imdbID;
        this.type = data.Type;
        this.poster = data.Poster;
        this.data = data;
    }

    print() {
        // console.log(this);
        let result = `<div class="film">`;

        if (this.poster === 'N/A') {
            result += `<div class="film__poster"><img src="no.png"></div>`;

        } else {
            result += `<div class="film__poster"><img src="${this.poster}"></div>`;

        }
        result += `<div class="film__dec">`;
        result += `<div class="film__dec-item"><span>Title:</span> ${this.title}</div>`;
        result += `<div class="film__dec-item"><span>Year:</span> ${this.year}</div>`;
        result += `<div class="film__dec-item"><span>Type:</span> ${this.type}</div>`;
        // result += `<div class="imdbID" style="display:none;">${this.imdbID}</div>`;
        console.log(this.imdbID);
        result += `<button class="film_details-bitn" onclick="showDetails('${this.imdbID}')">Details</button>`;
        result += `<div class="film__details"></div>`;
        result += `</div>`;
        result += `</div>`;

        document.getElementById('content').innerHTML += result;

        let paginator = ``;
        for (let i = 1; i <= totalPages; i++) {
            paginator += `<span class="paginator__item" onclick="createList(${i})">${i}</span>`;
        }
        document.getElementById('paginator').innerHTML = paginator;

    }


    clearData() {
        document.getElementById('content').innerHTML = '';
    }
}




let getList = function(url) {
    console.log(url);
    fetch(url).then(function(result){
        return result.json();
    }).then(function(result) {
        if (result.Search) {

            data = result.Search;
            totalResults = result.totalResults;
            totalPages = Math.ceil(totalResults / 10);

            for (let film of data) {
                // console.log(film);
                let newFilm = new Movie(film);
                // newFilm.clearData();
                newFilm.print();
            }
        }

        
    });
}

showDetails = (id) => {
    console.log(id);
    let urlDetails = `${domain}apikey=${apiKey}&i=${id}&plot=full`;
    console.log(urlDetails);

    fetch(urlDetails).then(function(result){
        return result.json();
    }).then(function(result){
        console.log(result.Plot);

        let plot = `<div class="film__plot">${result.Plot}</div>`;
        document.getElementById('details').innerHTML += plot;
        
    });
}



createList = (i = 1, imdbID = '') => {
    console.log(imdbID);

    document.getElementById('content').innerHTML = '';
    document.getElementById('details').innerHTML = '';

    name = document.getElementById('name').value;

    let arrRadio = document.getElementsByClassName('radioType');
    for (let i of arrRadio) {
        // console.log(i);
        if (i.checked) {
            radio = i.value;
        }
    }

    if (radio) {
        url = `${domain}apikey=${apiKey}&s=${name}&type=${radio}&page=${i}`;
    } else {
        radio = '';
        url = `${domain}apikey=${apiKey}&s=${name}&page=${i}&type=${radio}`;
    }


    getList(url);
}

console.log('sd');



