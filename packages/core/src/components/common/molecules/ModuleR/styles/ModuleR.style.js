import { css } from 'styled-components';

export default css`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM} 0;

  .image-items-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .image-item-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.smallMax} {
      &:nth-child(3n) {
        margin-right: 0;
      }
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      &:nth-child(4n) {
        margin-right: 0;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }

  .promo-wrapper {
    text-align: center;
    margin: 0 auto;
  }

  .button-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;
