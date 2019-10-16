import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import styled from 'styled-components/native';

const colorPallete = createThemeColorPalette();

const container = styled.View`
  border-top-color: ${colorPallete.gray[500]};
  border-top-width: 2;
  elevation: 2;
  flex-direction: row;
  height: 55px;
  justify-content: center;
  background-color: white;
`;

const logoStyle = styled.TouchableOpacity`
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  top: -20;
`;

const tabButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const textStyle = styled.Text`
  color: ${colorPallete.gray[600]};
  font-size: 8px;
  margin-top: 6px;
`;

const highlightedTextStyle = styled(textStyle)`
  color: ${colorPallete.gray[900]};
`;

const navContainer = styled.View`
  justify-content: center;
  background-color: ${colorPallete.white};
  align-items: center;
`;

export default {
  container,
  highlightedTextStyle,
  logoStyle,
  tabButton,
  textStyle,
  navContainer,
};
