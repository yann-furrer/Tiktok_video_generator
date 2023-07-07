import {
	AbsoluteFill,
	Sequence,
	Audio,
	Img,
	Series,
	useVideoConfig,
	spring,
} from 'remotion';
import data from '../../public/bucket.json';
import {noise3D} from '@remotion/noise';
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {MyComp} from '../Tiktok/tiktok';
// import { TransitionSeries } from 'remotion-transition-series';
const OVERSCAN_MARGIN = 100;
const ROWS = 10;
const COLS = 15;

function generateRandomArray(min, max, length) {
	var randomArray = [];
	for (var i = 0; i < length; i++) {
		var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
		randomArray.push(randomValue);
	}
	return randomArray;
}

const style_array = generateRandomArray(0, 2, data[0]['image'].length);

const NoiseComp = ({speed, circleRadius, maxOffset}) => {
	const frame = useCurrentFrame();
	const {height, width} = useVideoConfig();
	console.log('passe dna sle noise');
	return (
		<svg width={width} height={height} fill={'red'}>
			{Array.from({length: COLS}).map((_, i) =>
				Array.from({length: ROWS}).map((__, j) => {
					const x = i * ((width + OVERSCAN_MARGIN) / COLS);
					const y = j * ((height + OVERSCAN_MARGIN) / ROWS);
					const px = i / COLS;
					const py = j / ROWS;
					const dx = noise3D('x', px, py, frame * speed) * maxOffset;
					const dy = noise3D('y', px, py, frame * speed) * maxOffset;
					const opacity = interpolate(
						noise3D('opacity', i, j, frame * speed),
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

export const Voice = (props) => {
	const {width, height, fps, durationInFrames} = useVideoConfig();

	//console.log('this musique' + durationInFrames); // 300
	return (
		<AbsoluteFill>
			<Audio volume={0.5} src={data[0]['voice'][props.voice]} />
		</AbsoluteFill>
	);
};

export const Part = ({duration_voice_tab, i}) => {
	console.log("i= ", i)
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const margin = 1 + (4 / (durationInFrames / 2)) * (frame / 2);
	const scaled_one = interpolate(frame, [0, durationInFrames / 2], [1.1, 1.4]);
	const scaled_two = interpolate(
		frame - durationInFrames / 2,
		[0, durationInFrames / 2],
		[1, 1.4]
	);
	//console.log('scaled' + (frame - durationInFrames / 2));

	const stylesleft = {
		0: {transform: `scale(${scaled_one})`},
		1: {
			transform: `scale(${scaled_one})`,
			marginRight: frame
		},
		2: {
			transform: `scale(${scaled_one})`,
			marginLeft: frame ,
		},
		3: {
			transform: `scale(${scaled_one})`,
			marginTop: frame,
		}
	};



	const stylesright = {
		0: {transform: `scale(${scaled_two})`},
		1: {
			transform: `scale(${scaled_two})`,
			marginRight: frame - durationInFrames / 2,
		},
		2: {
			transform: `scale(${scaled_two})`,
			marginLeft: frame - durationInFrames / 2,
		},
		3: {
			transform: `scale(${scaled_two})`,
			marginTop: frame - durationInFrames / 2,
		}
	};
	//console.log('frame' + frame);
	//console.log("test"+test)
	//console.log(frame)
	// console.log('margin' + (1+(4/(durationInFrames/2))*(frame/2)))
	//  const marginLeft = interpolate(driver, [0, 90], [0, 1.23]);
	//console.log("duration = "+(frame-durationInFrames/2))
	return (
		<Series>
			<Series.Sequence
				durationInFrames={parseInt(duration_voice_tab[i] * 30) / 2 + 4}
			>
				
				<Img style={stylesleft[style_array[i]]} src={data[0]['image'][i]} />
				
			</Series.Sequence>

			<Series.Sequence
				durationInFrames={parseInt(duration_voice_tab[i] * 30) / 2}
			>
				<Img style={stylesright[style_array[i]]} src={data[0]['image'][i + 1]} />
			</Series.Sequence>
		</Series>
	);
};

export const PartSequence = ({duration_voice_tab}) => {
	return (
		<Series>
			{duration_voice_tab.length > 0 &&
				((rows, i, len) => {
					for (var i = 0; i < 12 ; i+=2) {
						console.log("duration_voice_tab = "+duration_voice_tab.length)
						console.log("duration_voic = "+Math.floor(i/2))
						//console.log(data[0]['voice']);
							//console.log(duration_voice_tab.length)
						//console.log(data[0]['voice'][i])
//							console.log(duration_voice_tab[i])
						//	console.log(data[0]['image'][i])

						rows.push(
							<Series.Sequence
								durationInFrames={parseInt(duration_voice_tab[Math.floor(i/2)] * 30)}
							>
								<Part i={i} duration_voice_tab={duration_voice_tab} />
								<Voice voice={Math.floor(i / 2)} />
							</Series.Sequence>
						);
					}

					return rows;
				})([], 0, duration_voice_tab.length)}
		</Series>
	);
};

export const TestComp = ({duration_voice_tab}) => {
	//var scale = interpolate(frame, [0, 30], [0, 1]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 100,
				backgroundColor: 'none',
			}}
		>
			{/* <NoiseComp style={{ position: 'relative', zIndex: 1 }} speed={0.01} circleRadius={20} maxOffset={50}/> */}
			<PartSequence duration_voice_tab={duration_voice_tab} />
		</AbsoluteFill>
	);
};