import styled from 'styled-components/native';

const AddChildFormWrapper = styled.View`
  background: ${props => props.theme.colorPalette.gray[500]};
  margin-left: -${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-right: -${props => props.theme.spacing.ELEM_SPACING.LRG};
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

const InformationHeaderView = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const FieldTopMarginWrapper = styled.View`
  margin: 0 ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
const HiddenStateWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
const CheckboxMarginWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 80%;
`;
const BirthdayContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: ${props => (props.chooseGender ? props.theme.spacing.ELEM_SPACING.MED : 0)}
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const InputFieldHalf = styled.View`
  width: 46%;
  background: ${props => props.theme.colorPalette.gray[500]};
  margin-top: ${props => (props.birthYear ? props.theme.spacing.ELEM_SPACING.SM : 0)};
`;
const StyledAnchorWrapper = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
`;

const SaveButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;
const CheckBoxWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 80%;
`;
export {
  AddChildFormWrapper,
  dropDownStyle,
  itemStyle,
  InformationHeaderView,
  FieldTopMarginWrapper,
  BirthdayContainer,
  InputFieldHalf,
  StyledAnchorWrapper,
  SaveButtonWrapper,
  CancelButtonWrapper,
  CheckboxMarginWrapper,
  HiddenStateWrapper,
  CheckBoxWrapper,
};
