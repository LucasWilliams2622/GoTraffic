import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ShieldIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={24}
    fill={props.color || '#000'}
    {...props}>
    <Path
      fill={props.color || '#000'}
      d="M16.581 2.14 10.316.051a1 1 0 0 0-.632 0l-6.265 2.09A4.993 4.993 0 0 0 0 6.882V12c0 7.563 9.2 11.74 9.594 11.914a1 1 0 0 0 .812 0C10.8 23.74 20 19.564 20 12V6.883a4.993 4.993 0 0 0-3.419-4.743ZM18 12c0 5.455-6.319 9.033-8 9.89-1.683-.854-8-4.42-8-9.89V6.883a3 3 0 0 1 2.052-2.846L10 2.054l5.948 1.983A3 3 0 0 1 18 6.883V12Z"
    />
    <Path
      fill={props.color || '#000'}
      d="m13.3 8.3-4.188 4.2-2.244-2.34a1 1 0 1 0-1.441 1.386l2.306 2.4a1.872 1.872 0 0 0 1.345.6h.033a1.874 1.874 0 0 0 1.335-.553l4.272-4.272a1.003 1.003 0 1 0-1.418-1.42Z"
    />
  </Svg>
);
export default ShieldIcon;
