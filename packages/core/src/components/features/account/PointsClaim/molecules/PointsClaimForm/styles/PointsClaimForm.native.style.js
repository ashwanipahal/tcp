import styled from 'styled-components/native';

const SaveButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const CancelButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const FieldWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const ImageCaption = styled.View`
  background-color: ${props => props.theme.colorPalette.orange[800]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  color: #ffffff;
  width: 260px;
`;

const DropdownWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  width: 40%;
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

export {
  SaveButtonWrapper,
  CancelButtonWrapper,
  dropDownStyle,
  itemStyle,
  DropdownWrapper,
  ImageContainer,
  ImageCaption,
  FieldWrapper,
};
