const graphDiv = document.querySelector('#graphDiv');
graphDiv.innerHTML = '';

function drawGrid(gridNumber = 16){

    const gridSide = `${500/gridNumber}`;

    for (let i = 0; i < gridNumber ** 2; i++) {
        
        let gridDiv = document.createElement('div');
        gridDiv.classList.add('gridDiv');
        gridDiv.style.cssText = `width: ${gridSide}px; 
                                    height: ${gridSide}px;`;
        
        graphDiv.appendChild(gridDiv);
    }
}


function fillBlack(event) {
    
    const gridDiv = event.target;

    let hoverCount = parseInt(gridDiv.getAttribute('data-hover-count')) || 0;
    hoverCount++;

    gridDiv.setAttribute('data-hover-count', hoverCount);

    gridDiv.style.backgroundColor = `rgba(0, 0, 0, ${Math.min(hoverCount * 0.2, 1)})`;
}


function getRandomNumber(){
    return Math.floor(Math.random() * 256);
}


function fillRandomColor(event){

    const gridDiv = event.target;

    gridDiv.style.backgroundColor = `rgb( ${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}


function fillChosenColor(event){
    const gridDiv = event.target;
    gridDiv.style.backgroundColor = chosenColor;
}


function fillWhite(event) {

    const gridDiv = event.target;
    gridDiv.style.backgroundColor = 'antiquewhite';
}


function clearAll() {
    
    const gridDivs = document.querySelectorAll('.gridDiv');

    gridDivs.forEach(gridDiv => {
        
        gridDiv.style.backgroundColor = 'antiquewhite';
    });
}


function attachMouseHover(fill){

    const gridDivs = document.querySelectorAll('.gridDiv');

    gridDivs.forEach(gridDiv => {

        gridDiv.removeEventListener('mouseover', fillBlack);
        gridDiv.removeEventListener('mouseover', fillRandomColor);
        gridDiv.removeEventListener('mouseover', fillChosenColor);
        gridDiv.addEventListener('mouseover', fill);
    });
}

drawGrid();

attachMouseHover(fillBlack);

document.querySelector('#changeGrid').addEventListener('click', () => {

    let userInput;

    do {

        userInput = prompt("Please enter a grid size less than 100");
        userInput = parseInt(userInput);
        console.log(`User grid size: ${userInput}`);
        
    } while ( isNaN(userInput) || userInput > 100 || userInput <= 0);

    graphDiv.innerHTML = '';

    drawGrid(userInput);
    attachMouseHover(fillBlack);
})

document.querySelector('#erase').addEventListener('click', () => {
    attachMouseHover(fillWhite);
})

document.querySelector('#clearAll').addEventListener('click', clearAll);

document.querySelector('#randomColor').addEventListener('click', () => attachMouseHover(fillRandomColor));

document.querySelector('#default').addEventListener('click', () => {
    attachMouseHover(fillBlack);
});

document.querySelector('#chooseColor').addEventListener('click', () => {

    const colorPicker = document.querySelector('#colorPicker');
    colorPicker.click();
})

let chosenColor = '#000000';

document.querySelector('#colorPicker').addEventListener('input', (event) => {

    chosenColor = event.target.value;
    attachMouseHover(fillChosenColor);
})