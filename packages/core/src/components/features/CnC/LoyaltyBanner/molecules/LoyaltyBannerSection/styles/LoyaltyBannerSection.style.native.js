import styled from 'styled-components/native';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const LineStyle = styled.View`
  border-width: 2px;
  border-color: ${plccMpr};
`;

const LoyaltySectionWrapper = styled.View`
  padding: 0 12px 12px;
`;

export { LineStyle, LoyaltySectionWrapper };
