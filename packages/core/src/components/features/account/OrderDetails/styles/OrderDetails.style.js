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
    border-bottom: solid 1px #d8d8d8;
    padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  }
  .button-Container {
    text-align: right;
  }
  .order-Item {
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  }

  .button-track {
    width: 100%;
  }
  .orderDetail-trackingNumber {
    display: inline;
  }
  .orderDetail-trackingNumber-pipe {
    display: inline;
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .button-track {
      width: 40%;
    }
    .button-Container {
      text-align: left;
    }
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .button-track {
      width: 100%;
    }

    .orderDetail-trackingNumber {
      display: block;
    }
    .orderDetail-trackingNumber-pipe {
      display: none;
    }
    .group-row {
      padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    }
    .order-Item {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    }
  }
`;
