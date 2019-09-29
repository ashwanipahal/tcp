import styled from 'styled-components/native';

const UnderlineStyle = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[600]};
  height: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const EarnExtraPointsOverviewContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
  min-height: 150px;
`;

const EarnExtraPointsWrapper = styled.View`
  margin-bottom: 0;
`;

export { UnderlineStyle, EarnExtraPointsOverviewContainer, EarnExtraPointsWrapper };
