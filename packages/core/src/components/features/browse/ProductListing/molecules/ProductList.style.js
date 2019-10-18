import { css } from 'styled-components';

export default css`
  display: flex;
  flex-wrap: wrap;
  &.product-tile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 10px;
    margin: 0 0 6px 0;
    width: calc(50% - ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS});

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
      padding: 12px ${props => props.theme.spacing.LAYOUT_SPACING.SM};
      width: calc(33.33% - ${props => props.theme.spacing.LAYOUT_SPACING.LRG});
    }
    @media only screen and (min-width: 1350px) {
      margin: 0 0 19px 0;
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 21px;
      width: calc(25% - 42px);
    }
  }
  &.item-title {
    width: 100%;
    height: 22px;
    font-family: Nunito;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #1a1a1a;
  }

  .horizontal-bar {
    width: 330px;
    border-bottom-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    border-bottom-width: 1px;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.L};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.L};
    margin-right: 1px;
    margin-left: 0px;

    @media ${props => props.theme.mediaQuery.largeMax} {
      width: 1100px;
      border-bottom-width: 1px;
      margin-right: 15.1px;
      margin-left: 0px;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 700px;
      border-bottom-width: 1px;
      margin-right: 15.1px;
      margin-left: 0px;
    }
  }
`;
