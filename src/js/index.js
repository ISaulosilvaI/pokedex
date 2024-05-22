var cardCount = 0;
var types = [];

window.onload = function() {
    loadCards();
    loadTypes();

    var loadMoreButton = document.getElementById('loadMore');
    loadMoreButton.onclick = loadMoreCards;

    var resetButton = document.getElementById('resetButton');
    resetButton.onclick = function() {
        location.reload();
    };

    var themeButton = document.getElementById('themeButton');
    themeButton.onclick = toggleTheme;
};

function toggleTheme() {
    document.body.classList.toggle('dark');
}

async function loadCards() {
    let cardContainer = document.getElementById('cardContainer');

    for (let i = 1; i <= 10; i++) {
        cardCount++;
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + cardCount);
        const data = await response.json();
        createCard(data, cardContainer)
    }
}

async function loadTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json(); 
    types= data.results.map(results=> results.name)
    displayTypeButton();
}

function displayTypeButton() {
    let typeButtons = document.getElementById('typeButtons');

    types.forEach(type => {
        let button = document.createElement('button');
        button.textContent= type;
        button.className = type;
        button.onclick= function () {
            displayCards(type)
        }
        typeButtons.appendChild(button);
    });
}

async function displayCards(type) {
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const response = await fetch('https://pokeapi.co/api/v2/type/' + type);
    const data= await response.json();
    for (const pokemon of data.pokemon) {
        const response= await fetch(pokemon.pokemon.url);
        const data= await response.json();
        createCard(data, cardContainer)
        
    }
}

function loadMoreCards() {
    let cardContainer = document.getElementById('cardContainer');

    for(let i= 1; i <= 10; i++){
        cardCount++
        fetch('https://pokeapi.co/api/v2/pokemon/' + cardCount)
            .then(response=> response.json())
            .then(data=> createCard(data, cardContainer))
    }
}

function createCard(data, cardContainer) {
    let card = document.createElement('div');
    card.className = 'card';

    if (data.types.length === 1) {
        card.classList.add(data.types[0].type.name)
    }else{
        card.style.background= `
        linear-gradient(to right, 
            rgba(${getColor(data.types[0].type.name)}, 0.5) 30%, 
            rgba(${getColor(data.types[1].type.name)}, 0.5) 70%)`;
    }

    let img = document.createElement('img');
    img.src = data.sprites.front_default;
    card.appendChild(img);

    let title = document.createElement('h2');
    title.textContent = data.name;
    card.appendChild(title);

    card.onclick = function() {
        window.open('card.html?id=' + data.id, '_blank');
    };

    cardContainer.appendChild(card);
}

function getColor(type) {
    switch (type) {
        case 'normal':
            return '168, 167, 122';
        case 'fire':
            return '238, 129, 48';
        case 'water':
            return '99, 144, 240';
        case 'electric':
            return '247, 208, 44';
        case 'grass':
            return '122, 199, 76';
        case 'ice':
            return '150, 217, 214';
        case 'fighting':
            return '194, 46, 40';
        case 'poison':
            return '163, 62, 161';
        case 'ground':
            return '226, 191, 101';
        case 'flying':
            return '169, 143, 243';
        case 'psychic':
            return '249, 85, 135';
        case 'bug':
            return '166, 185, 26';
        case 'rock':
            return '182, 161, 54';
        case 'ghost':
            return '115, 87, 151';
        case 'dragon':
            return '111, 53, 252';
        case 'dark':
            return '112, 87, 70';
        case 'steel':
            return '183, 183, 206';
        case 'fairy':
            return '214, 133, 173';
        default:
            return '255, 255, 255';
    }
}