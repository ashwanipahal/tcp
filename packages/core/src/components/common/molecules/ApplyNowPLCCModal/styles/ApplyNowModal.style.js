import { css } from 'styled-components';

export const modalStyles = css`
  .close-modal {
    margin-right: 5px;
  }

  .TCPModal__InnerContent {
    text-align: center;
    > h2 {
      ::after {
        content: '§';
        display: inline-block;
        height: 10px;
        width: 10px;
        vertical-align: 149%;
        font-size: 16px;
        padding-top: 9px;
      }
    }
  }

  .Modal__Content__Wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px 26px;
    }
  }

  .Modal_Heading {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    border: none;
    margin-bottom: 10px;
    display: block;
    height: auto;
    font-size: 39px;
    padding: 0;
    margin-top: 47px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin: 6px 0 10px;
      margin-bottom: 6px;
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy12}px;
      margin-top: 22px;
    }
  }

  .learn_more_link {
    font-size: ${props => props.theme.fonts.fontSize.nav}px;
    color: ${props => props.theme.colors.PRIMARY.BLUE};
    text-align: center;
    padding: 14px 0px 28px 0px;
    text-underline-position: under;
    text-decoration: underline;
  }

  .learn_more_link_wrapper {
    justify-content: space-around;
  }

  .ApplyNow__link__Wrapper {
    margin-top: 15px;
  }

  .ApplyNow__link {
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    letter-spacing: 1px;
    text-align: center;
  }

  .header__greeting {
    margin: 9px 9px;
    width: 353px;
  }

  .header-image {
    display: flex;
    justify-content: center;
    background: transparent url('/static/images/tcp-cc@2x.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 211px;
    height: 135px;
    object-fit: contain;
    margin: auto;
  }

  .offer_info_icon {
    display: flex;
    justify-content: center;
    background: transparent url('/static/images/PLCC_lockup_2_points.svg') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 344px;
    height: 66px;
    object-fit: contain;
    margin: auto;
  }

  .linkIconSeperator {
    font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    text-underline-position: under;
    text-decoration: underline;
    margin-left: 10px;
  }

  .rewards__benefits {
    margin: 21px 0 0 21px;
    > li {
      font-size: 13px;
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
    font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    margin-left: 28px;
    text-underline-position: under;
    text-decoration: underline;
  }
`;

export default modalStyles;
