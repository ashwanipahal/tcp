import styled from 'styled-components';

const StyledOrderLedger = styled.View`
  padding: 14px;
`;

const StyledRowDataContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const LabelContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const IconContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const StyledHeader = styled.View`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const OrderSummaryWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.PRIMARY.GRAY};
`;

const OrderSummaryBody = styled.View`
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.PRIMARY.GRAY};
`;

const OrderSummaryHeader = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.PRIMARY.GRAY};
`;

export {
  StyledOrderLedger,
  StyledRowDataContainer,
  LabelContainer,
  IconContainer,
  StyledHeader,
  OrderSummaryWrapper,
  OrderSummaryHeader,
  OrderSummaryBody,
};
