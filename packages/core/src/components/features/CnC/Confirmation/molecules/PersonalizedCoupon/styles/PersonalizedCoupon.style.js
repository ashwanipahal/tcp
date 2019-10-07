import { css } from 'styled-components';

const styles = css`
  .personalized-coupon {
    position: relative;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border: dashed 0.8px ${props => props.theme.colorPalette.gray[800]};
    background-color: ${props => props.theme.colorPalette.white};
    text-align: center;

    @media ${props => props.theme.mediaQuery.medium} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
        ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XL}
        ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .description {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XL};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .code {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .barcode {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .validity {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 20px;
    }
  }

  .details {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .print-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 6;
    cursor: pointer;
  }

  .ribbon {
    width: 0;
    height: 59px;
    border-left: 9px solid ${props => props.theme.colorPalette.black};
    border-right: 7px solid transparent;
    border-top: 11px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    z-index: 5;
  }

  .ribbon.top-left {
    left: 10px;
    top: -16px;
    transform: rotate(-139deg);

    &::before {
      content: '';
      position: absolute;
      height: 1px;
      border-left: 30px solid ${props => props.theme.colorPalette.gray[300]};
      border-right: 0px solid transparent;
      border-top: 34px solid transparent;
      border-bottom: 24px solid transparent;
      left: 0px;
      top: 0px;
      width: 0px;
    }
  }

  .ribbon.bottom-right {
    border-left: 8px solid ${props => props.theme.colorPalette.black};
    border-right: 8px solid transparent;
    border-top: 10px solid transparent;
    border-bottom: 6px solid transparent;

    bottom: -14px;
    right: 8px;
    transform: rotate(38deg);

    &::before {
      content: '';
      position: absolute;
      height: 1px;
      border-left: 30px solid ${props => props.theme.colorPalette.gray[300]};
      border-right: 0px solid transparent;
      border-top: 34px solid transparent;
      border-bottom: 24px solid transparent;
      left: 0px;
      top: 0px;
      width: 0px;
    }
  }

  .show-detail {
    display: block;
  }

  .hide-detail {
    display: none;
  }

  .toggle-icon {
    display: block;

    .up-arrow {
      transform: rotate(90deg);
    }

    .down-arrow {
      transform: rotate(-90deg);
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .toggle-icon {
      display: none;
    }

    .hide-detail {
      display: block;
    }
  }
`;

export default styles;
