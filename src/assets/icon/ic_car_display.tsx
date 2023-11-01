import {color} from 'native-base/lib/typescript/theme/styled-system';
import * as React from 'react';
import Svg, {SvgProps, Path, G, Mask, Defs, ClipPath} from 'react-native-svg';
import {IconProps} from '../../types';
const CarScreenIcon: React.FC<IconProps> = props => (
  <Svg {...props} width={props.width} height={props.height} fill="none">
    <Path
      fill={props.color}
      d="M10.097 0v7.646c0 .29.157.567.435.772.279.205.657.32 1.05.32h6.933c.394 0 .771-.115 1.05-.32.278-.205.435-.483.435-.772V0h-9.903Zm8.913.728V6.19h-7.923V.73h7.923Zm-.495 7.282h-6.933a.597.597 0 0 1-.35-.107.324.324 0 0 1-.145-.257v-.729h3.466v.729h.99v-.729h3.467v.729c0 .096-.052.189-.145.257a.597.597 0 0 1-.35.107Z"
    />
    <Mask id="a" width={9} height={10} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill={props.color} d="M8.932.097H0V9.03h8.932V.097Z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.color}
        d="M4.466.097a4.466 4.466 0 1 0 0 8.932 4.466 4.466 0 0 0 0-8.932Zm0 1.117a3.354 3.354 0 0 1 3.091 2.06l-2.338.468a3.984 3.984 0 0 1-1.56 0l-2.288-.458a3.354 3.354 0 0 1 3.095-2.07ZM1.119 4.677l1.174.235a1.489 1.489 0 0 1 1.017.751l.232.43c.118.217.18.46.18.707v1.028a3.356 3.356 0 0 1-2.603-3.15ZM5.21 7.83V6.801c0-.247.062-.49.18-.707l.232-.43a1.489 1.489 0 0 1 1.017-.75l1.174-.235a3.356 3.356 0 0 1-2.603 3.15Z"
      />
    </G>
    <Path fill={props.color} d="M19.712 16H0v.874h19.712V16Z" />
    <Path
      stroke={props.color}
      d="m1.614 15.66.641-2.62H7.13l.407 2.62H1.614ZM12 15.621 12.64 13h4.875l.408 2.621H12Z"
    />
  </Svg>
);
export default CarScreenIcon;
