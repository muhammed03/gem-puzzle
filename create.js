const field = document.querySelector('.field');
let counts = document.querySelector('.counts')

function create() {
    const cellSize = 80;
    let counter = 0;

    const empty = {
        value: 0,
        top: 0,
        left: 0
    };

    const cells = [];
    cells.push(empty);

    function move(index) {
        const cell = cells[index];
        const leftDiff = Math.abs(empty.left - cell.left);
        const topDiff = Math.abs(empty.top - cell.top);

        if (leftDiff + topDiff > 1) {
            return;
        }
        cell.element.style.left = `${empty.left * cellSize}px`
        cell.element.style.top = `${empty.top * cellSize}px`

        const emlptyLeft = empty.left;
        const emptyTop = empty.top;
        empty.left = cell.left;
        empty.top = cell.top;
        cell.left = emlptyLeft;
        cell.top = emptyTop;
        counter += 1;

        const audio = document.querySelector('audio');
        audio.currentTime = 0;
        audio.play();

        const isFinished = cells.every(cell => {
            return cell.value === (cell.top * 4 + cell.left);
        })

        if (isFinished) {
            modal.style.display = "block";
            document.querySelector('.modal-content-text').innerHTML = `Ура! Вы решили головоломку за ${displayMinutes}:${displaySeconds} и ${counter} ходов`;
            startStop();
            counter = 0;
        }
    }

    const nubmers = [...Array(15).keys()]
      .sort(() => Math.random() - 0.5)
    


    for (let i = 1; i <= 15; i++) {
        const cell = document.createElement('div');
        const value = nubmers[i - 1] + 1;
        cell.className = 'cell';
        cell.innerHTML = value;
        const left = i % 4;
        const top = (i - left) / 4;       
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell
        })

        cell.style.left = `${left * cellSize}px`
        cell.style.top = `${top * cellSize}px`

        field.append(cell)
        
        cell.addEventListener('click', () => {
            move(i);

            counts.innerHTML = `Move: ${counter}`;
        })
    }
}

function refresh() {
    field.innerHTML = '';
}


let seconds = 0;
let minutes = 0;


let displaySeconds = 0;
let displayMinutes = 0;

let interval = null;


function stopWatch() {

    seconds++;

    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;
    }

    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    document.getElementById("display").innerHTML = displayMinutes + ":" + displaySeconds;

}
let status = "stopped";

function startStop() {
    if (status === "stopped") {
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Сбросить";
        status = "started";
        create();
    }
    else {
        window.clearInterval(interval);
        seconds = 0;
        minutes = 0;
        document.getElementById("display").innerHTML = "00:00";
        document.getElementById("startStop").innerHTML = "Играть";
        status = "stopped";
        refresh();
        counter = 0;
        counts.innerHTML = `Move: 0`;
    }

}


var modal = document.getElementById('myModal');




var span = document.getElementsByClassName("close")[0];




span.onclick = function () {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var moodal = document.getElementById('myMoodal');


var btn = document.getElementById("myBtn");


var spann = document.getElementsByClassName("cloose")[0];


btn.onclick = function () {
    moodal.style.display = "block";
}


spann.onclick = function () {
    moodal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == moodal) {
        moodal.style.display = "none";
    }
}