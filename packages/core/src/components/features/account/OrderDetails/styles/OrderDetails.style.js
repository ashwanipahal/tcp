import { css } from 'styled-components';

export default css`
  .elem-margin-right {
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 0;
    }
  }
.order-status-header{
  @media ${props => props.theme.mediaQuery.large} {
    padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }
}
  .group-row {
    border-bottom: solid 1px ${props => props.theme.colorPalette.gray[500]};
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
      margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
      padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }
  }
  .button-container {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    text-align: left;
    @media ${props => props.theme.mediaQuery.large} {
      margin-top:0px;
      text-align: right;
    }
  }
  .button-track {
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 40%;
    }
  }
  .orderDetail-trackingNumber {
    display: block;
    margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline;
      margin-top:0
    }
  }
  .orderDetail-trackingNumber-pipe {
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline;
    }
  }
  .order-Item {
    padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    /* @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    } */
  }
  .margin-tablet {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 0;
    }
  }
  .margin-mobile {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 0;
    }
  }
`;
