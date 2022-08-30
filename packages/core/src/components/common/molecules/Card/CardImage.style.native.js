import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[900]};
  text-align: center;
  width: 33%;
  height: 42px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin-right: -1px;
  border-bottom-width: ${props => (props.checked ? 3 : 1)};
`;

const ImageWrapper = styled.View`
  position: absolute;
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const ImageViewWrapper = styled.View`
  display: flex;
  margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0px;
`;
const CardWrapper = styled.View`
  top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  left: 50px;
`;

const HeaderTextWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const HeaderWrapper = styled.View``;
const BadgeWrapper = styled.View`
  position: absolute;
  right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const CardListWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export {
  ImageWrapper,
  Wrapper,
  ImageViewWrapper,
  CardWrapper,
  HeaderWrapper,
  HeaderTextWrapper,
  BadgeWrapper,
  CardListWrapper,
};
