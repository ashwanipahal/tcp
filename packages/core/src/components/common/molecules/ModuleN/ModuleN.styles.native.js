import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 10px;
  margin-top: 20px;
  background: ${props =>
    props.background === 'red'
      ? props.theme.colorPalette.secondary.main
      : props.theme.colorPalette.primary.dark};
`;
export const PromoTextBannerWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;
export const ButtonContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export default {
  Container,
  PromoTextBannerWrapper,
  ButtonContainer,
};
