import { css } from 'styled-components';

export const modalStyles = css`
  .Content_Wrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .Benefit_Heading_Suffix {
    vertical-align: top;
  }

  .Benefit_Heading {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    border: none;
    display: block;
    height: auto;
    font-size: ${props => props.theme.typography.fontSizes.fs48};
    padding: 0px;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};

    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      font-size: ${props => props.theme.typography.fontSizes.fs36};
    }
  }

  .apply-now-subtext {
    @media ${props => props.theme.mediaQuery.smallMax} {
      font-size: ${props => props.theme.typography.fontSizes.fs18};
    }
  }

  .benefits-text {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    @media ${props => props.theme.mediaQuery.smallMax} {
      font-size: ${props => props.theme.typography.fontSizes.fs32};
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .button_wrapper {
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXL} auto;
    width: 349px;

    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 332px;
    }
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
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto;
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
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto;

    @media ${props => props.theme.mediaQuery.smallMax} {
      background: transparent url('/static/images/BenefitImageV.png') no-repeat 0 0;
      width: 331px;
      height: 600px;
      margin: 0px auto;
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
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto 0px;

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
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .footerLinks {
    display: flex;
    justify-content: center;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }

  .footerLink {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;

export default modalStyles;
