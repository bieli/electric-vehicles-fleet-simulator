const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = window.innerHeight;

const ratio = window.devicePixelRatio || 1;
let width = canvas.width;
let height = canvas.height;

canvas.width *= ratio;
canvas.height *= ratio;

// 2. Force it to display at the original (logical) size with CSS or style attributes
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'

ctx.scale(ratio, ratio)

function isCollide(a, b) {
    return !(
        a.y + a.height < b.y ||
        a.y > b.y + b.height ||
        a.x + a.width < b.x ||
        a.x > b.x + b.width
    );
}

const ww = height - 150;

const carsRows = 1;
const carsCols = 5;

const hh = height - carsRows * 110;

const fleet = new Fleet(0, 300, hh, 110, carsRows, carsCols, true);
const controls = fleet.controls;
const cars = [...fleet.create()][0];

const stations = [
    new Station(100, ww / 4, 100, 100),
    new Station(canvas.width / 2, ww / 2 + 100, 100, 100),
    new Station(canvas.width - 100, ww, 100, 100),
];

function doCheckCollide(car, stations) {
    for (let s = 0; s < stations.length; s++) {
        if (isCollide(stations[s], car)) {
            stations[s].used(true, car.id, s);
            car.charging();
            return;
        }
    }

    car.discharge();
}

function showHeader(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.font = "32px serif";
    ctx.fillStyle = "white";
    ctx.fillText("..:: Electric vehicles fleet simulator ::..", 270, 30);

    ctx.font = "22px serif";
    ctx.fillText(
        "https://github.com/bieli/electric-vehicles-fleet-simulator",
        250,
        83,
    );

    ctx.font = "22px serif";
    ctx.fillStyle = "lightgray";
    ctx.fillText(
        "Controls: + / - vehicle selection | arrows for selected vehicle traction",
        210,
        60,
    );

    ctx.lineWidth = 2;
    ctx.setLineDash([0, 0]);
    ctx.strokeStyle = "lightgray";
    ctx.beginPath();
    ctx.moveTo(5, 95);
    ctx.lineTo(1000, 95);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.setLineDash([0, 0]);
    ctx.strokeStyle = "lightgray";
    ctx.beginPath();
    ctx.moveTo(5, 40);
    ctx.lineTo(1000, 40);
    ctx.stroke();

    ctx.restore();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function moveRandom(controls) {
    const enableSimulation = canvas.getAttribute("enableSimulation");
    if (enableSimulation == "1") {
        const moveDir = getRandomInt(113);
        if (moveDir == 0) {
            controls.moveForward();
        } else if (moveDir == 1) {
            controls.moveRight();
        } else if (moveDir == 2) {
            controls.moveLeft();
        }
    } else {
        //controls.stop();
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    stations.forEach((station) => {
        station.draw(ctx);
    });
    for (let i = 0; i < cars.length; i++) {
        moveRandom(controls);
        //controls.moveForward();
        cars[i].update(i);
        cars[i].draw(ctx, true);
    }

    for (let c = 0; c < cars.length; c++) { //fixme move to controller
        let car = cars[c];
        doCheckCollide(car, stations);
    }

    showHeader(ctx);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
