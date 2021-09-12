const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const listTopTeam = [
    'Italia',
    'Spain',
    'England',
    'Cote d Ivoire',
    'Nigeria',
    'France',
    'Algeria',
    'Senegal',
    'Brazil',
    'Argentina',
];

const listItems = [];

let draggIndex;

createList();

function createList() {
    [...listTopTeam]
    .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((team, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${team}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });
}