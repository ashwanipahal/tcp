import styled from 'styled-components/native';

const OrdersListItemMainView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const OrdersListItemView = styled.View`
  width: 33%;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ordersListItemAnchorStyle = () => {
  return `
  display: flex;
  flex-direction: row;
  `;
};

const OrdersNumberWrapper = styled.View`
  ${ordersListItemAnchorStyle}
`;

export { OrdersListItemMainView, OrdersNumberWrapper, OrdersListItemView };
