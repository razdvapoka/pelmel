# pelmel

Completely useless.

Once launched it randomly rotates and rescales elements of your webpage while also changing their background color. Firefox cannot handle this and hangs almost immediately. Chrome and Safari seem to do better.


## how to use

The module exports 2 functions: `go` and `stop`.

The `go` function accepts a bunch of options as an object.

Here they are:

```javascript
{
  intervalMS = 2000, // time between iterations
  showStopButton = true, // if true shows a tiny 'stop' button in the top-right corner
  stopButtonStyle = '<semicolon-separated css-attributes>', // the button's style is customizable
  maxDeg = 5, // maximum degree of rotation
  isAlternating = true, // if true alternates between clockwise and counterclockwise rotation
  maxScale = 0.1, // maximum scale coefficient
  isRescaling = true, // false disables rescaling
  isBgChanging = true, // false disables background color changing
  selector = '*', // defines which elements of your page to transform
  durationMS = '1000', // how long the transformation takes
  easing = 'ease' // what is the transformation's easing function
}
```

The `stop` function unsurprisingly stops the pellmelling.

## why pelmel

All the **chaos**- and **mess**-based words are already taken on NPM. The Merriam-Webster's thesaurus mentioned **pell-mell** as a  synonym of chaotic. I thought: that would do! But then I discovered that **pellmell** is taken on NPM too. So I had to go with **pelmel**.
