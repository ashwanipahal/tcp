import styled, { css } from 'styled-components';
import Col from '../../../atoms/Col';

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

export default css`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM} 0;

  .image-items-container {
    margin-top: 28px;
  }

  .moduleR-promo-header {
    margin-bottom: 0;
  }

  .promo-wrapper {
    text-align: center;
    margin: 0 auto;
  }

  .image-item-wrapper {
    margin-top: 15px;
    @media ${props => props.theme.mediaQuery.large} {
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
