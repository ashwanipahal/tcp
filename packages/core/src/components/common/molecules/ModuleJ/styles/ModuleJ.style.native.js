import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const Wrapper = styled.View`
  width: 100%;
`;

export const PromoContainer = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const HeaderContainer = styled.View`
  ${props =>
    props.layout === 'alt'
      ? ` `
      : `background:white;
 margin-left:30px;
 margin-right:30px;`};
`;

export const Border = styled.View`
  width: 100%;
  height: 1px;
  top: 10px;
  position: absolute;
  ${props =>
    props.layout === 'alt' ? `` : `border: 1px solid ${props.theme.colorPalette.yellow[500]};`};
`;

export const ImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  ${props => (props.layout === 'alt' ? `display:none ` : ``)};
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props =>
    props.layout === 'alt' ? props.theme.colorPalette.gray[500] : props.theme.colorPalette.white};
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  padding-bottom: ${props =>
    props.layout === 'alt'
      ? props.theme.spacing.LAYOUT_SPACING.SM
      : props.theme.spacing.ELEM_SPACING.XXS};
`;

export const ProductTabListContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export default {
  Container,
  PromoContainer,
  ImageContainer,
  MessageContainer,
  ProductTabListContainer,
  Border,
  Wrapper,
};
