import { css } from 'styled-components';
import { getIconPath, getStaticFilePath } from '@tcp/core/src/utils';

export const modalStyles = css`
  .close-modal {
    margin-right: 5px;
    ${props => (props.isRtpsFlow ? 'display:none' : '')};
  }
  .apply-now-heading {
    font-family: ${props => props.theme.typography.fonts.primary};
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXXL} 0px
      ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  div.TCPModal__InnerContent.innerContent {
    padding: 21px;
  }

  div.TCPModal__InnerContent {
    text-align: center;
    div > h2 {
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
    padding: 16px 0px 12px 0px;
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
    margin-top: 9px;
  }

  .header-image {
    display: flex;
    justify-content: center;
    background: transparent url(${getStaticFilePath('images/tcp-cc@2x.png')}) no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 175px;
    height: 112px;
    object-fit: contain;
    margin: auto;
  }

  .offer_info_icon {
    display: flex;
    justify-content: center;
    background: ${props =>
      props.offerType
        ? `transparent url(${getStaticFilePath('images/PLCC_lockup_1_points.svg')}) no-repeat 0 0;`
        : `transparent url(${getStaticFilePath(
            'images/PLCC_lockup_2_points.svg'
          )}) no-repeat 0 0;`};

    background-size: contain;
    border: none;
    width: 344px;
    height: 66px;
    object-fit: contain;
    margin: auto;
  }

  .linkIconSeperator {
    margin-left: 10px;
    font-size: ${props => props.theme.typography.fontSizes.fs12};
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
        content: url(${getIconPath('confirmation-check')});
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
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    justify-content: center;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .footerLink {
    margin-left: 28px;
    font-size: ${props => props.theme.typography.fontSizes.fs12};
  }

  div.TCPModal__InnerContent.plcc_modal_content {
    height: 100vh;
  }

  .separator {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    border-top: 1px solid ${props => props.theme.colors.TEXT.GRAY};
  }
`;

export default modalStyles;
