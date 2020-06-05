'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_SIZE = 16;
var GRAPH_TOP_GAP = CLOUD_Y + GAP * 5 + FONT_SIZE * 2;
var GRAPH_LEFT_GAP = CLOUD_X + GAP * 4;
var BAR_WIDTH = 40;
var BAR_GAP = 50; // Отступ между столлбцами
var MAX_BAR_HEIGHT = CLOUD_HEIGHT - GAP * 9 - FONT_SIZE * 4; // Высота самого высокого столбца

var renderCloud = function (ctx, x, y, color, isStroke) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  if (isStroke) {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomColor = function () {
  var saturation = Math.floor(Math.random() * 101) + '%';
  var color = 'hsl(240, ' + saturation + ', 50%)';
  return color;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', true);

  ctx.fillStyle = '#000';
  ctx.font = FONT_SIZE + 'px' + ' "PT Mono"';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + FONT_SIZE + GAP * 3);

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < players.length; i++) {
    var currentBarHeight = MAX_BAR_HEIGHT * Math.round(times[i]) / maxTime;
    var currentBarLack = MAX_BAR_HEIGHT - currentBarHeight;

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomColor();
    }

    ctx.fillRect(
        GRAPH_LEFT_GAP + (BAR_WIDTH + BAR_GAP) * i,
        GRAPH_TOP_GAP + FONT_SIZE + GAP + currentBarLack,
        BAR_WIDTH,
        currentBarHeight
    );

    ctx.fillStyle = '#000';

    ctx.fillText(Math.round(times[i]),
        GRAPH_LEFT_GAP + (BAR_WIDTH + BAR_GAP) * i,
        GRAPH_TOP_GAP + currentBarLack
    );

    ctx.fillText(players[i],
        GRAPH_LEFT_GAP + (BAR_WIDTH + BAR_GAP) * i,
        GRAPH_TOP_GAP + GAP * 2 + FONT_SIZE + MAX_BAR_HEIGHT
    );
  }
};
