import styled from 'styled-components/native';

const PanelContainer = styled.View`
  overflow: hidden;
  flex: 1;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

const TouchableHeader = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  flex: 1;
  justify-content: center;
  height: 50px;
`;

const HeaderContainer = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  flex: 1;
  height: 45px;
  justify-content: center;
`;

const FavoritesContainer = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  flex: 1;
  flex-direction: row;
`;

const TextWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.View`
  margin-left: 4px;
`;

const FavoritesWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;

const PanelBody = styled.View`
  overflow: hidden;
  flex: 1;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export {
  PanelContainer,
  TitleContainer,
  TouchableHeader,
  PanelBody,
  ImageWrapper,
  HeaderContainer,
  FavoritesContainer,
  FavoritesWrapper,
  TextWrapper,
};
