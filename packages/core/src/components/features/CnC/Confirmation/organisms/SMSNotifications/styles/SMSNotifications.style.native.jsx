import styled from 'styled-components/native';

export const Styles = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.XXS} 0;
`;
export const RichTextContainer = styled.View`
  width: 100%;
  min-height: 100px;
`;
export const BrandWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
export const CheckBoxFieldWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
export const CheckBoxTextWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;
export const GymboreeCheckBoxTextWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  display: flex;
  flex-direction: row;
`;
export const SuccessTextWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  display: flex;
  flex-direction: row;
`;
export const SuccessRichTextContainer = styled.View`
  width: 100%;
  min-height: 40px;
`;
export default {
  Styles,
  RichTextContainer,
  CheckBoxFieldWrapper,
  CheckBoxTextWrapper,
  GymboreeCheckBoxTextWrapper,
  BrandWrapper,
  SuccessTextWrapper,
  SuccessRichTextContainer,
};
