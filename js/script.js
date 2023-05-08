let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let resultSecond = document.getElementById("result-second");
let result3 = document.getElementById("result-3");
//function to fetch data from api

let getMovie = () => {
    let movieName = movieNameRef.value;
    let key = '7f9a3b82';
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    } else {
        fetch(url).then((resp) => resp.json())
            .then((data) => {
                //if movie exist in database
                if (data.Response == "True") {
                    result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
                    let html = ''
                    let arr = []
                    data.Ratings.forEach((item) => {
                        arr.push({
                            name: item.Source,
                            value: item.Value
                        })
                        html += `
                        <div>
                        <span>${ item.Source }</span>
                        <span>${ item.Value }</span>
                        </div>
                        
                        `
                    })
                    let info = '';
                    arr.forEach((item) => {
                        info += `
                        <p>${item.name} <span>${item.value}</span></p>
                        `
                    });
                    console.log(info)
                    resultSecond.innerHTML = html;
                    result3.innerHTML = info
                }

                //if movie doesn't exist in database
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .then((data) => {

            })
            //if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
}

searchBtn.addEventListener("click", getMovie);