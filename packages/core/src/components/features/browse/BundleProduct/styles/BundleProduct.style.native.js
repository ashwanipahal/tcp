import styled from 'styled-components';

export const PageContainer = styled.View`
  justify-content: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const RecommendationWrapper = styled.View`
  margin-left: -${props => props.theme.spacing.ELEM_SPACING.SM};
`;
