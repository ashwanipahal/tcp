import { css } from 'styled-components';

export default css`
  .elem-margin-right {
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 0;
    }
  }

  .purchasedItemsMargin {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
  }
  .group-row {
    border-bottom: solid 1px ${props => props.theme.colorPalette.gray[500]};
    padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    }
  }
  .button-container {
    text-align: right;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      text-align: left;
    }
  }
  .button-track {
    width: 100%;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 40%;
    }
  }
  .orderDetail-trackingNumber {
    display: inline;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
    }
  }
  .orderDetail-trackingNumber-pipe {
    display: inline;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }
  .order-Item {
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    }
  }
`;
