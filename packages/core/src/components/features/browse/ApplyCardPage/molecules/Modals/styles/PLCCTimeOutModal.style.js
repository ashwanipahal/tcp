import { css } from 'styled-components';

export const modalStyles = css`
  .close-modal {
    margin-right: 5px;
  }

  .TCPModal__InnerContent {
    text-align: center;
    && {
      padding: 21px;
    }
    > h2 {
      ::after {
        content: '§';
        display: inline-block;
        height: 10px;
        width: 10px;
        vertical-align: top;
        font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;
      }
    }
  }

  .modal_content {
    justify-content: center;
  }

  .Modal__Content__Wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .restart_application_button {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px 0px 0px;
  }

  .info_text_margin {
    margin: 9px 0px;
  }

  .header-image {
    display: flex;
    justify-content: center;
    background: transparent url('/static/images/tcp-cc@2x.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 175px;
    height: 112px;
    object-fit: contain;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XL} auto 0;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-top: 57px;
    }
  }

  .returnto_checkout {
    font-weight: normal;
  }

  .offer_info_icon {
    display: flex;
    justify-content: center;
    background: ${props =>
      props.offerType
        ? `transparent url('/static/images/PLCC_lockup_1_points.svg') no-repeat 0 0;`
        : `transparent url('/static/images/PLCC_lockup_2_points.svg') no-repeat 0 0;`};

    background-size: contain;
    border: none;
    width: 344px;
    height: 66px;
    object-fit: contain;
    margin: auto;
  }

  .linkIconSeperator {
    margin-left: 10px;
  }

  .rewards__benefits {
    margin: 21px 0 0 21px;
    > li {
      font-size: ${props => props.theme.fonts.fontSize.body.large.secondary}px;
      width: 355px;
      text-align: left;
      ::before {
        content: url('/static/images/confirmation_check.svg');
        display: inline-block;
        height: 10px;
        width: 10px;
        margin-right: 15px;
        padding-top: 9px;
        vertical-align: -25%;
      }
    }
  }

  .footerLinks {
    display: flex;
    margin-top: 38px;
    > span {
      padding-left: 67px;
    }
    padding-bottom: 33px;
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px;
    }
  }

  .footerLink {
    margin-left: 28px;
  }
`;

export default modalStyles;
