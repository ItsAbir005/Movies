let page = 1;
let pageSize = 10;

async function getMovies(page) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWEyMmQzMjk4ZGQ0ZTViMmZkMmVkMzc5MGYzN2JkNCIsIm5iZiI6MTc0MzE2MzA2My40LCJzdWIiOiI2N2U2OGViNzMzYTc0MzQxZTMxMGVlZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8V4PeM0WCojsdqgZuAC_6MO81RdQSj4XiJvzX51E0aI'
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options);
    const data = await response.json();

    console.log(JSON.stringify(data));

    let container = document.querySelector('.content');
    let str = '';
    for (let item of data.results) {
        str += `
        <div class="card" style="width: 18rem; display: flex; flex-direction: column; justify-content: space-between;">
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text text-muted">Release Date: ${item.release_date}</p>
                <p class="card-text text-muted">Rating: ${item.vote_average}</p>
                <button type="button" class="btn btn-primary trailer-btn" 
    data-title="${item.title}" 
    data-popularity="${item.popularity}" 
    data-vote="${item.vote_average}" 
    data-desc="${item.overview}" 
    data-img="https://image.tmdb.org/t/p/w500${item.poster_path}"
    data-original_title="${item.original_title}">
    Overview
</button>
            </div>
        </div>`;
    }

    container.innerHTML = str;

    document.querySelectorAll('.trailer-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            const title = event.target.getAttribute('data-title');
            const desc = event.target.getAttribute('data-desc');
            const img = event.target.getAttribute('data-img');
            const popularity = event.target.getAttribute('data-popularity');
            const vote = event.target.getAttribute('data-vote');
            const original_title = event.target.getAttribute('data-original_title');

            const newPageContent = `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            display: flex;
            width: 100%;
            height: 100vh;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .image-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .image-container img {
            max-width: 80%;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .details {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .details h1 {
            color: #333;
            font-size: 2rem;
        }
        .details p {
            color: #555;
            font-size: 1.2rem;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="image-container">
            <img src="${img}" alt="${title}">
        </div>
        <div class="details">
            <h1>${title}</h1>
            <p><strong>Overview:</strong> ${desc}</p>
            <p><strong>Popularity:</strong> ${popularity}</p>
            <p><strong>Average Vote:</strong> ${vote}</p>
            <p><strong>Original Title:</strong> ${original_title}</p>
        </div>
    </div>
</body>
</html>          `;

            const newTab = window.open();
            newTab.document.write(newPageContent);
            newTab.document.close();
        });
    });
}

getMovies(1);




