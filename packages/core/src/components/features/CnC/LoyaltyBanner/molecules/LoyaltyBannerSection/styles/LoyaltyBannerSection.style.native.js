import styled from 'styled-components/native';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const LineStyle = styled.View`
  border-width: 2px;
  border-color: ${plccMpr};
`;

export default LineStyle;
