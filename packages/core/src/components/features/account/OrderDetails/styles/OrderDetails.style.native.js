import styled from 'styled-components/native';

const OrderDetailsMainView = styled.View`
  border-bottom-color: ${props => props.theme.colorPalette.gray[500]};
  border-bottom-width: 1px;
`;

const OrdersNumberWrapper = styled.View`
  width: 33%;
`;
const ContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const OrderGroupWrapper = styled.View`
  border-bottom: solid 1px ${props => props.theme.colorPalette.gray[500]};
`;
export { OrderDetailsMainView, OrdersNumberWrapper, ContentWrapper, OrderGroupWrapper };
