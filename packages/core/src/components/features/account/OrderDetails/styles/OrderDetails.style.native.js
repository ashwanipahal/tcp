import styled from 'styled-components/native';

const OrderDetailsMainView = styled.View`
  border-bottom-color: ${props => props.theme.colorPalette.gray[500]};
  border-bottom-width: 1px;
`;

const OrdersNumberWrapper = styled.View`
  width: 33%;
`;

export { OrderDetailsMainView, OrdersNumberWrapper };
