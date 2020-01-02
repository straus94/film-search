const apiKey = 'a9d625c4';
let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=Home-Alone`;
let domain = `http://www.omdbapi.com/?`;
let data, totalPages;
let totalResults = 0;
let test = `http://www.omdbapi.com/?apikey=a9d625c4&s=avatar&page=1&type=`;








class Movie {
    constructor(data) {
        this.title = data.Title;
        this.year = data.Year;
        this.imdbID = data.imdbID;
        this.type = data.Type;
        this.poster = data.Poster;
        // console.log(this);
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
        result += `<button class="film_details-bitn" onclick="showDetails(${this.imdbID})">Details</button>`;
        result += `<div class="film__details"></div>`;
        result += `</div>`;
        result += `</div>`;

        document.getElementById('content').innerHTML += result;

    }

    set showDetails (imdbID) {
        console.log(imdbID);
        // this.data.splice(imdbID, 1);   
    }
}




let getList = function(url) {
    console.log(url);
    fetch(url).then(function(result){
    // console.log(result.json());
        return result.json();
    }).then(function(result) {
        // console.log(result);
        if (result) {
            // console.log(result);    
            data = result.Search;
            // console.log(data);
            totalResults = result.totalResults;
            // console.log(totalResults);
            totalPages = Math.ceil(totalResults / 10);
            // console.log(totalPages);

            for (let film of data) {
                // console.log(film);
                let newFilm = new Movie(film);
                newFilm.print();
            }
        }

        showDetails = (imdbID) => {
            // console.log(imdbID);
            newFilm.showDetails = imdbID;
        }
        
    });
}

createList = () => {
    let name = document.getElementById('name').value;

    let arrRadio = document.getElementsByClassName('radioType');
    // console.log(arrRadio);

    let radio = false;
    let page = 1;

    for (let i of arrRadio) {
        // console.log(i);
        if (i.checked) {
            radio = i.value;
            // console.log(radio);
        }
    }

    if (radio) {
        url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${name}&type=${radio}&page=${page}`;
    } else {
        radio = '';
        url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${name}&page=${page}&type=${radio}`;
    }

    getList(url);
}


