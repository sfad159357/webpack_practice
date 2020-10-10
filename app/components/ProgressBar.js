import React from 'react'

export default function ProgressBar(props) {
  return (
    <div className="progress">
      <div className="boxes">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <div
        className="progress-inner"
        style={{ transform: `scaleX(${props.score / 10})` }}
      ></div>
    </div>
  );
}