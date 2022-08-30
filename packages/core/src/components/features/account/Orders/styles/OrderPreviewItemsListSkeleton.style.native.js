import styled from 'styled-components/native';

const OrdersPreviewViewWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const OrderItemImageView = styled.View`
  width: 40%;
`;

const OrderItemDetailView = styled.View`
  width: 50%;
`;

const MarginBottom = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export { OrdersPreviewViewWrapper, OrderItemImageView, OrderItemDetailView, MarginBottom };
