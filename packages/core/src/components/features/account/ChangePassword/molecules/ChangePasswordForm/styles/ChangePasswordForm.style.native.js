import styled from 'styled-components';

const HideShowField = styled.View`
  position: absolute;
  right: 0;
  top: 16px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const CurrentPasswordWrapper = styled.View`
  position: relative;
  margin-top: 25px;
`;

const NewPasswordWrapper = styled.View`
  position: relative;
`;

const ConfirmPasswordWrapper = styled.View`
  position: relative;
  margin-bottom: 30px;
`;

const CancelWrapper = styled.View`
  margin-top: 20px;
`;

export { HideShowField, CurrentPasswordWrapper, NewPasswordWrapper, ConfirmPasswordWrapper, CancelWrapper };
