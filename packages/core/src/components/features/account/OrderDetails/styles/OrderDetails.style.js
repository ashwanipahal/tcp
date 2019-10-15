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
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
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
    display: block;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline;
    }
  }
  .orderDetail-trackingNumber-pipe {
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline;
    }
  }
  .order-Item {
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
  }
`;
