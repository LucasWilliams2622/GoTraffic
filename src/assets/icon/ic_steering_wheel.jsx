import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const SteeringWheel = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 16}
    height={props.height || 16}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color || '#000'}
        d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 2a6.008 6.008 0 0 1 5.537 3.69L9.35 6.53a7.137 7.137 0 0 1-2.793 0l-4.1-.821A6.009 6.009 0 0 1 8 2ZM2.004 8.205l2.103.42a2.667 2.667 0 0 1 1.822 1.346l.416.768c.21.39.321.825.322 1.267v1.842a6.011 6.011 0 0 1-4.663-5.643Zm7.33 5.646v-1.842c0-.443.11-.878.32-1.267l.417-.769a2.667 2.667 0 0 1 1.822-1.345l2.103-.42a6.011 6.011 0 0 1-4.663 5.643Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SteeringWheel;
