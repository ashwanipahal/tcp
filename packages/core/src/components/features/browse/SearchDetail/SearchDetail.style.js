import { css } from 'styled-components';

export default css`
  .placeholder div {
    background: #d8d8d8;
    padding: 10px 0;
    margin-bottom: 5px;
    text-align: center;
  }
  .product-tile-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  display: flex;
  flex-wrap: wrap;
  .product-tile {
    border: 1px solid ${props => props.theme.colors.TEXT.DARKERGRAY};
    display: inline-block;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 10px;
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XS} 6px
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    text-align: center;
    width: calc(50% - 38px);
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 20px ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
      width: calc(33.3% - 68px);
    }
    @media only screen and (min-width: 1350px) {
      margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM}
        ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 21px;
      width: calc(20% - 70px);
    }
  }
  .item-title {
    width: 100%;
  }
`;
