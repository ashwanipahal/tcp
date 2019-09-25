import styled from 'styled-components/native';
import { getColor } from '@tcp/core/styles/themes/utils';

/**
 * @param {Object} props : props for getDisableStyle
 * @return {Object} color : Return color style
 * @desc This method get disabled style
 */

const getLineStyle = props => {
  const { marginTop, marginBottom, borderWidth, borderColor, theme } = props;
  const { colorPalette } = theme;
  return `
  margin-top: ${marginTop};
  margin-bottom: ${marginBottom};
  border-width: ${borderWidth};
  border-color: ${getColor(colorPalette, borderColor) || colorPalette.blue[700]};
  `;
};

const LineStyle = styled.View`
  ${getLineStyle}
  ${props =>
    props.small
      ? `
    width:40%;
    margin:20px auto;
                `
      : ''};
`;

export default LineStyle;
