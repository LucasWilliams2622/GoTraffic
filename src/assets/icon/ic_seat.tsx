import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M11.865 25.29c.176.017.35.043.53.043h13.082a3.995 3.995 0 0 0 3.048-1.41 4.019 4.019 0 0 0 .899-3.251c-.31-1.904-2.067-3.339-4.09-3.339h-10.88l-1.093-4h11.971v-2.666H12.633l-2.065-7.558C10.027 1.045 8.101-.285 6.085.011A4.005 4.005 0 0 0 3.33 1.76a4.004 4.004 0 0 0-.528 3.228l4.446 16.406a5.306 5.306 0 0 0 2.102 2.964l-.926 1.852a3.975 3.975 0 0 0 .176 3.892A3.974 3.974 0 0 0 12 32h16v-2.667H12a1.32 1.32 0 0 1-1.135-.632 1.318 1.318 0 0 1-.058-1.298l1.057-2.115.001.001Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
