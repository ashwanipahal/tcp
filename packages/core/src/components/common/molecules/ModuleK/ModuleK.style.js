import styled, { css } from 'styled-components';
import { Carousel, PromoTextBanner, LinkText, ImageGrid } from '..';

const StyledCarousal = styled(Carousel)`
  .slick-arrow {
    top: 44%;
  }
  .slick-next {
    height: 52px;
    right: -68px;
    width: 15px;
  }
  .slick-prev {
    height: 52px;
    left: -68px;
    width: 15px;
  }
  .slick-dots {
    bottom: -10px;
  }
  .slick-dots li button {
    pointer-events: none;
  }
`;
const StyledPromoTextBanner = styled(PromoTextBanner)`
  .style2 {
    font-size: ${props => props.theme.typography.fontSizes.fs42};
    @media ${props => props.theme.mediaQuery.medium} {
      font-size: 70px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs60};
    }
  }
  .style3 {
    color: ${props => props.theme.colorPalette.black};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 70px;
    @media ${props => props.theme.mediaQuery.large} {
      font-size: 60px;
    }
  }
`;
const StyledLinkText = styled(LinkText)`
  text-align: center;
  .link-text {
    text-align: center;
  }
`;
const StyledImageGrid = styled(ImageGrid)`
  align-items: center;
  justify-content: center;
  display: flex;
`;

const StyledModuleK = css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXL} 0;
  .module-k__promoBanner,
  .module-k__header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .carousal-cta {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .tcp_carousel_wrapper {
    position: relative;
  }
  .tcp_carousel_wrapper .tcp_carousel__play {
    left: 40%;
    bottom: -18px;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 45%;
    }
  }
  .image-col {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
`;

export {
  StyledCarousal as Carousel,
  StyledPromoTextBanner as PromoTextBanner,
  StyledLinkText as LinkText,
  StyledImageGrid as ImageGrid,
  StyledModuleK as style,
};

export default {
  Carousel: StyledCarousal,
  PromoTextBanner: StyledPromoTextBanner,
  LinkText: StyledLinkText,
  ImageGrid: StyledImageGrid,
  Style: StyledModuleK,
};
