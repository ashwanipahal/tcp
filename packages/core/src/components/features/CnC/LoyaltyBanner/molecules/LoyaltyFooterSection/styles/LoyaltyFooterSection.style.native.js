import styled from 'styled-components/native';

const FooterLinksSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${props =>
    props.isProductDetailView
      ? `
      padding-top: ${props.theme.spacing.ELEM_SPACING.XS};
      `
      : `padding-top: 12px;`};
`;

const LearnMoreWrapper = styled.View`
  padding-left: 30px;
`;

export { FooterLinksSection, LearnMoreWrapper };
