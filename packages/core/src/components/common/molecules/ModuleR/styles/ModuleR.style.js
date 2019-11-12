import styled, { css } from 'styled-components';
import Col from '../../../atoms/Col';
import { Skeleton } from '../../../atoms';

export const ImageGridCol = styled(Col)`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

  @media ${props => props.theme.mediaQuery.smallOnly} {
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    ${props =>
      props.promobanner &&
      props.bannerposition !== 'top' &&
      (props.imageindex === 3 || props.imageindex === 6 || props.imageindex === 10)
        ? `
        margin-right: 0;
      `
        : ``}

    ${props =>
      !props.promobanner || props.bannerposition === 'top'
        ? `
        &:nth-child(4n) {
          margin-right: 0;
        }
      `
        : ``}
  }

  @media ${props => props.theme.mediaQuery.large} {
    ${props =>
      props.promobanner &&
      props.bannerposition !== 'top' &&
      (props.imageindex === 5 || props.imageindex === 10 || props.imageindex === 16)
        ? `
        margin-right: 0;
      `
        : ``}

    ${props =>
      !props.promobanner || props.bannerposition === 'top'
        ? `
        &:nth-child(6n) {
          margin-right: 0;
        }
      `
        : ``}
  }
`;

export const StyledSkeleton = styled(Skeleton)`
  margin-top: 5px;
  .skeleton-col {
    height: 109px;
    margin-bottom: 10px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      &:nth-child(n + 10) {
        display: none;
      }
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      height: 161px;
      &:nth-child(n + 13) {
        display: none;
      }
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: 209px;
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
`;

export default css`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM} 0;

  .image-items-container {
    margin-top: 28px;
  }

  .moduleR-promo-header {
    margin-bottom: 0;
  }

  .stacked-cta-wrapper-class {
    padding-top: 16px;
    padding-right: 20px;
    padding-bottom: 16px;
    padding-left: 20px;
  }

  .promo-wrapper {
    text-align: center;
    margin: 0 auto;
  }

  .image-item-wrapper {
    margin-top: 15px;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 29px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 55px;
    }
  }

  .button-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;
