import styled, { css } from 'styled-components';
import { Carousel, LinkText, ImageGrid } from '..';

const StyledCarousal = styled(Carousel)`
  .slick-arrow {
    top: 50%;
  }
  .slick-next {
    height: 50px;
    right: -68px;
    width: 13px;
  }
  .slick-prev {
    height: 50px;
    left: -68px;
    width: 13px;
  }
  .slick-dots {
    bottom: -12px;
  }
`;
const StyledLinkText = styled(LinkText)`
  text-align: center;
  .link-text {
    margin-bottom: 0;
    text-align: center;
  }
`;
const StyledImageGrid = styled(ImageGrid)`
  justify-content: space-between;
  display: flex;
`;

const StyledModuleK = css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXL} 0;
  .moduleK__button {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 225px;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      width: 161px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
    }
  }

  .moduleK__promoBanner,
  .moduleK__header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-right: 0;
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
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: 0px;
    }
  }
`;

export {
  StyledCarousal as Carousel,
  StyledLinkText as LinkText,
  StyledImageGrid as ImageGrid,
  StyledModuleK as style,
};

export default {
  LinkText: StyledLinkText,
  ImageGrid: StyledImageGrid,
  Style: StyledModuleK,
};
