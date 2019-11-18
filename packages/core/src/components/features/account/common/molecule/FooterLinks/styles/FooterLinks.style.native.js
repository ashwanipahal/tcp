import styled, { css } from 'styled-components/native';
import { Image } from '../../../../../../common/atoms';

const FavtWrapper = styled.View`
  width: 32%;
  position: relative;
  flex-direction: row;
`;

const FavImageWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  justify-content: center;
`;

const TouchabelContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 45px;
  align-items: center;
`;

const FavoritesWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  width: 50%;
`;

const ImageContainer = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const RightArrowImageContainer = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
  flex: 1;
  align-items: flex-end;
`;

const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: stretch;
`;

const TextWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const AnchorStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 48,
};

const IconStyles = css`
  margin-right: 0;
  margin-left: auto;
`;

export {
  UnderlineStyle,
  TextWrapper,
  StyledImage,
  RightArrowImageContainer,
  ImageContainer,
  FavoritesWrapper,
  TouchabelContainer,
  FavImageWrapper,
  FavtWrapper,
  AnchorStyles,
  IconStyles,
};
