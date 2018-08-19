let handler = null
let stopButton = null

const DEFAULT_STOP_BUTTON_STYLE = `
  position: fixed;
  right: 10px;
  top: 10px;
  width: 60px;
  height: 30px;
  font-size: 14px;
  color: black;
  background-color: white;
  cursor: pointer;
  border: 2px solid black;
`

const randomSign = () => Math.random() > 0.5 ? 1 : -1
const randomInt = max => Math.round(Math.random() * max)
const randomScale = maxScale => 1 + randomSign() * Math.random() * maxScale
const randomColor = () => `rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`

const pelmel = ({
  maxDeg = 5,
  isAlternating = true,
  maxScale = 0.1,
  isRescaling = true,
  isBgChanging = true,
  selector = '*',
  durationMS = '1000',
  easing = 'ease'
}) => document
  .querySelectorAll(selector)
  .forEach(el => {
    if (el !== stopButton) {
      const deg = randomInt(maxDeg)
      const degSign = isAlternating ? randomSign() : 1
      const rotatingTransform = `rotate(${degSign * deg}deg)`

      const xScale = randomScale(maxScale)
      const yScale = randomScale(maxScale)
      const rescalingTransform = isRescaling ? `scale(${xScale}, ${yScale})` : ''

      el.style.transition = `all ${durationMS}ms ${easing}`

      if (el !== document.body && el !== document.documentElement) {
        el.style.transform = [rotatingTransform, rescalingTransform].join(' ')
      }

      if (isBgChanging) {
        el.style.backgroundColor = randomColor()
      }
    }
  })

const stop = () => {
  clearTimeout(handler)
  if (stopButton) {
    stopButton.remove()
    stopButton = null
  }
}

const addStopButton = (style) => {
  stopButton = document.createElement('button')
  stopButton.style = style
  stopButton.textContent = 'STOP!'
  stopButton.addEventListener('click', stop)
  document.body.append(stopButton)
}

const go = (options) => {
  const {
    intervalMS = 2000,
    showStopButton = true,
    stopButtonStyle = DEFAULT_STOP_BUTTON_STYLE,
    ...rest
  } = options

  if (showStopButton && !stopButton) {
    addStopButton(stopButtonStyle)
  }
  pelmel(rest)
  handler = setTimeout(() => go(options), intervalMS)
}

export default {
  go: go,
  stop: stop
}
