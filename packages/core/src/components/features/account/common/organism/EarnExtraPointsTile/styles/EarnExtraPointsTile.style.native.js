import styled from 'styled-components/native';

const EarnExtraPointsWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const EarnExtraPointsHeading = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export { EarnExtraPointsWrapper, EarnExtraPointsHeading };
