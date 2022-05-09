/* YOUR CODE HERE! */
const box = document.querySelector('.box');
let boxes = document.getElementsByClassName('box');
let num = parseInt(box.textContent);

let isDown = false;
let div_left = 0;
let div_right = 0;

let isChangedSize = false;

function downMouse(div) {
    div.addEventListener('mousedown', (ev) => {

        console.log('down');
        switch (ev.button) {
            case 0:
                if (ev.shiftKey) {
                    console.log('shift pressed');
                    if (isChangedSize) {
                        div.style.width = "150px";
                        div.style.height = "150px";
                        isChangedSize = false;
                    } else {
                        div.style.width = "200px";
                        div.style.height = "200px";
                        isChangedSize = true;
                    }
                }
                isDown = true;

                div_left = div.offsetLeft - ev.clientX;
                div_top = div.offsetTop - ev.clientY;
                break;
            case 2:
                var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                div.style.background = "#" + randomColor;
                break;
            default:
                console.log('Unknown code');
        }
    }, true);
}

function upMouse(div) {
    div.addEventListener('mouseup', (ev) => {

        console.log('up');
        if (ev.button === 0)
            isDown = false;
    }, true);
}

function mouseMove(div) {
    div.addEventListener('mousemove', (ev) => {

        console.log('move');
        if (ev.button === 0)
            if (isDown) {
                div.style.left = (ev.clientX + div_left) + 'px';
                div.style.top = (ev.clientY + div_top) + 'px';
            }
    }, true);
}

function clickDbld(div) {
    div.addEventListener('dblclick', (ev) => {
        if (ev.button == 0) {
            if (ev.altKey) {
                if (boxes.length > 1) {
                    console.log(div.textContent);
                    div.remove();
                    num--;
                }
            } else {
                num++;
                let clonedElem = div.cloneNode(true);
                let positionBox = div.getBoundingClientRect();

                clonedElem.style.left = positionBox.left + positionBox.width + 'px';
                clonedElem.style.top = positionBox.top + positionBox.height + 'px';
                clonedElem.className = "box";
                clonedElem.textContent = num;
                clonedElem.style.background = "#0000FF";
                clonedElem.style.width = "150px";
                clonedElem.style.height = "150px";

                let bodySelector = document.querySelector(".box-container");

                downMouse(clonedElem);
                upMouse(clonedElem);
                clickDbld(clonedElem);
                mouseMove(clonedElem);
                contexMenu(clonedElem);

                bodySelector.appendChild(clonedElem);
                boxes = document.getElementsByClassName('box');
            }
        }
    }, true);
}

function contexMenu(div) {
    div.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();
    }, true);
}

[...boxes].forEach((div) => { contexMenu(div); });

[...boxes].forEach((div) => { downMouse(div); });

[...boxes].forEach((div) => { upMouse(div); });

[...boxes].forEach((div) => { mouseMove(div); });

[...boxes].forEach((div) => { clickDbld(div); });