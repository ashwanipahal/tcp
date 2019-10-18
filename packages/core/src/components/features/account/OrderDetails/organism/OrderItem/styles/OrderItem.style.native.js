import styled from 'styled-components/native';

const OrderItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const OrderItemImage = styled.View`
  display: flex;
  align-items: center;
  width: 33%;
  /* border: 1px solid ${props => props.theme.colorPalette.gray[800]}; */
`;

const OrderItemContent = styled.View`
  width: 67%;
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const OrderContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const ImageStyle = styled.Image`
  width: 100%;
  height: 129px;
`;

const ImageBrandStyle = styled.Image`
  width: 100%;
  height: 22px;
`;
const ImageBrandTCPStyle = styled.Image`
  width: 64px;
  height: 22px;
`;
export {
  ImageStyle,
  ImageBrandStyle,
  ImageBrandTCPStyle,
  OrderItemContainer,
  OrderItemImage,
  OrderItemContent,
  OrderContentWrapper,
};
