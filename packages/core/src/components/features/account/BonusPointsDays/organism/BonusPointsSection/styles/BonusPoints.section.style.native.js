import styled from 'styled-components/native';

const StyledHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MarginRightWrapper = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ApplyAnyDayWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const InfoWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export { StyledHeader, MarginRightWrapper, ApplyAnyDayWrapper, InfoWrapper };
