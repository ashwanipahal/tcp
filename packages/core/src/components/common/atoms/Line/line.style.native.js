import styled from 'styled-components/native';

/**
 * @param {Object} props : props for getDisableStyle
 * @return {Object} color : Return color style
 * @desc This method get disabled style
 */

const getLineStyle = props => {
  const { marginTop, marginBottom, borderWidth, borderColor } = props;

  return `
  margin-top: ${marginTop};
  margin-bottom: ${marginBottom};
  border-width: ${borderWidth};
  border-color: ${borderColor || props.theme.colorPalette.blue[700]};
  `;
};

const LineStyle = styled.View`
  ${getLineStyle}
`;

export default LineStyle;
