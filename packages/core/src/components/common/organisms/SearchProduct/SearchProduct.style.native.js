import styled from 'styled-components';

const SearchContainer = styled.View`
  flex-direction: row;
  height: 50px;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const HeaderContainer = styled.View`
  height: 52px;
  background: ${props => props.theme.colorPalette.gray[300]};
  justify-content: center;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ItemContainer = styled.TouchableOpacity`
  height: 40px;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: center;
  flex-direction: row;
`;

const TextInput = styled.TextInput`
  margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-weight: ${props => props.theme.typography.fontWeights.regular};
  color: ${props => props.theme.colorPalette.gray[900]};
  width: 60%;
`;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const CloseButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export default SearchContainer;
export { HeaderContainer, ItemContainer, TextInput, SafeAreaView, CloseButton };
