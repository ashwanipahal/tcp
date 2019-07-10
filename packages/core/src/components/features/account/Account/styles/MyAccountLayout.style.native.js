import styled from 'styled-components/native';

const ParentContainer = styled.View`
  display: flex;
  margin-top: 19px;
  margin-right: 14px;
  margin-bottom: 19px;
  margin-left: 14px;
`;

const StylePickerWrapper = styled.View`
  background-color: #eeeeee;
`;

const StylePicker = styled.Picker.attrs(() => ({ itemStyle: { height: 48 } }))`
  height: 48px;
`;

export { ParentContainer, StylePickerWrapper, StylePicker };
