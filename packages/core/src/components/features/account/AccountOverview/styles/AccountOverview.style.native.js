import styled from 'styled-components/native';

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

const FavtWrapper = styled.View`
  width: 32%;
  position: relative;
`;

const TouchableView = styled.TouchableOpacity`
  background: red;
  height: 40px;
`;

export { UnderlineStyle, ImageWrapper, FavtWrapper, TouchableView };
