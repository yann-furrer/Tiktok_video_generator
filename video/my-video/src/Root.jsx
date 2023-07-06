import {Composition,continueRender,delayRender} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';
import {MyComposition} from './Tiktok/tiktok';
import {TestComp,Loop_Sequence} from './Test/test';
import data from '../public/bucket.json';
import {testComp} from './Test/test';
import {useState, useEffect, useCallback,useContext} from 'react';
import {MyComposition} from './Test/noise';



import data from '../public/bucket.json';
import {getAudioDurationInSeconds} from '@remotion/media-utils';

export const RemotionRoot = () => {

	const [total_time, setTotal_time] = useState(1);
	const [duration_voice_tab, setDuration_voice_tab] = useState([]);
	const [handle] = useState(() => delayRender());

	const getDuration = useCallback(async () => {
		var duration = 0;
		var temp_tab = [];
		console.log(data[0]['voice'])
		for (let i = 0; i < data[0]['voice'].length; i++) {
			const remote = await getAudioDurationInSeconds(data[0]['voice'][i]); // 50.24
			console.log("duration : "+remote)
			console.log(data[0]['voice'][i])
			duration += remote;
			temp_tab.push(remote);

		}
		console.log("temp_tab : "+duration)
		setDuration_voice_tab(temp_tab);
		continueRender(handle);
		return duration;
	}, []);

	useEffect(() => {
		const execute = async () => {
			const res = await getDuration();
			//TODO: add check login;
			setTotal_time(res);
		};
		execute();
	}, []);
	
	
	return (
		<>
		<Composition
					id="Tiktok"
					durationInFrames={parseInt(total_time*30)}
					fps={30}
					width={1080}
					height={1920}
					defaultProps={{
						propOne: "Hi",
						propTwo: "test",
						propThree: "e",
					}}
					component={()=><TestComp duration_voice_tab={duration_voice_tab} />}
				/>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.jsx <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{t : "ceci est un props"}}
			/>

		<Composition
			id="noise"
			durationInFrames={1000}
			fps={30}
			component={MyComposition}
			width={1080}
			height={1920}
			defaultProps={{
				propOne: "Hi",
				propTwo: "test",
				propThree: "e",
			}}
		/>
			
		</>
	);
};
