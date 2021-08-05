// initial Data
let frame = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
};

let turn = '';
let warning = '';
let playing = false;

reset();

//events

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});


//funtions

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    
    if (playing && frame[item] === '') {
        frame[item] = turn;
        renderFrame();
        toggleTurn();
    }
}


function reset(){
    warning ='';

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        turn = 'X'
    }else{
        turn = 'O';
    }

    for (let i in frame) {
        frame[i] = '';
    }

    playing = true;

    renderFrame();
    renderInformation();
}



function renderFrame(){
    for(let i in frame){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = frame[i];
    }

    checkGame();
}

function renderInformation(){
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}

function toggleTurn(){
    if (turn === 'X') {
        turn = 'O';
    }else{
        turn = 'X';
    }

    renderInformation();
}

function checkGame(){
    if (checkWinnerFor('X')) {
        warning = 'O Jogador "X" venceu :)';
        playing = false;
    }else if(checkWinnerFor('O')){
        warning = 'O jogador "O" venceu :)';
        playing = false;
    }else if(isFull()){
        warning = 'O jogo Empatou :(';
        playing = false;
    }
}

function checkWinnerFor(turn){
    let pos = [
        'a1,a2,a3',/*Vitoria na horizontal*/
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',/*Vitoria na vertical */
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',/**Vitoria transversal */
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(','); // a1, a2, a3

      let hasWon = pArray.every(option=>frame[option] === turn);
      if (hasWon) {
          return true;
      }
    
    }

    return false;

}

function isFull(){
    for(let i in frame){
        if (frame[i] === '') {
            return false;
        }
    }

    return true;

}