import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {IconProps} from '../../types';
const BackCameraIcon: React.FC<IconProps> = props => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M13.496 6.151c-1.079.237-2.387 1.016-3.339 1.99l-.252.257-.568.001c-.645.001-.802.046-1.066.303-.283.275-.302.391-.302 1.797.001 1.403.026 1.602.255 2.037.352.67 1.11 1.133 1.86 1.135.222 0 .223.001.27.147.334 1.032 1.377 1.721 2.478 1.637.39-.03.662-.108 1.016-.292.485-.253.97-.83 1.116-1.325l.048-.166h3.78l.096-.096a.3.3 0 0 0-.086-.486c-.065-.03-.662-.043-1.906-.043h-1.811l-.026-.166a2.369 2.369 0 0 0-1.225-1.742 2.298 2.298 0 0 0-1.197-.288 2.368 2.368 0 0 0-1.758.756c-.343.364-.604.929-.605 1.313v.127h-.216c-.602 0-1.2-.453-1.387-1.05-.07-.224-.077-.36-.077-1.457 0-1.256.007-1.315.17-1.447.072-.058.177-.068.746-.069h.662l.412-.422c.88-.9 1.94-1.557 2.92-1.807.28-.072.447-.076 2.793-.076h2.496l.096-.096c.06-.06.095-.14.095-.217a.315.315 0 0 0-.096-.216l-.095-.096-2.531.003c-1.939.002-2.586.015-2.766.054ZM2.442 7.628c-.653.68-1.127 1.658-1.293 2.673-.077.467-.057 1.407.04 1.844.147.673.454 1.392.814 1.91.235.337.609.75.715.79.115.044.316-.022.369-.12.089-.167.044-.296-.193-.558a4.578 4.578 0 0 1-1.12-2.296c-.092-.527-.059-1.366.074-1.874.19-.732.491-1.305 1-1.906.312-.367.345-.487.181-.651-.167-.168-.28-.132-.587.188Zm9.905.405c-.171.217-.137.274.565.963.368.36.725.675.83.73l.184.098 2.414.011 2.413.012.116-.116c.142-.142.149-.287.02-.416l-.096-.096h-2.324c-1.533 0-2.36-.014-2.432-.041-.059-.023-.383-.313-.719-.645-.559-.552-.623-.603-.75-.603-.105 0-.16.026-.221.103Zm-8.31 1c-.907.948-1.07 2.465-.39 3.624.24.408.522.703.671.701.133-.001.219-.058.288-.188.07-.131.023-.266-.169-.479-.38-.423-.583-.99-.58-1.617.004-.623.174-1.065.62-1.612.196-.242.214-.36.076-.499-.154-.154-.324-.13-.516.07Zm13.974 1.187c-.11.14-.104.292.02.408.081.076.142.095.315.095.188 0 .228-.014.31-.11.12-.14.12-.278-.002-.4-.08-.08-.133-.096-.33-.096-.205 0-.242.012-.313.103ZM5.46 10.198c-.115.067-.294.362-.363.6-.08.275-.055.549.077.825.175.369.382.505.598.393.207-.107.22-.285.04-.53a.52.52 0 0 1-.126-.374c-.002-.17.019-.234.125-.382.07-.097.127-.223.127-.28 0-.213-.286-.364-.478-.252Zm6.82 1.306c-.91.198-1.517 1.028-1.38 1.89.057.352.21.652.467.908 1.03 1.032 2.815.498 3.057-.914.15-.874-.52-1.75-1.456-1.901-.312-.05-.387-.049-.688.017Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default BackCameraIcon;