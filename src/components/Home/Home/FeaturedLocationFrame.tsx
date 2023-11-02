import * as React from 'react';
import Svg, {Path, Image, Defs, Pattern} from 'react-native-svg';
import {FeaturedLocationFrameProps} from '../../../types';

const FeaturedLocationFrame = ({img, ...props}: FeaturedLocationFrameProps) => {
  return (
    <Svg {...props} viewBox="0 0 204 285" width={204} height={285}>
      <Defs>
        <Pattern
          id="img"
          patternUnits="userSpaceOnUse"
          width="100%"
          height="100%">
          <Image href={{uri: img}} x="0" y="0" />
        </Pattern>
      </Defs>
      <Path
        fill="url(#img)"
        d="M21 264h163c11.598 0 21-9.402 21-21V89.602a21.001 21.001 0 0 0-7.263-15.883L118.416 5.116A21 21 0 0 0 104.679 0H21C9.402 0 0 9.402 0 21v222c0 11.598 9.402 21 21 21Z"
      />
    </Svg>
  );
};
export default FeaturedLocationFrame;
