import { useCurrentFrame, AbsoluteFill, Sequence, Audio, Img, Series, staticFile, useVideoConfig  } from "remotion";
import data from '../../public/bucket.json'



export const MyComp: React.FC = (props) => {
  return (
    <Series.Sequence durationInFrames={100}>
          
    <Sequence  from={0 } durationInFrames={10}>
     
      <AbsoluteFill>
      <Img src={data[0]["image"][1]} />
      </AbsoluteFill>
    
      </Sequence>
      <Sequence from={50}  durationInFrames={10}>
      <AbsoluteFill>
      <Img src={data[0]["image"][2]} />
      </AbsoluteFill>

  
  </Sequence>
<MyVideo/>

  
</Series.Sequence >
  );
}; 


export const MyVideo = () => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  
  
  return (
    <AbsoluteFill>
      <Audio  volume={0.5} src={data[0]["voice"][1]} />
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
        backgroundColor: "white"
      }}
    >
      
      The current frame is {frame}.
        <Sequence from={110} durationInFrames={20}>
       YO {frame}.
            </Sequence>
      <Series>
            {(function (rows, i, len) {
    while (i++ <= len) {
      rows.push( <Series.Sequence   durationInFrames={150}>
        <MyVideo/>
        <MyComp count={i} />
      </Series.Sequence>)
    }
     
    return rows;
  })([], 0,7)}
       </Series>
    </AbsoluteFill>
  );
};