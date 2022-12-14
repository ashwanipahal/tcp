import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { marginTop, height } = props;
  return {
    ...(marginTop && { 'margin-top': marginTop }),
    ...(height && { height }),
    'margin-left': '0px',
  };
};

const getPromotionalText = props => {
  const { fontSize, theme, isPlcc } = props;
  const { colorPalette, typography } = theme;
  const color = isPlcc ? colorPalette.userTheme.plcc : colorPalette.userTheme.mpr;
  return `
    color: ${color};
    font-family: ${typography.fonts.secondary};
    font-size: ${fontSize ? typography.fontSizes[fontSize] : typography.fontSizes.fs9};
    font-weight: ${props.theme.fonts.fontWeight.black}
    `;
};

const PromotionalMessagePostfixText = props => {
  const { fontSize, theme } = props;
  const { colorPalette, typography } = theme;
  return `
    color: ${colorPalette.gray[900]};
    font-family: ${typography.fonts.secondary};
    font-size: ${fontSize ? typography.fontSizes[fontSize] : typography.fontSizes.fs9};
    `;
};

const PromotionalMessageContainer = styled.View`
  ${getAdditionalStyle}
  margin-bottom:${props => props.theme.spacing.ELEM_SPACING.SM};
  flex-direction:row;
`;

// Color is hard code as not in the style guide
const PromotionalText = styled.Text`
  ${getPromotionalText}
`;

const AppendedTextInMessageColor = styled.Text`
  color: ${props => props.theme.colorPalette.gray[900]};
  font-weight: ${props => props.theme.fonts.fontWeight.normal};
`;

const PromotionalMessagePostfix = styled.Text`
  ${PromotionalMessagePostfixText}
`;

export {
  PromotionalMessageContainer,
  PromotionalText,
  PromotionalMessagePostfix,
  AppendedTextInMessageColor,
};
