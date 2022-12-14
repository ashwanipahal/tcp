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
  width: 30%;
`;

const OrderItemContent = styled(ViewWithSpacing)`
  width: 70%;
`;

const OrderContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const ImageStyle = styled.View`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
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
  OrderContentWrapper,
  OrderItemContent,
};
