import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const PromoContainer = styled.View`
  margin-top: 12px;
`;

export const HeaderContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  margin-top: 20px;
  ${props => (props.layout === 'layout1' ? `display:none ` : ``)};
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 24px;
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props =>
    props.layout === 'layout1'
      ? props.theme.colorPalette.gray[500]
      : props.theme.colorPalette.white};
  padding-top: 32px;
  padding-bottom: 32px;
  margin-bottom: 12px;
`;

export default {
  Container,
  PromoContainer,
  ImageContainer,
  ButtonContainer,
  MessageContainer,
};
