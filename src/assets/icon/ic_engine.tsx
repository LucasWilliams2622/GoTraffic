import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

export interface IconProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
}

const EngineIcon = (props: IconProps) => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M28.667 12H28v-.667A3.338 3.338 0 0 0 24.667 8h-3.334V4h4a1.334 1.334 0 0 0 0-2.667H14.667a1.334 1.334 0 0 0 0 2.667h4v4h-3.418c-1.19 0-2.31.525-3.072 1.44L10.043 12H10a3.338 3.338 0 0 0-3.333 3.333v2h-4v-4a1.334 1.334 0 0 0-2.667 0V24a1.334 1.334 0 0 0 2.667 0v-4h4v2.895c0 1.068.416 2.073 1.172 2.829l2.437 2.437a3.971 3.971 0 0 0 2.83 1.172h11.56a3.34 3.34 0 0 0 3.267-2.666h.734A3.338 3.338 0 0 0 32 23.333v-8A3.338 3.338 0 0 0 28.667 12Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EngineIcon;
