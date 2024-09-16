// Canvas and graphics context

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
var audio = new Audio('../audio/Nighthawk22 - Isolation (LIMBO Remix) - Sped up.mp3');
cnv.width = 640;
cnv.height = 480;
ctx.font = "30px Roboto";
ctx.textAlign = "center";
const keyImg = document.getElementById("keyImg");
const greenKey = document.getElementById("greenKey");
const keySpeed = 2;
let keyHighlight;
let pickTime;
let timer;
let pickStatus;
let restartable;
let mouse = {
    x: 0,
    y: 0
}
let keys = [{}, {}, {}, {}, {}, {}, {}, {}];
let firstTime = true;
for (let i = 0; i < 8; i++) {
    keys[i].x = 235 + i % 2 * 100;
    keys[i].y = 55 + Math.floor(i / 2) * 100;
    keys[i].pos = i;
    keys[i].correct = false;
}

//added texts and audio here (KairuXD)

window.addEventListener("load", draw)
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    if (firstTime) {
        ctx.fillStyle = "gray";
        ctx.fillRect(240, 208, 160, 64);
        ctx.fillStyle = "white";
        ctx.fillText("START", 320, 250)
    } else {
        for (let i = 0; i < 8; i++) {
            ctx.drawImage(keyImg, keys[i].x, keys[i].y, 64, 64)
            if (keyHighlight && keys[i].correct) {
                audio.currentTime = 167;
                audio.play();
                ctx.drawImage(greenKey, keys[i].x, keys[i].y, 64, 64)
                ctx.fillStyle = "white";
                ctx.fillText("PICK THE FLASHING KEY! FOCUS!", 320, 450);
            }
        }
        if (pickTime) {
            ctx.fillStyle = "white";
            ctx.fillText("CHOOSE THE RIGHT KEY...", 320, 450);
            ctx.fillText(timer, 320, 240);
        }
        if (timer === 0) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, cnv.width, cnv.height);
            ctx.fillStyle = "white";
            ctx.fillText("PICK A KEY!", 320, 450);
        }
        if (pickStatus === 1) {
            ctx.fillStyle = "rgb(200, 0, 0)";
            ctx.fillRect(0, 0, cnv.width, cnv.height);
            ctx.fillStyle = "white";
            ctx.fillText("WRONG!", 320, 250);
        } else if (pickStatus === 2) {
            ctx.fillStyle = "rgb(0, 200, 0)";
            ctx.fillRect(0, 0, cnv.width, cnv.height);
            ctx.fillStyle = "white";
            ctx.fillText("GG!", 320, 250);
        }
        if (restartable) {
            ctx.fillStyle = "gray";
            ctx.fillRect(240, 208, 160, 64);
            ctx.fillStyle = "white";
            ctx.fillText("RESTART", 320, 250)
        }
    }
    setTimeout(draw, 1);
}

function reset() {
    firstTime = false;
    keyHighlight = true;
    pickTime = false;
    timer = 5;
    pickStatus = 0;
    restartable = false;
    initKeys();
    start();
}

function initKeys() {
    for (let i = 0; i < 8; i++) {
        keys[i].x = 235 + i % 2 * 100;
        keys[i].y = 55 + Math.floor(i / 2) * 100;
        keys[i].pos = i;
        keys[i].correct = false;
    }
    let i = Math.floor(Math.random() * 7);
    keys[i].correct = true;
}

function start() {
    setTimeout(() => {
        keyHighlight = false;
    }, 250);
    setTimeout(() => {
        keyHighlight = true;
    }, 300);
    setTimeout(() => {
        keyHighlight = false;
    }, 500);
    setTimeout(() => {
        keyHighlight = true;
    }, 550);
    setTimeout(() => {
        keyHighlight = false;
    }, 700);
    setTimeout(() => {
        for (let i = 0; i < 26; i++) {
            setTimeout(choose, i * (250));
        }
    }, 1000);
    setTimeout(() => {
        pickTime = true;
    }, 8800);
    setTimeout(() => {
        timer--;
    }, 9800);
    setTimeout(() => {
        timer--;
    }, 10800);
    setTimeout(() => {
        timer--;
    }, 11800);
    setTimeout(() => {
        timer--;
    }, 12800);
    setTimeout(() => {
        timer--;
        restartable = true;
    }, 13800);
}

function choose() {
    let randNum = Math.floor(Math.random() * 6);
    for (let i = 0; i < 8; i++) {
        let rightSide = 0;
        if (keys[i].x >= 320) {
            rightSide = 1;
        }
        if (keys[i].y < 137) {
            keys[i].pos = 0 + rightSide;
        } else if (keys[i].y < 237) {
            keys[i].pos = 2 + rightSide;
        } else if (keys[i].y < 337) {
            keys[i].pos = 4 + rightSide;
        } else {
            keys[i].pos = 6 + rightSide;
        }
        keys[i].x = 235 + keys[i].pos % 2 * 100;
        keys[i].y = 55 + Math.floor(keys[i].pos / 2) * 100;
    }
    if (randNum === 0) {
        console.log("Diagonal Swap");
        for (let i = 0; i < 50; i++) {
            setTimeout(diagonalSwap, 5 * i);
        }
    } else if (randNum === 1) {
        console.log("Big Rotation");
        for (let i = 0; i < 50; i++) {
            setTimeout(bigRotation, 5 * i);
        }
    } else if (randNum === 2) {
        console.log("Small Rotation");
        for (let i = 0; i < 50; i++) {
            setTimeout(smallRotation, 5 * i);
        }
    } else if (randNum === 3) {
        console.log("Swap");
        for (let i = 0; i < 50; i++) {
            setTimeout(swap, 5 * i);
        }
    } else if (randNum === 4) {
        console.log("Shuffle");
        for (let i = 0; i < 50; i++) {
            setTimeout(shuffle, 5 * i);
        }
    } else {
        console.log("Top Swap");
        for (let i = 0; i < 50; i++) {
            setTimeout(topSwap, 5 * i);
        }
    }
}

function diagonalSwap() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos % 2 === 0) {
            keys[i].x += keySpeed;
        } else {
            keys[i].x -= keySpeed;
        }
        if (Math.floor(keys[i].pos / 2) % 2 === 0) {
            keys[i].y += keySpeed;
        } else {
            keys[i].y -= keySpeed;
        }
    }
}

function bigRotation() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos === 0) {
            keys[i].x += keySpeed;
        } else if (keys[i].pos === 7) {
            keys[i].x -= keySpeed;
        } else if (keys[i].pos % 2) {
            keys[i].y += keySpeed;
        } else {
            keys[i].y -= keySpeed;
        }
    }
}

function smallRotation() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos % 4 === 0) {
            keys[i].x += keySpeed;
        } else if (keys[i].pos % 4 === 1) {
            keys[i].y += keySpeed;
        } else if (keys[i].pos % 4 === 2) {
            keys[i].y -= keySpeed;
        } else {
            keys[i].x -= keySpeed;
        }
    }
}

function swap() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos % 2 === 0) {
            keys[i].x += keySpeed;
        } else {
            keys[i].x -= keySpeed;
        }
    }
}

function shuffle() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos % 2 === 0 && keys[i].pos !== 0) {
            keys[i].x += keySpeed;
            keys[i].y -= keySpeed;
        } else if (keys[i].pos === 1 || keys[i].pos === 3) {
            keys[i].x -= keySpeed;
            keys[i].y += keySpeed;
        } else if (keys[i].pos === 5) {
            keys[i].y += keySpeed;
        } else if (keys[i].pos === 7) {
            keys[i].x -= keySpeed;
        }
    }
}

function topSwap() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos === 6 || keys[i].pos === 7) {
            keys[i].y -= keySpeed * 3;
        } else {
            keys[i].y += keySpeed;
        }
    }
}

document.addEventListener("mousemove", mousemoveHandler);
function mousemoveHandler(event) {
    // Get rectangle info about canvas location
    let cnvRect = cnv.getBoundingClientRect(); 

    // Calc mouse coordinates using mouse event and canvas location info
    mouse.x = Math.round(event.clientX - cnvRect.left);
    mouse.y = Math.round(event.clientY - cnvRect.top);
}

document.addEventListener("click", clickHandler)
function clickHandler() {
    if (firstTime &&
        mouse.x >= 240 &&
        mouse.x <= 400 &&
        mouse.y >= 208 &&
        mouse.y <= 272) {
            reset();
    } else if (pickTime && timer) {
        if (mouse.x >= keys.find(k => k.correct).x &&
            mouse.x <= keys.find(k => k.correct).x + 64 &&
            mouse.y >= keys.find(k => k.correct).y &&
            mouse.y <= keys.find(k => k.correct).y + 64) {
                pickTime = false;
                pickStatus = 2;
        } else {
            for (let i = 0; i < 8; i++) {
                if (mouse.x >= keys[i].x &&
                    mouse.x <= keys[i].x + 64 &&
                    mouse.y >= keys[i].y &&
                    mouse.y <= keys[i].y + 64) {
                        pickTime = false;
                        pickStatus = 1;
                }
            }
        }
    } else if (restartable &&
        mouse.x >= 240 &&
        mouse.x <= 400 &&
        mouse.y >= 208 &&
        mouse.y <= 272) {
            reset();
    }
}