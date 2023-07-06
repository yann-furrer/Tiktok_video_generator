import {
	AbsoluteFill,
	Sequence,
	Audio,
	Img,
	Series,
	useVideoConfig,
} from 'remotion';
import data from '../../public/bucket.json';


export const Voice = (props) => {
	const {width, height, fps, durationInFrames} = useVideoConfig();

	//console.log('this musique' + durationInFrames); // 300
	return (
		<AbsoluteFill>
			<Audio volume={0.5} src={data[0]['voice'][props.voice]} />
		</AbsoluteFill>
	);
};

export const Loop_Sequence = ({duration_voice_tab}) => {
 return(
	<AbsoluteFill>
			<Audio volume={0.5} src={data[0]['voice'][props.voice]} />
		</AbsoluteFill>
 )
}

export const TestComp = ({duration_voice_tab}) => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: 100,
				backgroundColor: 'white',
			}}
		>
		{duration_voice_tab.length > 0 &&	<Series>
			{( (rows, i, len) =>{
				console.log("yo c'est moi")
				for(var i=0 ;i <= 9; i++) {
					//console.log(i)
					//console.log(duration_voice_tab[i])
					//console.log(data[0]['image'][i])
					//console.log(data[0]['voice'][i])

					rows.push(
						<Series.Sequence durationInFrames={parseInt(duration_voice_tab[i]*30)}>
							<Sequence from={0} durationInFrames={parseInt(duration_voice_tab[i]*30/2)}>
								<AbsoluteFill>
									<Img src={data[0]['image'][i]} />
								</AbsoluteFill>
							</Sequence>
							<Sequence from={50} durationInFrames={parseInt(duration_voice_tab[i]*30/2)}>
								<AbsoluteFill>
									<Img src={data[0]['image'][2]} />
								</AbsoluteFill>
							</Sequence>
							<Voice voice={i} />
						</Series.Sequence>
					);
				}

				return rows;
			})([], 0, 10)}
		</Series>}
		</AbsoluteFill>
	);
};
