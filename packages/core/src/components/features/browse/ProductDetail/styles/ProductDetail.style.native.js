import styled from 'styled-components';

export const PageContainer = styled.View`
  justify-content: center;
`;

export const Margin = styled.View`
  justify-content: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const PromoMiddleContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const PromoBottomContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const LoyaltyBannerView = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
`;

export const RecommendationWrapper = styled.View`
  margin-left: -${props => props.theme.spacing.ELEM_SPACING.SM};
`;
