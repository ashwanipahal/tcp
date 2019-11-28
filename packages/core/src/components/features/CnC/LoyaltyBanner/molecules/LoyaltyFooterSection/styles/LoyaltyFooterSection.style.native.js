import styled from 'styled-components/native';

const FooterLinksSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const SizeBetweenWrapper = styled.View`
  padding-left: 30px;
`;

export { FooterLinksSection, SizeBetweenWrapper };
