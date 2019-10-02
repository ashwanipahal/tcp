import styled from 'styled-components/native';

const EarnExtraPointsOverviewContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
  min-height: 150px;
`;

const EarnExtraPointsWrapper = styled.View`
  margin-bottom: 0;
`;

export { EarnExtraPointsOverviewContainer, EarnExtraPointsWrapper };
