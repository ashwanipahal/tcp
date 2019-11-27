import styled, { css } from 'styled-components';

const PageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const RecommendationContainer = styled.View`
  width: 48%;
`;

const HeaderContainer = styled.View``;

const GridPromoContainer = styled.View`
  width: ${props => (props.fullWidth ? '100%' : '48%')};
`;

const styles = css``;

export { styles, PageContainer, HeaderContainer, GridPromoContainer, RecommendationContainer };
