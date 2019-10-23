import styled from 'styled-components/native';

import { Image } from '../../../../common/atoms';

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ImageWrapper = styled.View`
  position: absolute;
  right: 0;
`;

const FavImageWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  justify-content: center;
`;

const FavtWrapper = styled.View`
  width: 32%;
  position: relative;
  flex-direction: row;
`;

const TouchabelContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 45px;
  align-items: center;
`;

const ImageContainer = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
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
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const FavoritesWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  width: 50%;
`;

const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: stretch;
`;

export {
  UnderlineStyle,
  ImageWrapper,
  FavtWrapper,
  TouchabelContainer,
  ImageContainer,
  FavoritesContainer,
  FavoritesWrapper,
  TextWrapper,
  StyledImage,
  FavImageWrapper,
};
