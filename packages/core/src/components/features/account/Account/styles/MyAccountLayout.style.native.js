import styled, { css } from 'styled-components/native';

const ParentContainer = css`
  display: flex;
  margin-top: 19px;
  margin-right: 14px;
  margin-bottom: 19px;
  margin-left: 14px;
`;

const StylePickerWrapper = css`
  background-color: #eeeeee;
`;

const StylePicker = styled.Picker.attrs(() => ({ itemStyle: { height: 48 } }))`
  height: 48px;
`;

const StyledWrapper = styled.View`
  display: flex;
`;

export { ParentContainer, StylePickerWrapper, StylePicker, StyledWrapper };
