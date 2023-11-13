import React, {useEffect, useState} from 'react';
import {Image as RNImage} from 'react-native';
import Svg, {Defs, Image, Pattern, Path} from 'react-native-svg';

const FeaturedLocationFrame = ({img, ...props}) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(285); // Set the height to 285

  useEffect(() => {
    RNImage.getSize(img, (width, height) => {
      const aspectRatio = width / height;
      setImgWidth(imgHeight * aspectRatio); // Calculate the width based on the aspect ratio
    });
  }, [img]);

  return (
    <Svg
      {...props}
      viewBox={`0 0 ${imgWidth} ${imgHeight}`}
      width={204}
      height={285}>
      <Defs>
        <Pattern
          id="img"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Image
            href={{uri: img}}
            width={1}
            height={1}
            preserveAspectRatio="xMidYMid slice"
          />
        </Pattern>
      </Defs>
      <Path
        fill="url(#img)"
        d={`M21 264h${
          163 * (imgWidth / 204)
        }c11.598 0 21-9.402 21-21V89.602a21.001 21.001 0 0 0-7.263-15.883L${(
          118.416 *
          (imgWidth / 204)
        ).toFixed(3)} 5.116A21 21 0 0 0 ${(104.679 * (imgWidth / 204)).toFixed(
          3,
        )} 0H21C9.402 0 0 9.402 0 21v222c0 11.598 9.402 21 21 21Z`}
      />
    </Svg>
  );
};

export default FeaturedLocationFrame;
