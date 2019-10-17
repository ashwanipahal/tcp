import styled from 'styled-components/native';

const OrderItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const OrderItemImage = styled.View`
  width: 33%;
  /* To do  need to be removed*/
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
  width: 100px;
  height: 100px;
`;

const ImageBrandStyle = styled.Image`
  width: 62px;
  height: 22px;
`;

const ImageGymBrandStyle = styled.Image`
  width: 60px;
  height: 15px;
`;
export {
  ImageStyle,
  ImageBrandStyle,
  ImageGymBrandStyle,
  OrderItemContainer,
  OrderItemImage,
  OrderItemContent,
  OrderContentWrapper,
};
