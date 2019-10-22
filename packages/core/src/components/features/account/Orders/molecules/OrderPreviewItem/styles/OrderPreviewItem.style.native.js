import styled from 'styled-components/native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

const OrderItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const OrderItemImage = styled.View`
  display: flex;
  align-items: center;
  width: 33%;
`;

const OrderItemContent = styled(ViewWithSpacing)`
  width: 67%;
`;

const ItemContentWrapper = styled(ViewWithSpacing)`
  display: flex;
  flex-direction: row;
`;

const ImageStyle = styled.Image`
  width: 100%;
  max-height: 130px;
`;

const ImageBrandStyle = styled.Image`
  width: 100%;
  max-height: 24px;
`;
const ImageBrandTCPStyle = styled.Image`
  width: 64px;
  max-height: 24px;
`;
export {
  ImageStyle,
  ImageBrandStyle,
  ImageBrandTCPStyle,
  OrderItemContainer,
  OrderItemImage,
  ItemContentWrapper,
  OrderItemContent,
};
