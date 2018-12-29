module.exports = {
  ImageNoise: function(canvas) {
    canvas.addEventListener("mouseover", function() {
      over = true;
    });
    canvas.addEventListener("mouseout", function() {
      over = false;
    });

    function init() {
      window.requestAnimationFrame(draw);
    }
    var over = false;
    var timeOffset = 0.005;
    var time = 0;
    var src = canvas.getAttribute("image");
    function draw() {
      var SMOOTHNESS = 15,
        INTENSITY = 9,
        SIZE = 22,
        CENTER = canvas.height / 2,
        INITIALSPEED = 0.005,
        MAXSPEED = 0.015,
        timeSinus = 0;

      var now = Date.now();
      var SimplexNoise = require("simplex-noise"),
        simplex = new SimplexNoise(0.2);

      //console.log("dqsd");
      // Grab the Canvas and Drawing Context
      var ctx = canvas.getContext("2d");
      //ctx.clearRect(0, 0, 400, 400);
      //ctx.globalCompositeOperation = "destination-over";
      //
      //ctx.save();
      // Cate an image element
      var img = document.createElement("IMG");

      // When the image is loaded, draw it
      img.onload = function() {
        // Save the state, so we can undo the clipping
        //ctx.save();
        //test ?

        // Cate a shape, of some sort
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.beginPath();
        path = new Path2D();
        for (let index = 0; index <= 360; index++) {
          //ctx.lineTo((random + 1) * 200, index);
          random =
            simplex.noise2D(index / (SMOOTHNESS * 2), time / 4) * 3 +
            simplex.noise2D(index / (SMOOTHNESS / 4), time);
          if (index == 0) {
            path.moveTo(
              CENTER +
                (random + SIZE) * INTENSITY * Math.cos((index * Math.PI) / 180),
              CENTER +
                (random + SIZE) * INTENSITY * Math.sin((index * Math.PI) / 180)
            );
          }
          if (index >= 340) {
            random =
              simplex.noise2D((index - 360) / (SMOOTHNESS * 2), time / 4) *
                3 *
                (1 - (360 - index) / 20) +
              (simplex.noise2D(index / (SMOOTHNESS / 4), time) *
                (360 - index)) /
                20;
          }
          path.lineTo(
            CENTER +
              (random + SIZE) * INTENSITY * Math.cos((index * Math.PI) / 180),
            CENTER +
              (random + SIZE) * INTENSITY * Math.sin((index * Math.PI) / 180)
          );
        }
        path.closePath();

        ctx.save();
        ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
        ctx.scale(1.03, 1.03);
        ctx.translate(-canvas.width * 0.5 + 5, -canvas.height * 0.5 + 5);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill(path);
        ctx.restore();

        ctx.save();
        ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
        ctx.rotate(Math.PI);
        ctx.scale(1.06, 1.06);
        ctx.scale(1.03, 1.03);
        ctx.translate(-canvas.width * 0.5 - 5, -canvas.height * 0.5 - 5);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill(path);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
        ctx.rotate(Math.PI);
        ctx.scale(1.06, 1.06);
        ctx.translate(-canvas.width * 0.5, -canvas.height * 0.5);
        ctx.clip(path);
        ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
        ctx.rotate(Math.PI);
        ctx.translate(-canvas.width * 0.5, -canvas.height * 0.5);
        ctx.drawImage(img, 0, 0, 500, 500);

        ctx.restore();
        ctx.clip(path);
        ctx.drawImage(img, 0, 0, 500, 500);
        /*ctx.save();
        ctx.beginPath();
        ctx.rect(20, 20, 500, 500);
        ctx.fillStyle = "red";
        ctx.fillStyle = "red";
        ctx.fill();*/
        if (over && timeOffset < MAXSPEED) {
          timeOffset =
            Math.cos(timeSinus) * (MAXSPEED - INITIALSPEED) + INITIALSPEED;
          timeSinus++;
        } else if (!over && timeOffset > INITIALSPEED) {
          timeOffset =
            Math.sin(timeSinus) * (MAXSPEED - INITIALSPEED) + INITIALSPEED;
          timeSinus++;
        } else {
          timeSinus = 0;
        }
        time += timeOffset;
        ctx.restore();
        window.requestAnimationFrame(draw);
      };
      // Specify the src to load the image
      img.src = src;
    }
    init();
  }
};
