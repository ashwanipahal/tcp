import { css } from 'styled-components';

const style = css`
  margin: ${props => props.theme.spacing.ELEM_SPACING.SM} auto;
  display: block;
  position: relative;

  .loyalty-promo-close-btn {
    padding: 0 8px;
    margin-left: 10px;
    cursor: pointer;
    border: 0;
    background: transparent;
    position: absolute;
    right: 6px;
    top: 0;
    height: 100%;
  }

  .loyalty-promo-close-btn-icon {
    width: ${props => props.theme.spacing.ELEM_SPACING.XS};
    height: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto;

    .loyalty-promo-close-btn-icon {
      width: ${props => props.theme.spacing.ELEM_SPACING.MED};
      height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default style;
