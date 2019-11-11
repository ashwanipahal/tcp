import styled from 'styled-components/native';

const WrapperElement = styled.View`
  background-color: ${props => props.theme.colorPalette.white};
  padding: 20px 0;
  width: 100%;
  flex-direction: row;
`;

const SingleLine = styled.View`
  width: 50%;
  height: 20px;
  margin-bottom: 12px;
`;

const ImageWrapper = styled.View`
  width: 100px;
  height: 100px;
`;

const RightSection = styled.View`
  justify-content: space-between;
  margin-left: 12px;
  flex: 1;
`;

export { WrapperElement, ImageWrapper, SingleLine, RightSection };
