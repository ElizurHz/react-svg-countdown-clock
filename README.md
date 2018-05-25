# react-svg-countdown-circle

## Brief Description

This is a circular countdown clock with a dot as the tail of countdown bar, which can move in real time with the countdown bar.

Normally, the cx and cy value of SVG is 1/2 of the width of the SVG and the height of the SVG, which is to insure that the circles are at the center of the SVG. And normally we set the SVG as a square (`width === height`).

## Usage

use component `CountdownClock` with props:

* width: _number_, the width of SVG.

* height: _number_, the height of SVG.

* radius: _number_, the radius of countdown circle.

* timeout: _number_, current timeout (second) for countdown clock (it is changed in real time, usually setting by setInterval()).

* totalTime: _number_, total timeout (second) for countdown clock.

* lineWidth: _number_,the stroke width of SVG circle and the outline of countdown clock as well.

* dotInnerStrokeWidth: _number_, if you use the tailing dot. *If you do not provide this prop, the inner dot will not show.*

* dotOuterStrokeWidth: _number_, if you use the tailing dot. *If you do not provide this prop, the outer dot will not show.*

* passedColor: _string_, the color of circle that represents the time passed by.

* remainingColor: _string_, the color of circle that represents the remaining time.

* dotInnerColor: _string_, the color of the inner circle of the tailing dot. *If you do not provide this prop, the color will be automatically adapt to `remainingColor`.*

* dotOuterColor: _string_, the color of the outer circle of the tailing dot.

* textColor: _string_, the color of the text at the center of the circle. *If you do not provide this prop, the color will be automatically adapt to `remainingColor`.*

* fontSize: the font size of the text at the center of the circle.

* textDy: the `dy` value of SVG <text> element, which is used to adjust the vertical position of the text.
