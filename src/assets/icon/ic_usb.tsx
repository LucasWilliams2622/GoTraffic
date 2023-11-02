import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {IconProps} from '../../types';
const UsbIcon: React.FC<IconProps> = props => (
  <Svg width={props.width} height={props.height} data-name="Layer 1" {...props}>
    <Path
      fill={props.color}
      d="M18 9H6a2 2 0 0 0-2 2v5a8 8 0 0 0 16 0v-5a2 2 0 0 0-2-2ZM18 0H6v7h12Zm-7 5H9V3h2Zm4 0h-2V3h2Z"
    />
  </Svg>
);
export default UsbIcon;
