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

export { StyledOrderLedger, StyledRowDataContainer, LabelContainer, IconContainer, StyledHeader };
