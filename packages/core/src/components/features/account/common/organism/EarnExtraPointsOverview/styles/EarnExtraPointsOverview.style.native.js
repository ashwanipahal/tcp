import styled from 'styled-components/native';

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[600]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const EarnExtraPointsOverviewContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
  min-height: 150px;
`;

const ButtonWrapperStyle = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;
const EarnExtraPointsWrapper = styled.View`
  margin-bottom: 0;
`;

export {
  UnderlineStyle,
  EarnExtraPointsOverviewContainer,
  ButtonWrapperStyle,
  EarnExtraPointsWrapper,
};
