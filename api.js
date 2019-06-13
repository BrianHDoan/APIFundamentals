const baseURL = 'https://api.spacexdata.com/v2/rockets';

const searchForm = document.querySelector('form');
const spaceShips = document.querySelector('table');

searchForm.addEventListener('submit', fetchSpace)

function fetchSpace(e) {
    e.preventDefault();

    fetch(baseURL)
    .then(results => {
        return results.json();
    })
    .then((json) => {
        displayRockets(json);
    })
}

// function displayRockets(data) {
//     // console.log("Results:", data);

//     let rockets = data.forEach(r => {
        
//         let rocket = document.createElement('li')
//         rocket.innerText = r.name;
//         spaceShips.appendChild(rocket);
//         let cost = document.createElement('li')
//         cost.innerText = r.cost_per_launch;
//         spaceShips.appendChild(cost);
//     });
//}


function displayRockets(data) {
    
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let tr = document.createElement('tr');
    
    th1.innerText = "name";
    th2.innerText = "cost";
    
    tr.appendChild(th2);
    tr.appendChild(th1);

    spaceShips.appendChild(tr);

    let rockets = data.forEach(r => {
        let tr = document.createElement('tr');
        let name = document.createElement('td')
        let cost = document.createElement('td')
        
        cost.innerText = r.cost_per_launch;
        name.innerText = r.name;
        tr.appendChild(cost);
        tr.appendChild(name);
        spaceShips.appendChild(tr);
})}

