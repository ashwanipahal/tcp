import styled from 'styled-components/native';

const ViewWrapper = styled.View`
  display: flex;
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const StyledRowDataContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 4px 0;

  height: 30px;
  width: 100%;
`;
const LeftLoaderSkeltonWrapper = styled.View`
  display: flex;

  width: 85%;
`;

const RightLoaderSkeltonWrapper = styled.View`
  display: flex;

  width: 15%;
`;

const HeadRowDataContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
`;

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

export {
  ViewWrapper,
  StyledRowDataContainer,
  HeadRowDataContainer,
  LeftLoaderSkeltonWrapper,
  RightLoaderSkeltonWrapper,
  OrdersPreviewViewWrapper,
  OrderItemImageView,
  OrderItemDetailView,
  MarginBottom,
};
