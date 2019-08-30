import styled from 'styled-components/native';

const StyledWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[700]};
`;

const StyledLabeledRadioBtn = styled.View`
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[700]};
  width: 100%;
  padding: 10px;
`;
const StyledHeaderBtnWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

const StyledText = styled.Text`
  margin-left: 10px;
`;

const RadioFormStyle = {
  width: '100%',
};

export { StyledWrapper, StyledLabeledRadioBtn, RadioFormStyle, StyledHeaderBtnWrapper, StyledText };
