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
      props.imageIndex === 3 || props.imageIndex === 6 || props.imageIndex === 10
        ? `
        margin-right: 0;
      `
        : ``}
  }

  @media ${props => props.theme.mediaQuery.large} {
    ${props =>
      props.imageIndex === 5 || props.imageIndex === 10 || props.imageIndex === 16
        ? `
        margin-right: 0;
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
`;
