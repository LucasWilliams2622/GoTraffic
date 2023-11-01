import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {IconProps} from '../../types';
const MapIcon: React.FC<IconProps> = props => (
  <Svg
    width={props.width}
    height={props.height}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={props.color}
      d="M14 7a2 2 0 1 1-2-2 2 2 0 0 1 2 2Zm2.958 5.184L13.9 15.215a2.669 2.669 0 0 1-3.79 0L7.054 12.2a7.262 7.262 0 0 1-.012-10.1 6.9 6.9 0 0 1 9.916 0 7.257 7.257 0 0 1 0 10.084ZM16 7a4 4 0 1 0-4 4 4 4 0 0 0 4-4Zm4.753 2.2a9.1 9.1 0 0 1-2.364 4.384l-3.078 3.053a4.667 4.667 0 0 1-3.3 1.371 4.665 4.665 0 0 1-3.3-1.366l-3.063-3.023a9.2 9.2 0 0 1-2.365-4.311 5.066 5.066 0 0 0-1.745 1.083A4.946 4.946 0 0 0 0 14v4.075a5.013 5.013 0 0 0 3.6 4.8l2.87.9A4.981 4.981 0 0 0 7.959 24a5.076 5.076 0 0 0 1.355-.186l5.78-1.71a2.976 2.976 0 0 1 1.573 0l2.387.8A4 4 0 0 0 24 19.021v-5.149A5.009 5.009 0 0 0 20.753 9.2Z"
    />
  </Svg>
);
export default MapIcon;
