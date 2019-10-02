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
  right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  justify-content: center;
  align-items: center;
`;

export { ImageWrapper, Wrapper };
