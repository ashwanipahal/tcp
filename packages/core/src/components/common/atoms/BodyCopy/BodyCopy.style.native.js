import { css } from 'styled-components/native';

import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';

const BodyCopyStyles = css`
  ${typographyStyleSystem}
  ${colorStyleSystem}
`;

export default BodyCopyStyles;

// font-family : ${props => props.fontFamily || "Montserrat"};
//    line-height: ${props => props.lineHeight || 60};
//    letter-spacing : ${props => props.letterSpacing || 1 };
//    text-align : ${props => props.textAlign || 'center'};
//    color : ${props => props.color || 'red'};
//    font-size : ${ props => props.fontSize || '20px'};
//    font-weight :${props => props.fontWeight || '200'};
