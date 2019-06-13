const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json' //1
const key = 'a0A8NoZyfUy4H2GTtiAWkLFktMG8nHl7' //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

nav.style.display = 'none';  //takes away the nav buttons
let pageNumber = 0;
console.log('Page Number:', pageNumber);  
let displayNav = false;  //making sure the nav buttons don't show up

        //1                     //2
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage); //3
previousBtn.addEventListener('click', previousPage); //3

                      //1  
function fetchResults(e) {
        e.preventDefault(); 
        console.log(e); //1 Prevents refresh so we can see the console log since forms refresh after every submit
        //Assemble the full URL
        url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3
        console.log('URL:', url); //4

        if(startDate.value !=='') {
                console.log(startDate.value);
                url += '&start_date=' + startDate.value;
        }

        if(endDate.value !=='') {
                url += '&end_date=' + endDate.value;
        }

        fetch(url)
        .then(function(result) {
                return result.json();
        })
        .then(function(json){
                displayResults(json);
        })
}

function displayResults(json) {
        while (section.firstChild) {
                section.removeChild(section.firstChild);
        }
        let articles = json.response.docs;

        if(articles.length === 10) {
                nav.style.display = 'block'; //This shows the nav we hid if there are 10 items in the array
        } else {
                nav.style.display = 'none'; //hides the nav if there are less than 10
        }
        
        if (articles.length === 0) {
                console.log('No results');
        } else {
                for (i = 0; i < articles.length; i++) {
                        let article = document.createElement('article');
                        let heading = document.createElement('h2');
                        let link = document.createElement('a');
                        let img = document.createElement('img');
                        let para = document.createElement('p');
                        let clearfix = document.createElement('div');

                        let current = articles[i];
                        console.log('Currents', current);

                        link.href = current.web_url; //a href
                        link.textContent = current.headline.main;

                        para.textContent = 'Keywords: ';

                        for (let j = 0; j < current.keywords.length; j++) {
                                let span = document.createElement('span');

                                span.textContent += current.keywords[j].value + ' ';

                                para.appendChild(span);
                        }

                        if (current.multimedia.length > 0) {
                                img.src = 'https://nytimes.com/' + current.multimedia[0].url; //example <img src = 'https.mytimes.com/4397583

                                img.alt = current.headline.main;
                        }

                        clearfix.setAttribute('class', 'clearfix');

                        article.appendChild(heading); //adds h2 inside article tag
                        heading.appendChild(link); // adds anchors inside h2 tag
                        article.appendChild(img); //adds imgs inside article tag
                        article.appendChild(para); //adds p's inside article tag
                        article.appendChild(clearfix); // adds divs to article tags
                        section.appendChild(article); //adds articles to section tag
                } 
        }
}

function nextPage(e) {
        pageNumber++;
        fetchResults(e);
        console.log('Page:', pageNumber);
} //5
function previousPage(e) {
        if (pageNumber > 0){
                pageNumber--;
        } else {
                return;
        }
        fetchResults(e);
        console.log('Page:', pageNumber );
        
} //5

function Pages(e) {
        fetchResults(e);
        if (pageNumber == 0) {
                displayNav = false;
        }

        fetchResults(e);
        if (pageNumber < articles.length) {
                document.getElementsByClassName('next').style.display = 'none';
        } else {
                document.getElementsByClassName('next').style.display = 'block';
        } 
}
