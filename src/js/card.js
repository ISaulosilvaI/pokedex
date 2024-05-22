window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(response => response.json())
        .then(data => displayCard(data));

        var themeButton = document.getElementById('themeButton');
        themeButton.onclick = toggleTheme;
};

function toggleTheme() {
    document.body.classList.toggle('dark');
    var cards = document.getElementsByClassName('card-pokemon');
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.toggle('dark');
    }
}

function displayCard(data) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('image').src = data.sprites.front_default;
    document.getElementById('moves').textContent = 'MOVIMENTOS: ' + data.moves.map(move => move.move.name).join(', ');
    document.getElementById('types').textContent = 'TIPO: ' + data.types.map(type => type.type.name).join(', ');
    document.getElementById('abilities').textContent = 'HABILIDADES: ' + data.abilities.map(ability => ability.ability.name).join(', ');
}
