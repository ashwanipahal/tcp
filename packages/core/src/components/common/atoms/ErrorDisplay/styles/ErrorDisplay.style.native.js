import styled from 'styled-components';

const getAdditionalStyle = props => {
  const { margins, paddings, isBorder, theme, width } = props;
  const borderColor = theme.colorPalette.error || '#ff0000';
  return {
    ...(margins && { margin: margins }),
    ...(paddings && { padding: paddings }),
    ...(isBorder && { border: `1px solid ${borderColor}` }),
    ...(width && { width: width }),
  };
};

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  ${getAdditionalStyle};
`;

export const TextWrapper = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const errorIconStyle = {
  height: 13,
  width: 13,
  marginRight: 5,
};
