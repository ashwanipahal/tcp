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

const StyledPicker = styled.Picker`
  border: solid 1px #9c9c9c;
`;

export { ParentContainer, StylePickerWrapper, StyledPicker };
