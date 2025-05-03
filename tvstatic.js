/**
 * Generate TV static in a canvas element with random colors
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 2/9/2013
 * Modified: [Current Date]
 * License: MIT
 */
(function() {
  var buffercanvas = document.createElement('canvas');
  var bufferctx = buffercanvas.getContext('2d');
  var WIDTH = 100;
  var HEIGHT = 100;
  buffercanvas.width = WIDTH;
  buffercanvas.height = HEIGHT;

  function rand(num) {
    return Math.floor(Math.random() * num);
  }

  function randomColor() {
    const r = rand(256);
    const g = rand(256);
    const b = rand(256);
    return `rgb(${r},${g},${b})`;
  }

  function tvstatic(canvas, ctx, scale) {
    scale = scale || 1;
    var h = canvas.height;
    var w = canvas.width;

    bufferctx.clearRect(0, 0, WIDTH, HEIGHT);
    // draw the static on the buffer canvas with random colors
    for (var x = 0; x < WIDTH; x+=scale) {
      for (var y = 0; y < HEIGHT; y+=scale) {
        if (Math.round(Math.random())) {
          bufferctx.fillStyle = randomColor();
          bufferctx.fillRect(x, y, scale, scale);
        }
      }
    }

    // repeat it onto the real canvas
    for (var x = 0; x < canvas.width; x += WIDTH) {
      for (var y = 0; y < canvas.height; y += HEIGHT) {
        ctx.drawImage(buffercanvas, x, y);
      }
    }

    // draw some horizontal lines on the real canvas
    ctx.fillStyle = '#000'; // Set line color to black
    for (var y = rand(10); y < canvas.height; y += rand(10)) {
      ctx.fillRect(0, y, canvas.width, rand(3));
    }
  }

  window.tvstatic = tvstatic;
})();
