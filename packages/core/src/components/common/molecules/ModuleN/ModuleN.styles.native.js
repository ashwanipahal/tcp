import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 14px;
  margin-top: 22px;
  background: ${props =>
    props.background === 'red' ? '#f53d3d' : props.theme.colorPalette.primary.dark};
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
