import styled from 'styled-components/native';

const ProductDetailWrapper = styled.ScrollView`
  flex-direction: column;
  margin: 20px 20px;
  flex: 1;
`;

export const ProductCompleteWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const ProductCompleteDetailWrapper = styled.View`
  flex-direction: column;
  flex: 1;
`;
export const ImageWrapper = styled.View`
  flex: 1;
  margin-right: 20px;
`;

export default ProductDetailWrapper;
