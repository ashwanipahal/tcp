import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: ${props =>
    props.background === 'red'
      ? props.theme.colorPalette.secondary.main
      : props.theme.colorPalette.primary.dark};
`;
export const PromoTextBannerWrapper = styled.View`
  margin-top: 12px;
  margin-bottom: 16px;
`;
export const ButtonContainer = styled.View`
  margin-bottom: 16px;
`;

export default {
  Container,
  PromoTextBannerWrapper,
  ButtonContainer,
};
