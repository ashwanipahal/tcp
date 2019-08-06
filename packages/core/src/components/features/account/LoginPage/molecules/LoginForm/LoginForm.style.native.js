import styled, { css } from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
  margin: ${theme.spacing.APP_LAYOUT_SPACING.SM} ${theme.spacing.APP_LAYOUT_SPACING.XS} auto ${
    theme.spacing.APP_LAYOUT_SPACING.XS
  };
  justify-content: center;

  `;
};
const FormStyle = css`
  ${getPageStyle}
`;
/**
 * @param {Object} props : props for getTextBaseStyle
 * @return {Object} : Return object
 * @desc This method get font base style
 */

const getTextBaseStyle = props => {
  const { theme } = props;
  const { typography, colorPalette } = theme;
  return `
  font-size: ${typography.fontSizes.fs12};
  color: ${colorPalette.text.secondary};
  font-family: ${typography.fonts.secondary};
  `;
};

/**
 * @param {Object} props : props for getTextBaseStyle
 * @return {Object} : Return object
 * @desc This method get font base style
 */
const getDescriptionStyle = props => {
  const { theme } = props;
  const { typography, colorPalette } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs12};
  color: ${colorPalette.text.primary};
  margin-bottom: ${theme.spacing.APP_LAYOUT_SPACING.XS};
  text-align: center;
  `;
};

const ForgotHeading = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-weight: ${typography.fontWeights.semibold};
  align-self: center;
  font-size: ${typography.fontSizes.fs16};
  padding:10px 0;
  `;
};

const ForgotDescription = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  align-self: center;
  font-size: ${typography.fontSizes.fs12};
  padding:10px 0;
  `;
};

const getHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-weight: ${typography.fontWeights.semibold};
  align-self: center;
  `;
};

const getSubHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs13};
  align-self: center;
  `;
};

const leftAignWrapper = () => {
  return `
    align-items:flex-start;
    margin:20px 0;
  `;
};

const HeadingStyle = styled.Text`
  ${getHeadingStyle}
`;

const SubHeadingStyle = styled.Text`
  ${getSubHeadingStyle}
`;

const ForgotHeadingStyle = styled.Text`
  ${ForgotHeading}
`;

const ForgotDescriptionStyle = styled.Text`
  ${ForgotDescription}
`;

const DescriptionStyle = styled.Text`
  ${getDescriptionStyle}
`;

const FormStyleView = styled.View`
  ${getPageStyle}
`;

const FloatWrapper = styled.View`
  ${leftAignWrapper}
`;

const ModalHeading = styled.Text`
  margin-top: 30px;
  margin-right: 50px;
  margin-left: 15px;
  font-size: 16px;
  font-weight: 800;
`;

const ModalViewWrapper = styled.View`
  margin-bottom: 60px;
`;

const LineWrapper = styled.View`
  padding-left: 14px;
  padding-right: 14px;
`;

export {
  FormStyle,
  DescriptionStyle,
  FormStyleView,
  ForgotHeadingStyle,
  ForgotDescriptionStyle,
  HeadingStyle,
  FloatWrapper,
  SubHeadingStyle,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
};
