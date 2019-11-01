import { css } from 'styled-components';

export const modalStyles = css`
  .Modal__Content__Wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .Benefit_Heading {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    border: none;
    display: block;
    height: auto;
    font-size: ${props => props.theme.typography.fontSizes.fs48};
    padding: 0;
    margin-top: 40px;

    @media ${props => props.theme.mediaQuery.smallMax} {
      margin: 6px 0 10px;
      margin-bottom: 6px;
      margin-top: 22px;
      font-size: ${props => props.theme.typography.fontSizes.fs36};
    }
  }

  .apply-now-subtext {
    @media ${props => props.theme.mediaQuery.smallMax} {
      font-size: ${props => props.theme.typography.fontSizes.fs18};
    }
  }

  .benefits-text {
    margin-top: 40px;
    @media ${props => props.theme.mediaQuery.smallMax} {
      font-size: ${props => props.theme.typography.fontSizes.fs32};
      margin-top: 35px;
    }
  }

  .Benefit_Heading_Suffix {
    align-items: center;
  }

  .ApplyNow__link__Wrapper {
    margin-top: 24px;
    text-align: center;
  }

  .ApplyNow__link {
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    letter-spacing: 1px;
    text-align: center;
    margin-top: 20px;
    width: 349px;
    height: 51px;

    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 332px;
      height: 42px;
    }
  }

  .blackFontColor {
    color: #000000;
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

  .table-image {
    display: flex;
    justify-content: center;
    background: transparent url('/static/images/BenefitImageH.png') no-repeat 0 0;
    background-size: contain;
    border: none;
    width: 920px;
    height: 370px;
    object-fit: contain;
    margin: 20px auto;

    @media ${props => props.theme.mediaQuery.smallMax} {
      background: transparent url('/static/images/BenefitImageV.png') no-repeat 0 0;
      width: 331px;
      height: 600px;
      margin: 0 auto;
    }
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
    margin: 23px auto 0;

    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 332px;
    }
  }

  .withMyPlaceRewardText {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};

    @media ${props => props.theme.mediaQuery.smallMax} {
      font-size: ${props => props.theme.typography.fontSizes.fs18};
    }
  }

  .linkIconSeperator {
    margin-left: 10px;
  }

  .footerLinks {
    display: flex;
    justify-content: center;
    padding-bottom: 33px;
  }

  .footerLink {
    margin-left: 28px;
  }
`;

export default modalStyles;
