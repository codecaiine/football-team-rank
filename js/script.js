// eslint-disable-next-line camelcase
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const listTopTeam = [
  { name: 'Italia', flag: '../img/italie.png' },
  { name: 'France', flag: '../img/france.png' },
  { name: 'Portugual', flag: '../img/le-portugal.png' },
  { name: 'Belgium', flag: '../img/belgique.png' },
  { name: 'Cote d Ivoire', flag: '../img/cote-d-ivoire.png' },
  { name: 'Brazil', flag: '../img/bresil.png' },
  { name: 'Argentina', flag: '../img/argentine.png' },
  { name: 'Algeria', flag: '../img/algerie.png' },
  { name: 'Senegal', flag: '../img/senegal.png' },
  { name: 'Germany', flag: '../img/allemagne.png' },
];

const listItems = [];

let dragStartIndex;

function createList() {
  [...listTopTeam]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((team, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="team-name"><img src="${team.flag}" height="35" width="35" alt="${team.name}"> ${team.name}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const teamName = listItem.querySelector('.draggable').innerText.trim();

    if (teamName !== listTopTeam[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

createList();
addEventListeners();
check.addEventListener('click', checkOrder);