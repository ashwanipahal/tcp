import { css } from 'styled-components';
import { getStaticFilePath } from '@tcp/core/src/utils';

const CouponDetailModalStyle = css`
  @media ${props => props.theme.mediaQuery.medium} {
    margin: 0 60px;
  }
  .earnPointsModal_title {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
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
    margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
    }
  }

  .earnExtraPointsTileImage {
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .AppDownload {
    background-image: url(${getStaticFilePath('images/download-app.png')});
  }
  .ProductReview {
    background-image: url(${getStaticFilePath('images/review.png')});
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .FacebookLink {
    background-image: url(${getStaticFilePath('images/facebook.png')});
  }
  .InstagramLink {
    background-image: url(${getStaticFilePath('images/instagram.png')});
  }
  .ChildProfile {
    background-image: url(${getStaticFilePath('images/child-birthday-profile.png')});
  }
  .SMSOptIn {
    background-image: url(${getStaticFilePath('images/sms.png')});
  }
  .AddMailingAddress {
    background-image: url(${getStaticFilePath('images/mailingAddress.png')});
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .AddFavoriteStore {
    background-image: url(${getStaticFilePath('images/store.png')});
  }
  .AddShopperType {
    background-image: url(${getStaticFilePath('images/survey.png')});
  }
  .AddBirthDate {
    background-image: url(${getStaticFilePath('images/birthday.png')});
  }

  .FeedbackSurvey {
    background-image: url(${getStaticFilePath('images/oval.svg')});
  }

  .TwitterLink {
    background-image: url(${getStaticFilePath('images/twitter.png')});
  }
`;

export default CouponDetailModalStyle;
