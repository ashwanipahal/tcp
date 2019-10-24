import styled from 'styled-components';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const PageContainer = styled.View`
  justify-content: center;
`;

const BrandFilterContainer = styled.View`
  position: absolute;
  ${getAdditionalStyle};
`;

const RowContainer = styled.View`
  flex-direction: row;
  ${getAdditionalStyle}
`;
export { PageContainer, BrandFilterContainer, RowContainer };
