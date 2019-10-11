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
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .moduleR-promo-header {
    margin-bottom: 0;
  }

  .promo-wrapper {
    text-align: center;
    margin: 0 auto;
  }

  .image-item-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .button-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader-container {
    width: 100%;
    height: 150px;
    @media ${props => props.theme.mediaQuery.medium} {
      height: 200px;
    }
  }
  &:last-child {
    display: none;
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .loader-col:last-child {
      display: none;
    }
  }
`;
