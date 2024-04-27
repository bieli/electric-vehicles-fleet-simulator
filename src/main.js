const canvas = document.getElementById("myCanvas");
canvas.width = 1000;

const ctx = canvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

//console.log(w, h);

/*    
var img = new Image();
img.onload = function() {
    ctx.drawImage(img, 330, 330);
}
img.src = "http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg";


var c = document.getElementById('canvas');
ctx.drawSvg("http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg", 11, 11, 111, 111);
*/

//import { Canvg } from 'https://cdn.skypack.dev/canvg@^4.0.0';

/*
window.onload = () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const v = Canvg.fromString(ctx, '<svg width="600" height="600"><text x="50" y="50">Hello World!</text></svg>');

  // Start SVG rendering with animations and mouse handling.
  v.start();
};
*/

/*
let v = null;

window.onload = async () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  v = await Canvg.from(ctx, 'http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg');

  // Start SVG rendering with animations and mouse handling.
  v.start();
};

window.onbeforeunload = () => {
  v.stop();
};
*/
function isCollide(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}

const maxCars = 4;
const controls = new Controls(maxCars);

const ww = h - 150;
const hh = h - 100;

const cars = [
  new Car(0, 300, hh, 30, 50, 100, controls),
  new Car(1, 400, hh, 30, 50, 75, controls),
  new Car(2, 500, hh, 30, 50, 50, controls),
  new Car(3, 600, hh, 30, 50, 25, controls),
  new Car(4, 700, hh, 30, 50, 0, controls),
];

const stations = [
  new Station(100, ww / 4, 100, 100),
  new Station(canvas.width / 2, ww / 2, 100, 100),
  new Station(canvas.width - 100, ww, 100, 100),
];

//let animCnt = 0;
function animate() {
  canvas.height = window.innerHeight;

  let last_selected = 0;

  stations.forEach((station) => {
    station.draw(ctx);
  });
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(i);
    cars[i].draw(ctx, true);
  }

  for (let c = 0; c < cars.length; c++) {
    for (let s = 0; s < stations.length; s++) {
      if (isCollide(stations[s], cars[c])) {
        //console.log('COLLIDE !');
        stations[s].used(true, c, s);
        cars[c].charging(stations[s]);
      } else {
        cars[c].discharge();
      }
      //stations[s].draw(ctx);
    }
    //cars[c].draw(ctx, true);
    //cars[c].update(i);
  }

  ctx.save();
  ctx.beginPath();
  ctx.font = "32px serif";
  ctx.fillStyle = "white";
  ctx.fillText("..:: Electric vehicles fleet simulator ::..", 270, 30);
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
  ctx.moveTo(5, 80);
  ctx.lineTo(1000, 80);
  ctx.stroke();

  /*
const xx = 0;
const yy = 0;
    
// #path872
ctx.beginPath();
ctx.setLineDash([0,0]);
ctx.fillStyle = "white";
ctx.moveTo(xx, yy);
ctx.lineTo(24.000000, 0.000000);
ctx.lineTo(24.000000, 24.000000);
ctx.lineTo(0.000000, 24.000000);

ctx.moveTo(xx + 3.000000, yy + 19.000000);
ctx.lineTo(3.000000, 4.000000);
ctx.translate(4.000000, 4.000000);
ctx.rotate(0.000000);
ctx.scale(1.000000, 1.000000);
ctx.arc(0.000000, 0.000000, 1.000000, 3.141593, 4.71238898, 0);
ctx.scale(1.000000, 1.000000);
ctx.rotate(-0.000000);
ctx.translate(-4.000000, -4.000000);
ctx.lineTo(13.000000, 3.000000);
ctx.translate(13.000000, 4.000000);
ctx.rotate(0.000000);
ctx.scale(1.000000, 1.000000);
ctx.arc(0.000000, 0.000000, 1.000000, -1.570796, 0.00000000, 0);
ctx.scale(1.000000, 1.000000);
ctx.rotate(-0.000000);
ctx.translate(-13.000000, -4.000000);
ctx.lineTo(14.000000, 12.000000);
ctx.lineTo(16.000000, 12.000000);
ctx.translate(16.000000, 14.000000);
ctx.rotate(0.000000);
ctx.scale(1.000000, 1.000000);
ctx.arc(0.000000, 0.000000, 2.000000, -1.570796, 0.00000000, 0);
ctx.scale(1.000000, 1.000000);
ctx.rotate(-0.000000);
ctx.translate(-16.000000, -14.000000);
ctx.lineTo(18.000000, 18.000000);
ctx.translate(19.000000, 18.000000);
ctx.rotate(0.000000);
ctx.scale(1.000000, 1.000000);
ctx.arc(0.000000, 0.000000, 1.000000, 3.141593, 0.00000000, 1);
ctx.scale(1.000000, 1.000000);
ctx.rotate(-0.000000);
ctx.translate(-19.000000, -18.000000);
ctx.lineTo(20.000000, 11.000000);
ctx.lineTo(18.000000, 11.000000);
ctx.translate(18.000000, 10.000000);
ctx.rotate(0.000000);
ctx.scale(1.000000, 1.000000);
ctx.arc(0.000000, 0.000000, 1.000000, 1.570796, 3.14159265, 0);
ctx.scale(1.000000, 1.000000);
ctx.rotate(-0.000000);
ctx.translate(-18.000000, -10.000000);
ctx.lineTo(17.000000, 6.414000);
ctx.lineTo(15.343000, 4.757000);
ctx.lineTo(16.757000, 3.343000);
ctx.lineTo(21.707000, 8.293000);
ctx.translate(21.003001, 8.998970);
ctx.rotate(0.000000);
ctx.scale(1.000000, 1.000000);
ctx.arc(0.000000, 0.000000, 0.997000, -0.786796, 0.00103302, 0);
ctx.scale(1.000000, 1.000000);
ctx.rotate(-0.000000);
ctx.translate(-21.003001, -8.998970);
ctx.lineTo(22.000000, 18.000000);
ctx.translate(19.000000, 18.000000);
ctx.rotate(0.000000);
ctx.scale(1.000000, 1.000000);
ctx.arc(0.000000, 0.000000, 3.000000, 0.000000, 3.14159265, 0);
ctx.scale(1.000000, 1.000000);
ctx.rotate(-0.000000);
ctx.translate(-19.000000, -18.000000);
ctx.lineTo(16.000000, 14.000000);
ctx.lineTo(14.000000, 14.000000);
ctx.lineTo(14.000000, 19.000000);
ctx.lineTo(15.000000, 19.000000);
ctx.lineTo(15.000000, 21.000000);
ctx.lineTo(2.000000, 21.000000);
ctx.lineTo(2.000000, 19.000000);
ctx.lineTo(3.000000, 19.000000);
ctx.moveTo(9.000000, 11.000000);
ctx.lineTo(9.000000, 7.000000);
ctx.lineTo(5.000000, 13.000000);
ctx.lineTo(8.000000, 13.000000);
ctx.lineTo(8.000000, 17.000000);
ctx.lineTo(12.000000, 11.000000);
ctx.lineTo(9.000000, 11.000000);
ctx.stroke()
*/

  ctx.restore();

  //if ((animCnt % 1000) == 0) {
  //    console.log(animCnt);
  //}
  //animCnt++;
  requestAnimationFrame(animate);
}

animate();
