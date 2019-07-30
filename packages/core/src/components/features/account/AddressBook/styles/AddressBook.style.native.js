import styled, { css } from 'styled-components/native';

const StyledText = styled.Text`
  padding: 8px;
`;

const ParentContainer = css`
  margin-bottom: 120px;
`;

const StyledHeading = styled.Text`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
const UnderlineStyle = styled.View`
  height: 3px;
  background-color: ${props => props.theme.colorPalette.black};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const UnderlineStyleLight = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.FOOTER.DIVIDER};
`;

const InputField = styled.View`
  height: 41px;
  width: 347px;
  margin-bottom: 32px;
  padding-top: 16px;
  padding-bottom: 7px;
`;

const InputFieldHalf = styled.View`
  height: 41px;
  width: 170px;
  margin-bottom: 32px;
  padding-top: 16px;
  padding-bottom: 7px;
`;

export {
  StyledText,
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  UnderlineStyleLight,
  InputField,
  InputFieldHalf,
};
