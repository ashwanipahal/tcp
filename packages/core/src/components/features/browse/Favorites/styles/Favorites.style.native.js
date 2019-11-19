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

const NoFavoriteContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const RecommendationWrapper = styled.View`
  margin-left: -${props => props.theme.spacing.ELEM_SPACING.SM};
`;
export {
  PageContainer,
  BrandFilterContainer,
  RowContainer,
  NoFavoriteContainer,
  RecommendationWrapper,
};
