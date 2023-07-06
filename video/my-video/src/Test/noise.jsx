import { noise3D } from "@remotion/noise";
import React from "react";
import { Sequence, interpolate, useCurrentFrame, useVideoConfig, Audio } from "remotion";
import data from '../../public/bucket.json';
 
const OVERSCAN_MARGIN = 100;
const ROWS = 10;
const COLS = 15;

const NoiseComp = ({ speed, circleRadius, maxOffset }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  console.log("height = "+speed)
console.log("passe dna sle noise")
  return (
    <svg width={width} height={height}>
      {Array.from({ length: COLS }).map((_, i) =>
        Array.from({ length: ROWS }).map((__, j) => {
          const x = i * ((width + OVERSCAN_MARGIN) / COLS);
          const y = j * ((height + OVERSCAN_MARGIN) / ROWS);
          const px = i / COLS;
          const py = j / ROWS;
          const dx = noise3D("x", px, py, frame * speed) * maxOffset;
          const dy = noise3D("y", px, py, frame * speed) * maxOffset;
          const opacity = interpolate(
            noise3D("opacity", i, j, frame * speed),
            [-1, 1],
            [0, 1]
          );

          const key = `${i}-${j}`;

          return (
            <circle
              key={key}
              cx={x + dx}
              cy={y + dy}
              r={circleRadius}
              fill="gray"
              opacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
};

import { useCurrentFrame, AbsoluteFill } from "remotion";
 


const viewBox = "0 0 1000 1000";
 
export const ViewBoxExample: React.FC = () => {
  return (
    <svg viewBox={viewBox}>
      <path d={"0 500 1500 500"} stroke="black" strokeWidth={4} />
    </svg>
  );
};



export const Voice = (props) => {
	const {width, height, fps, durationInFrames} = useVideoConfig();

	//console.log('this musique' + durationInFrames); // 300
	return (
		<AbsoluteFill>
			<Audio volume={0.5} src={data[0]['voice'][1]} />
		</AbsoluteFill>
	);
};

export const MyComposition = () => {
  const frame = useCurrentFrame();
 
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 100,
        backgroundColor: "none"
      }}
    >
<Sequence>
    
      <Voice voice={0} />
      <NoiseComp speed={0.01} circleRadius={5} maxOffset={50}/>
</Sequence>
    </AbsoluteFill>
  );
};