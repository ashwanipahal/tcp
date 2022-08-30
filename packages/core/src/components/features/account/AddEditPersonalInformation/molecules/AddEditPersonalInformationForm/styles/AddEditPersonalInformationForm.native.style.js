import styled from 'styled-components/native';

const BirthdayContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InputFieldHalf = styled.View`
  width: 46%;
  margin-top: ${props => (props.zipCode ? props.theme.spacing.ELEM_SPACING.SM : 0)};
`;

const SaveButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const AddEditInfoWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  margin: ${props => props.theme.spacing.ELEM_SPACING.XS}
    ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const FieldTopMarginWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
const FieldBirthdayTopMarginWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
const AddEditMessageView = styled.View`
  margin-top: -${props => props.theme.spacing.ELEM_SPACING.MED};
`;
const dropDownStyle = {
  height: 41,
  border: 1,
};
const itemStyle = {
  height: 41,
  paddingLeft: 6,
  color: 'black',
};
const HiddenStateWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export {
  AddEditMessageView,
  SaveButtonWrapper,
  CancelButtonWrapper,
  dropDownStyle,
  itemStyle,
  InputFieldHalf,
  BirthdayContainer,
  AddEditInfoWrapper,
  HiddenStateWrapper,
  FieldTopMarginWrapper,
  FieldBirthdayTopMarginWrapper,
};
