'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var handler = null;
var stopButton = null;

var DEFAULT_STOP_BUTTON_STYLE = '\n  position: fixed;\n  right: 10px;\n  top: 10px;\n  width: 60px;\n  height: 30px;\n  font-size: 14px;\n  color: black;\n  background-color: white;\n  cursor: pointer;\n  border: 2px solid black;\n';

var randomSign = function randomSign() {
  return Math.random() > 0.5 ? 1 : -1;
};
var randomInt = function randomInt(max) {
  return Math.round(Math.random() * max);
};
var randomScale = function randomScale(maxScale) {
  return 1 + randomSign() * Math.random() * maxScale;
};
var randomColor = function randomColor() {
  return 'rgb(' + randomInt(255) + ',' + randomInt(255) + ',' + randomInt(255) + ')';
};

var pelmel = function pelmel(_ref) {
  var _ref$maxDeg = _ref.maxDeg,
      maxDeg = _ref$maxDeg === undefined ? 5 : _ref$maxDeg,
      _ref$isAlternating = _ref.isAlternating,
      isAlternating = _ref$isAlternating === undefined ? true : _ref$isAlternating,
      _ref$maxScale = _ref.maxScale,
      maxScale = _ref$maxScale === undefined ? 0.1 : _ref$maxScale,
      _ref$isRescaling = _ref.isRescaling,
      isRescaling = _ref$isRescaling === undefined ? true : _ref$isRescaling,
      _ref$isBgChanging = _ref.isBgChanging,
      isBgChanging = _ref$isBgChanging === undefined ? true : _ref$isBgChanging,
      _ref$selector = _ref.selector,
      selector = _ref$selector === undefined ? '*' : _ref$selector,
      _ref$durationMS = _ref.durationMS,
      durationMS = _ref$durationMS === undefined ? '1000' : _ref$durationMS,
      _ref$easing = _ref.easing,
      easing = _ref$easing === undefined ? 'ease' : _ref$easing;
  return document.querySelectorAll(selector).forEach(function (el) {
    if (el !== stopButton) {
      var deg = randomInt(maxDeg);
      var degSign = isAlternating ? randomSign() : 1;
      var rotatingTransform = 'rotate(' + degSign * deg + 'deg)';

      var xScale = randomScale(maxScale);
      var yScale = randomScale(maxScale);
      var rescalingTransform = isRescaling ? 'scale(' + xScale + ', ' + yScale + ')' : '';

      el.style.transition = 'all ' + durationMS + 'ms ' + easing;

      if (el !== document.body && el !== document.documentElement) {
        el.style.transform = [rotatingTransform, rescalingTransform].join(' ');
      }

      if (isBgChanging) {
        el.style.backgroundColor = randomColor();
      }
    }
  });
};

var stop = function stop() {
  clearTimeout(handler);
  if (stopButton) {
    stopButton.remove();
    stopButton = null;
  }
};

var addStopButton = function addStopButton(style) {
  stopButton = document.createElement('button');
  stopButton.style = style;
  stopButton.textContent = 'STOP!';
  stopButton.addEventListener('click', stop);
  document.body.append(stopButton);
};

var go = function go(options) {
  var _options$intervalMS = options.intervalMS,
      intervalMS = _options$intervalMS === undefined ? 2000 : _options$intervalMS,
      _options$showStopButt = options.showStopButton,
      showStopButton = _options$showStopButt === undefined ? true : _options$showStopButt,
      _options$stopButtonSt = options.stopButtonStyle,
      stopButtonStyle = _options$stopButtonSt === undefined ? DEFAULT_STOP_BUTTON_STYLE : _options$stopButtonSt,
      rest = _objectWithoutProperties(options, ['intervalMS', 'showStopButton', 'stopButtonStyle']);

  if (showStopButton && !stopButton) {
    addStopButton(stopButtonStyle);
  }
  pelmel(rest);
  handler = setTimeout(function () {
    return go(options);
  }, intervalMS);
};

exports.default = {
  go: go,
  stop: stop
};