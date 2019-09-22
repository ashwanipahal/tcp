import { css } from 'styled-components';

const styles = css`
  .review-pickup {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    border-bottom: 1px solid ${props => props.theme.colors.BLACK};
  }

  .review-shipping {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    border-bottom: 1px solid ${props => props.theme.colors.BLACK};
  }

  .review-billing {
    height: 431px;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;

export default styles;
