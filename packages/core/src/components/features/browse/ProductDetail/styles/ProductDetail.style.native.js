import styled from 'styled-components';

export const PageContainer = styled.View`
  justify-content: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const LoyaltyBannerView = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
`;
