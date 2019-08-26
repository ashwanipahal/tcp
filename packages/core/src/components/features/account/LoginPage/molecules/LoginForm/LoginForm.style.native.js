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
  max-width: 227px;
  margin-left: auto;
  margin-right: auto;
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
  text-align: center;
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
  max-width: 238px;
  margin: auto;
  `;
};

const getHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-weight: ${typography.fontWeights.semibold};
  align-self: center;
  text-transform: capitalize;
  `;
};

const getSubHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs12};
  align-self: center;
  padding:10px 0;
  `;
};

const getSubHeadingSectionStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs12};
  align-self: center;
  padding:14px 0 ${props.theme.spacing.LAYOUT_SPACING.XS};
  text-align: center;
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

const SubHeadingSectionStyle = styled.Text`
  ${getSubHeadingSectionStyle}
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
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ModalViewWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
`;

const LineWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
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
  SubHeadingSectionStyle,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
};
