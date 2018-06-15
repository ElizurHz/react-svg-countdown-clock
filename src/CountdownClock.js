import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { secondToString } from './utils';

class CountdownClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashOffsetCircle: 0,
      maxStrokeDasharray: Math.ceil(Math.PI * 2 * props.radius),
      transform: `rotate(${-Math.PI * 0.5}rad)`,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { totalTime, radius } = this.props;
    if (nextProps.timeout !== this.props.timeout) {
      const dashOffsetCircle = this.state.maxStrokeDasharray * (1 - nextProps.timeout / totalTime);
      // getTotalLength() 已经被废除，在 Safari、Firefox 中已经不支持
      // const circleInnerLength = Math.ceil(this.innerCircle.getTotalLength());
      const circleInnerLength = Math.ceil(
        parseInt(this.innerCircle.getAttribute('stroke-dasharray'), 10),
      );
      const arcLength = circleInnerLength - dashOffsetCircle;
      const rad = arcLength / radius - Math.PI * 0.5;
      this.setState({
        dashOffsetCircle,
        transform: `rotate(${rad}rad)`,
      });
    }
  }
  render() {
    const {
      dashOffsetCircle,
      maxStrokeDasharray,
      transform,
    } = this.state;
    const {
      width,
      height,
      passedColor,
      remainingColor,
      dotInnerColor,
      dotOuterColor,
      textColor,
      lineWidth,
      radius,
      fontSize,
      dotInnerStrokeWidth,
      dotOuterStrokeWidth,
      timeout,
      textDy,
    } = this.props;
    return (
      <div>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <circle cx={width / 2} cy={height / 2} r={radius} fill="none" stroke={passedColor} strokeWidth={lineWidth} />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            fill="none"
            stroke={dotInnerColor || remainingColor}
            strokeWidth={lineWidth}
            strokeDasharray={maxStrokeDasharray}
            strokeDashoffset={dashOffsetCircle}
            strokeLinecap="round"
            transform={`matrix(0,-1,1,0,0,${height})`}
          />
          <circle
            ref={(ref) => { this.innerCircle = ref; }}
            cx={width / 2}
            cy={height / 2}
            r={radius}
            fill="none"
            stroke={dotOuterColor}
            strokeWidth={dotOuterStrokeWidth}
            strokeDashoffset={maxStrokeDasharray - 0.5}
            strokeDasharray={maxStrokeDasharray}
            strokeLinecap="round"
            style={{
              transform: transform,
              transformOrigin: `${width / 2}px ${height / 2}px`,
            }}
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            fill="none"
            stroke={remainingColor}
            strokeWidth={dotInnerStrokeWidth}
            strokeDashoffset={maxStrokeDasharray - 0.5}
            strokeDasharray={maxStrokeDasharray}
            strokeLinecap="round"
            style={{
              transform: transform,
              transformOrigin: `${width / 2}px ${height / 2}px`,
            }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy={textDy}
            fontSize={fontSize}
            fill={textColor || remainingColor}
          >
            {secondToString(timeout)}
          </text>
        </svg>
      </div>
    );
  }
}

CountdownClock.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  totalTime: PropTypes.number,
  timeout: PropTypes.number,
  lineWidth: PropTypes.number,
  dotInnerStrokeWidth: PropTypes.number,
  dotOuterStrokeWidth: PropTypes.number,
  passedColor: PropTypes.string,
  remainingColor: PropTypes.string,
  dotInnerColor: PropTypes.string,
  dotOuterColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  textDy: PropTypes.string,
};

export default CountdownClock;
