import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
import {IconProps} from './ic_engine';

const GasolineIcon = (props: IconProps) => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M21.333 12H0V4a4 4 0 0 1 4-4h13.333a4 4 0 0 1 4 4v8Zm9.886-6.667L26.276.391l-1.885 1.885 2.276 2.276V8a2.667 2.667 0 0 0 2.666 2.667V24a1.333 1.333 0 1 1-2.666 0v-1.333a4 4 0 0 0-4-4h-1.334v-4H0V32h21.333V21.333h1.334A1.333 1.333 0 0 1 24 22.667V24a4 4 0 1 0 8 0V7.219a2.682 2.682 0 0 0-.781-1.886Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default GasolineIcon;
