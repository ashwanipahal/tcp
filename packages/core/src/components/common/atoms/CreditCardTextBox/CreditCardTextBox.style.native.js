import styled from 'styled-components/native';
import {
  StyledTextBox,
  StyledLabel,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
} from '../TextBox/TextBox.style.native';

const CardTextSection = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`;

const InputWrapper = styled.View`
  flex: 1.7;
`;

const ImageWrapper = styled.View`
  flex: 0.3;
  border: 1px solid ${props => props.theme.colorPalette.gray[800]};
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  align-items: center;
`;

export {
  StyledTextBox,
  StyledLabel,
  StyledErrorWrapper,
  StyledTextBoxWrapper,
  CardTextSection,
  InputWrapper,
  ImageWrapper,
};
