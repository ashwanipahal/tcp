import { css } from 'styled-components';

const styles = css`
  background: ${props => props.theme.colorPalette.white};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  .variable-width {
    width: 86%;
    margin: 0 auto;
    @media ${props => props.theme.mediaQuery.large} {
      width: 84%;
    }
  }
  .confirmation-fullfillment-center {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .confirmation-fullfillment-center-item {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .confirmation-fullfillment-center-item:nth-of-type(2) {
    margin-right: 0;
  }
  .confirmation-update-details {
    padding: ${props =>
        props.orderNumbersByFullfillmentCenter ? props.theme.spacing.ELEM_SPACING.XL : 0}
      0 ${props => props.theme.spacing.ELEM_SPACING.XL};
    text-align: left;
    margin-top: ${props =>
      props.orderNumbersByFullfillmentCenter ? props.theme.spacing.ELEM_SPACING.XL : 0};
    border-top: ${props =>
      props.orderNumbersByFullfillmentCenter && `1px solid ${props.theme.colorPalette.gray[800]}`};
  }
  .confirmation-next-update-heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }
  .place-cash-banner {
    height: 100px;
    background-color: ${props => props.theme.colorPalette.gray[500]};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .place-cash-banner-text {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;

export default styles;
