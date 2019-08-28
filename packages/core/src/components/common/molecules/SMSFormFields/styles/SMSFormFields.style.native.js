import styled from 'styled-components/native';

const PhoneWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const PhoneFieldWrapper = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const StyledText = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const StyledCheckbox = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const StyledMsgWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const SMSFormFieldsWrapper = styled.View`
  display: flex;
`;

export {
  PhoneWrapper,
  PhoneFieldWrapper,
  StyledText,
  StyledCheckbox,
  StyledMsgWrapper,
  SMSFormFieldsWrapper,
};
