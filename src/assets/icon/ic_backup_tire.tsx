import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {IconProps} from '../../types';
const BackupTireIcon: React.FC<IconProps> = props => (
  <Svg width={props.width} height={props.height} data-name="Layer 1" {...props}>
    <Path
      fill={props.color}
      d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm0 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9Zm-2.375-8.065-2.812 3.749A6.963 6.963 0 0 1 5 12a7.091 7.091 0 0 1 .063-.891Zm.875-2.882L6.078 8.284A7.016 7.016 0 0 1 10.5 5.166Zm7.422-1.768L13.5 10.053V5.166a7.014 7.014 0 0 1 4.422 3.119ZM19 12a6.963 6.963 0 0 1-1.813 4.684l-2.812-3.75 4.562-1.825A7.091 7.091 0 0 1 19 12Zm-7 2.769 2.75 3.667a6.986 6.986 0 0 1-5.5 0Z"
    />
  </Svg>
);
export default BackupTireIcon;
