import { css } from 'styled-components';

export const modalStyles = css`
  .close-modal {
    margin-right: 5px;
  }

  div.TCPModal__InnerContent.innerContent {
    padding: 21px;
  }

  .TCPModal__InnerContent {
    text-align: center;
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

  .Modal__Content__Wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .Modal_Heading {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    border: none;
    margin-bottom: 10px;
    display: block;
    height: auto;
    font-size: ${props => props.theme.fonts.fontSize.heading.large.h3}px;
    padding: 0;
    margin-top: 47px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 6px 0 10px;
      margin-bottom: 6px;
      margin-top: 22px;
    }
  }

  .learn_more_link {
    padding: 14px 0px 28px 0px;
  }

  .learn_more_link_wrapper {
    justify-content: space-around;
  }

  .ApplyNow__link__Wrapper {
    margin-top: 44px;
    text-align: center;
  }

  .ApplyNow__link {
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 20px;
    width: 349px;
    height: 51px;
  }

  .header-image {
    display: flex;
    justify-content: center;
    background: transparent url('/static/images/tcp-cc@2x.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 259px;
    height: 166px;
    object-fit: contain;
    margin: 20px auto;
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
    width: 400px;
    height: 69px;
    object-fit: contain;
    margin: auto;
  }

  .linkIconSeperator {
    margin-left: 10px;
  }

  .rewards__benefits {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 6px;
    }
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
    justify-content: center;
    padding-bottom: 33px;
  }

  .footerLink {
    margin-left: 28px;
  }
`;

export default modalStyles;
