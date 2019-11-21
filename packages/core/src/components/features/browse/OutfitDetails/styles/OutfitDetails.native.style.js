import styled from 'styled-components';

export const DetailsContainer = styled.ScrollView``;

export const ScrollViewContainer = styled.ScrollView`
  padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
`;

export const RecommendationWrapper = styled.View`
  margin-left: -${props => props.theme.spacing.ELEM_SPACING.SM};
`;
