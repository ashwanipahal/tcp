import { css } from 'styled-components';

const CouponDetailModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 60px;
  }

  .imageSizeSingle {
    width: 70px;
    height: 80px;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background-size: contain;
    background-repeat: no-repeat;
  }

  .buttonWrapper {
    margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  }

  .earnExtraPointsTileImage {
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
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

  .FeedbackSurvey {
    background-image: url('/static/images/oval.svg');
  }

  .TwitterLink {
    background-image: url('/static/images/twitter.png');
  }
`;

export default CouponDetailModalStyle;
