const ImageNoise = require("../_script/ImageNoise");

let canvas = document.querySelectorAll(".ImageNoise");

for (let index = 0; index < canvas.length; index++) {
  let IN = ImageNoise.ImageNoise(canvas[index]);
}
