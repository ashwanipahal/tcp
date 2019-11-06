import { css } from 'styled-components';

export const modalStyles = css`

  .Benefit_Heading_Suffix {
    vertical-align: top;
  }

  .Benefit_Heading {
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
      font-size: ${props => props.theme.typography.fontSizes.fs48};
    }
  }

  .apply-now-subtext {
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs22};
    }
  }

  .benefits-text {
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs48};
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .button_wrapper {
    @media ${props => props.theme.mediaQuery.small} {
      width: 350px;
    }
    width:100%
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXL} auto;
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
    @media ${props => props.theme.mediaQuery.medium} {
      background: transparent url('/static/images/BenefitImageH.png') no-repeat 0 0;
      background-size: 100%;
      height: 300px;
    }
    display: flex;
    justify-content: center;
    background: transparent url('/static/images/BenefitImageV.png') no-repeat 0 0;
    background-size: contain;
    object-fit: contain;
    height: 600px;
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto;
  }

  .offer_info_icon {
    @media ${props => props.theme.mediaQuery.medium} {
      width: 400px;
    }
    display: flex;
    justify-content: center;
    background: ${props =>
      props.offerType
        ? `transparent url('/static/images/PLCC_lockup_1_points.svg') no-repeat 0 0;`
        : `transparent url('/static/images/PLCC_lockup_2_points.svg') no-repeat 0 0;`};
    width: 332px;
    height: 69px;
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto;
  }

  .withMyPlaceRewardText {
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs22};
    }
  }

  .footerLinks {
    display: flex;
    justify-content: center;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;

export default modalStyles;
