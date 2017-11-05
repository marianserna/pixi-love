import * as PIXI from 'pixi.js'

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xFF6600});

document.body.appendChild(app.view);
document.body.style.margin = 0;

var sprite = PIXI.Sprite.from('./assets/Can-9.png');

var target = new PIXI.Point();
app.stage.interactive = true;

app.stage.mousemove = (e) => {
  target.x = e.data.global.x;
  target.y = e.data.global.y;
}

var container = new PIXI.Container();
var cmFilter = new PIXI.filters.ColorMatrixFilter();
container.filters = [cmFilter];

app.stage.addChild(container);
var blobs = [];

for (var i = 0; i < 50; i++) {
  var blob = PIXI.Sprite.from('./assets/blob.png');
  blobs.push(blob);

  blob.anchor.set(0.5);
  blob.count = Math.random() * Math.PI * 2;
  container.addChild(blob);
}

var tick = 0;

app.ticker.add((dt) => {
  tick += 0.01;
  // container.position.x = target.x;
  // container.position.y = target.y;
  // sprite.rotation += 0.01
  for (var i = 0; i < blobs.length; i++) {
    var blob = blobs[i];
    blob.count += 0.1;

    blob.scale.set(Math.sin(blob.count * 0.5));
    blob.alpha = 0.9;

    if(blob.count > Math.PI * 2) {
      blob.count -= Math.PI * 2;

      var angle = Math.random() * Math.PI * 2;
      var distance = 100 + Math.random() * 100;

      blob.x = target.x + Math.sin(angle) * distance;
      blob.y = target.y + Math.cos(angle) * distance;
    }
  }
});

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
});
