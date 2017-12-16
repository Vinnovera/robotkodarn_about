const html = require('choo/html')
const { modifiers } = require('../utils')

module.exports = pattern

/*
 * Pattern is created by Nicky Knicky and is published under CC license by
 * the Noun project. It is found here:
 * https://thenounproject.com/term/bowie/871160/
 */
function pattern (color, loading = false) {
  return html`
    <svg class="${modifiers('Pattern', { [color]: true, loading: loading })}" viewBox="0 0 730 620" preserveAspectRatio="xMidYMid slice">
    <defs>
      <symbol id="bow" viewBox="0 0 48 148" >
        <path d="M25.5 148c-3 0-5-1-7-4-49.3-89.7 16-141 16-142 3-3.2 8.3-2 11.4 1 3 3 2 8.2-1 10.2-2 2-55.4 44.3-12.5 121.4 2 4 1 8.2-3 10.3-2 2-3.2 3-4.2 3z" fill="currentColor"/>
      </symbol>
      <symbol id="line" viewBox="0 0 84 174" >
        <path d="M8 173.8c-1 0-2 0-3-1-4-2-6-6.2-4-10.3L68.2 5c2-4 6.2-6 10.3-4 4 2 6 6.2 4 10.3L15.2 168.7c-2 3-4 5-7 5z" fill="currentColor"/>
      </symbol>
      <symbol id="dot" viewBox="0 0 19 20" >
        <path d="M9.3 19.3c-5 0-9.2-4-9.2-9.2C0 5 4.3 1 9.4 1c5 0 9.2 4 9.2 9.3 0 5.2-4 9.3-9.2 9.3z" fill-rule="nonzero" fill="currentColor"/>
      </symbol>
      <symbol id="ring" viewBox="0 0 77 77">
        <path d="M38.4 76.4C18 76.4.6 59 .6 38.4.6 17.7 18 .4 38.4.4s37.8 17.3 37.8 38c0 20.4-16.4 38-37.8 38zm0-60.7C26 15.7 16 26 16 38.3 16 50.7 26 61 38.3 61c12.2 0 22.4-10.3 22.4-22.7 0-12.3-10.2-22.6-22.4-22.6z" fill="currentColor"/>
      </symbol>
      <symbol id="triangle" viewBox="0 0 105 119" >
        <path d="M15.2 118.4c-1 0-2 0-3-1-2-1-4-4.2-4-6.2L.8 8.2c0-3 1-5 4-7 2-1 5-1 8.2 0L100 55.6c2 1 4 4 4 6 0 3.2-1 5.3-4 6.3l-79.7 48.3c-3 1-4 2-5 2zm1-95.7l5.2 75L79.6 63 16.3 22.6z" fill-rule="nonzero" fill="currentColor"/>
      </symbol>
      <symbol id="flash" viewBox="0 0 106 127">
        <path d="M97.5 126.6c-1 0-3 0-4-1l-49-31c-2-2-4.2-4-3-7 0-3.2 2-5.3 5-6.3l12.2-4L24 54.5c-2-2-4-4.2-3-7.2 0-3 2-5.2 5-6.2l12.3-4L3.6 14.6c-3-2-5-7.2-2-10.3 2-4 7-5 10-2L61 33c2 2 4 4 3 7.2-1 3-2 5-5 6l-12.3 4.2L81.2 73c2 2 4 4.2 3 7.3 0 3-2 5-5 6L67 90.7l34.6 22.6c3 2 5 7.2 2 10.3-1 2-3 3-6 3z" fill="currentColor"/>
      </symbol>
      <symbol id="cross" viewBox="0 0 100 100" >
        <path d="M8.5 81.6c-3 0-5-1-7.2-4-2-4.2-1-8.3 3-10.4l84-48.3c4-2.5 8-1 10 3s1 8-3 10L11.6 80.6c-1 1-2 1-3 1z" fill="currentColor"/>
        <path d="M75 99c-3.2 0-5.2-1-7.3-4l-48-83.3c-2-4-1-8.2 3-10.3 4.2-2 8.3-1 10.3 3L81 89c2 4 1 8.3-3 10.3h-3z" fill="currentColor"/>
      </symbol>
      <symbol id="curve" viewBox="0 0 63 114">
        <path d="M8 113.5c-4.2 0-7.3-3-7.3-7.2 0-4 3-8.2 7.2-8.2 20-1 36.3-16 39.3-37 3-20.3-9.2-40-28.6-46-4-1-6-5.2-5-9.3 1-4 6-6 9-5 26.7 8 43 35 39 62.6-4 28-26.6 49.5-54 50.5z" fill="currentColor"/>
      </symbol>
    </defs>
    <use xlink:href="#flash" x="-200" y="-70" height="15%" class="Pattern-flash1"/>
    <use xlink:href="#flash" x="-32" y="450" height="15%" class="Pattern-flash2"/>

    <use xlink:href="#ring" x="-245" y="149" height="9%" class="Pattern-ring1"/>
    <use xlink:href="#ring" x="228" y="270" height="9%" class="Pattern-ring2"/>
    <use xlink:href="#ring" x="60" y="65" height="9%" class="Pattern-ring3"/>
    <use xlink:href="#ring" x="363" y="590" height="9%" class="Pattern-ring4"/>
    <use xlink:href="#ring" x="-360" y="590" height="9%" class="Pattern-ring5"/>

    <use xlink:href="#cross" x="-70" y="435" height="12%" class="Pattern-cross1"/>
    <use xlink:href="#cross" x="228" y="270" height="12%" class="Pattern-cross2"/>
    <use xlink:href="#cross" x="60" y="65" height="12%" class="Pattern-cross3"/>
    <use xlink:href="#cross" x="225" y="125" height="12%" class="Pattern-cross4"/>

    <use xlink:href="#dot" x="67" y="439" height="2.5%" class="Pattern-dot1"/>
    <use xlink:href="#dot" x="-150" y="505" height="2.5%" class="Pattern-dot2"/>
    <use xlink:href="#dot" x="-295" y="570" height="2.5%" class="Pattern-dot3"/>
    <use xlink:href="#dot" x="305" y="505" height="2.5%" class="Pattern-dot4"/>
    <use xlink:href="#dot" x="285" y="372" height="2.5%" class="Pattern-dot5"/>
    <use xlink:href="#dot" x="295" y="88" height="2.5%" class="Pattern-dot6"/>
    <use xlink:href="#dot" x="80" y="135" height="2.5%" class="Pattern-dot7"/>
    <use xlink:href="#dot" x="-35" y="40" height="2.5%" class="Pattern-dot8"/>
    <use xlink:href="#dot" x="-58" y="214" height="2.5%" class="Pattern-dot9"/>
    <use xlink:href="#dot" x="-245" y="83" height="2.5%" class="Pattern-dot10"/>
    <use xlink:href="#dot" x="-260" y="300" height="2.5%" class="Pattern-dot11"/>

    <use xlink:href="#line" x="70" y="240" height="20%" class="Pattern-line1" />
    <use xlink:href="#line" x="-370" y="240" height="20%" class="Pattern-line2"/>
    <use xlink:href="#line" x="-290" y="220" height="20%" class="Pattern-line3"/>
    <use xlink:href="#line" x="290" y="220" height="20%" class="Pattern-line4"/>

    <use xlink:href="#triangle" x="-257" y="420" height="14%" class="Pattern-triangle1"/>
    <use xlink:href="#triangle" x="210" y="395" height="14%" class="Pattern-triangle2"/>
    <use xlink:href="#triangle" x="200" y="0" height="14%" class="Pattern-triangle3"/>

    <use xlink:href="#bow" x="-108" y="135" height="17%" class="Pattern-bow1"/>
    <use xlink:href="#bow" x="-108" y="135" height="17%" class="Pattern-bow2"/>
    <use xlink:href="#bow" x="-318" y="-80" height="17%" class="Pattern-bow3"/>

    <use xlink:href="#curve" x="-40" y="276" height="14%" class="Pattern-curve1"/>
    <use xlink:href="#curve" x="-60" y="-150" height="14%" class="Pattern-curve2"/>
    <use xlink:href="#curve" x="-110" y="635" height="14%" class="Pattern-curve3"/>
    <use xlink:href="#curve" x="-108" y="135" height="14%" class="Pattern-curve4"/>
  </svg>
  `
}
