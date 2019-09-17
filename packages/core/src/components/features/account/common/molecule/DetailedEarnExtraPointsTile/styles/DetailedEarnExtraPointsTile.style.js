import { css } from 'styled-components';

const styles = css`
  .imageSize {
    width: 60px;
    height: 60px;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background-size: contain;
    background-repeat: no-repeat;
  }
  .AppDownload {
    background-image: url('/static/images/download-app.png');
  }
  .ProductReview {
    background-image: url('/static/images/review.png');
  }
  .FacebookLink {
    background-image: url('/static/images/facebook.png');
  }
  .InstagramLink {
    background-image: url('/static/images/instagram.png');
  }
  .ChildProfile {
    background-image: url('/static/images/child-birthday-profile.png');
  }
  .SMSOptIn {
    background-image: url('/static/images/sms.png');
  }
  .AddMailingAddress {
    background-image: url('/static/images/mailingAddress.png');
  }
  .AddFavoriteStore {
    background-image: url('/static/images/store.png');
  }
  .AddShopperType {
    background-image: url('/static/images/survey.png');
  }

  .tileWrapper {
    border: 1px solid ${props => props.theme.colorPalette.gray[300]};
    background: ${props => props.theme.colors.WHITE};
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
    border-bottom: 2px solid
      ${props =>
        props.theme.isGymboree
          ? props.theme.colorPalette.orange[800]
          : props.theme.colorPalette.blue[500]};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .earnPointDesc {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .earnExtraPointsTileImage {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    height: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export default styles;
