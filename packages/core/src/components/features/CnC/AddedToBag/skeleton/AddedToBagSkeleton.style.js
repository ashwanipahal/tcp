import { css } from 'styled-components';

export default css`
  padding: 10px 15px 20px 15px;
  /* border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]}; */
  background: ${props => props.theme.colors.WHITE};
  margin: 15px 0;
  .added-to-bag-skeleton-wrapper {
    .price-points-wrapper {
      justify-content: space-between;
      width: 100%;
      display: flex;
      margin-bottom: 5px;
      margin-top: 8px;
    }
    .sub-total-wrapper {
      padding-top: 4px;
      border-top: 1px solid #9b9b9b;
      justify-content: space-between;
      width: 100%;
      display: flex;
      margin-bottom: 5px;
      margin-top: 8px;
    }
    .price-sub-text {
      height: 12px;
      width: 180px;
    }
    .price-sub-value {
      height: 12px;
      width: 50px;
    }
    .points-text {
      height: 12px;
      width: 120px;
    }
    .points-value {
      height: 12px;
      width: 30px;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
