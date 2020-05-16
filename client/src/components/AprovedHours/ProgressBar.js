import React, { useEffect, useState, useRef } from 'react';
import "./ProgressBar.scss";
const ProgressBar = (props) => {
    const [offset, setOffset] = useState(0);

    const { 
        size, 
        strokeWidth, 
        circleOneStroke, 
        circleTwoStroke,
        percentage
    } = props;

    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const circleRef = useRef(null);

    useEffect(() => {
        const progressOffset = ((100 - percentage) / 100) * circumference;
        setOffset(progressOffset)
        circleRef.current.style = 'transition: stroke-dashoffset 1s ease-in-out;';
;
    }, [setOffset, circumference, percentage, offset]);

 

  return (
    <main>
<svg className="svg" width={size} height={size}>
    <circle
        className="svg-circle-bg"
            stroke={circleOneStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
    />
    <circle
        className="svg-circle"
        stroke={circleTwoStroke}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        ref={circleRef}


    />
     <text className="svg-circle-text" x={center}  y={center}>
        {percentage}%
    </text>
</svg>    </main>
  );
};
export default ProgressBar;
