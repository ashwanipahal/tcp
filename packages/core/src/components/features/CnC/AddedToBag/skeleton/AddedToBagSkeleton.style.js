import { css } from 'styled-components';

export default css`
  padding: 10px 15px 20px 15px;
  background: ${props => props.theme.colors.WHITE};
  margin: 15px 0;
  .added-to-bag-skeleton-wrapper {
    .price-points-wrapper {
      justify-content: space-between;
      width: 100%;
      display: flex;
      margin-bottom: 5px;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
    .sub-total-wrapper {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      border-top: 1px solid #9b9b9b;
      justify-content: space-between;
      width: 100%;
      display: flex;
      margin-bottom: 5px;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
    .price-sub-text {
      height: ${props => props.theme.spacing.ELEM_SPACING.SM};
      width: 180px;
    }
    .price-sub-value {
      height: ${props => props.theme.spacing.ELEM_SPACING.SM};
      width: 50px;
    }
    .points-text {
      height: ${props => props.theme.spacing.ELEM_SPACING.SM};
      width: 120px;
    }
    .points-value {
      height: ${props => props.theme.spacing.ELEM_SPACING.SM};
      width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
