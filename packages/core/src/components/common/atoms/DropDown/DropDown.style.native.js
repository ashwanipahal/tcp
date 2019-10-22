import styled, { css } from 'styled-components/native';

const getSecondaryVariation = props => {
  return `${
    props.dropDownStyle.lightBorder
      ? `border-bottom-width: ${props.dropDownStyle.border}px; border-bottom-color: ${
          props.theme.colors.FOOTER.DIVIDER
        }`
      : `border-bottom-width: ${props.dropDownStyle.border}px; border-bottom-color: ${
          props.theme.colors.BLACK
        }`
  }`;
};

const DropDownStyle = css`
  height: ${props => props.dropDownStyle.height}px;
  ${props =>
    props.variation === 'primary'
      ? `border: ${props.dropDownStyle.border}px solid ${props.theme.colors.BUTTON.WHITE.BORDER}`
      : getSecondaryVariation(props)};
  background-color: ${props =>
    props.variation === 'primary' || props.bgColor
      ? props.theme.colorPalette.gray[500]
      : props.theme.colorPalette.white};
  width: 100%;
`;

const HeaderContainer = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const HeaderItemContainer = styled.View`
  width: 95%;
`;

const Row = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  ${props =>
    props.variation === 'primary' ? 'justify-content: center' : 'justify-content:space-between'};
  align-items: center;
`;

const OverLayView = styled.View`
  flex-direction: row;
  border: 1px solid ${props => props.theme.colors.BUTTON.WHITE.BORDER};
  border-top-width: 1px;
  margin-top: -1px;
`;

const DropDownItemContainer = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  background-color: ${props => props.theme.colors.WHITE};
  justify-content: ${props => (props.variation === 'primary' ? 'flex-start' : 'center')};
`;

const Separator = styled.View`
  background-color: ${props => props.theme.colors.BUTTON.WHITE.BORDER};
  height: 1px;
`;

const FlatList = styled.FlatList`
  flex: 1;
`;

const StyledLabel = styled.Text`
  font-size: ${props =>
    !props.isFocused
      ? props.theme.typography.fontSizes.fs14
      : props.theme.typography.fontSizes.fs10};
  color: ${props => props.theme.colors.BLACK};
  font-weight: ${props =>
    !props.isFocused
      ? props.theme.typography.fontWeights.regular
      : props.theme.typography.fontWeights.extrabold};
`;
const SelectedLabelView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export {
  DropDownStyle,
  HeaderContainer,
  Row,
  OverLayView,
  DropDownItemContainer,
  Separator,
  FlatList,
  StyledLabel,
  SelectedLabelView,
  HeaderItemContainer,
};
