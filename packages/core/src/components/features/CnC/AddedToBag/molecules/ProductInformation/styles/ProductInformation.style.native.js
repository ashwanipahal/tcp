import styled from 'styled-components/native';

const OuterContainer = styled.View`
  flex-direction: row;
`;
const ProductName = styled.Text`
  padding: 5px;
`;
const ProductDesc = styled.View`
  font-size: 10;
  flex-direction: row;
`;
const ImageWrapper = styled.View`
  width: 120px;
`;
const ProductDescription = styled.View`
  width: 203px;
`;
export { OuterContainer, ProductName, ProductDesc, ImageWrapper, ProductDescription };
