import { css } from 'styled-components';
import { getStaticFilePath } from '@tcp/core/src/utils';

const styles = css`
  .imageSize {
    width: 60px;
    height: 60px;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background-size: contain;
    background-repeat: no-repeat;
  }

  .firstColImage {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    @media ${props => props.theme.mediaQuery.large} {
      flex-direction: row;
    }
  }
  .imageSizeSingle {
    width: 60px;
    height: 92px;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background-size: contain;
    background-repeat: no-repeat;
  }
  .AppDownload,
  .Gymboree_AppDownload {
    background-image: url(${getStaticFilePath('images/download-app.png')});
  }
  .ProductReview,
  .Gymboree_ProductReview {
    background-image: url(${getStaticFilePath('images/review.png')});
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .FacebookLink,
  .Gymboree_FacebookLink {
    background-image: url(${getStaticFilePath('images/facebook.png')});
  }
  .InstagramLink,
  .Gymboree_InstagramLink {
    background-image: url(${getStaticFilePath('images/instagram.png')});
  }
  .ChildProfile {
    background-image: url(${getStaticFilePath('images/child-birthday-profile.png')});
  }
  .SMSOptIn,
  .Gymboree_SMSOptIn {
    background-image: url(${getStaticFilePath('images/sms.png')});
  }
  .AddMailingAddress {
    background-image: url(${getStaticFilePath('images/mailingAddress.png')});
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
  .TwitterLink,
  .Gymboree_TwitterLink {
    background-image: url(${getStaticFilePath('images/twitter.png')});
  }
  .TwitterPhoto,
  .Gymboree_TwitterPhoto {
    background-image: url(${getStaticFilePath('images/share-twitter.png')});
  }

  .tileWrapper {
    border: 1px solid ${props => props.theme.colorPalette.gray[300]};
    background: ${props => props.theme.colors.WHITE};
    margin-left: ${props => (props.viewAll ? '' : props.theme.spacing.ELEM_SPACING.SM)};
    margin-right: ${props => (props.viewAll ? '' : props.theme.spacing.ELEM_SPACING.SM)};
    margin-bottom: ${props => (props.viewAll ? props.theme.spacing.ELEM_SPACING.LRG : '')};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
    min-height: ${props => (props.viewAll ? '240px' : '')};
    border-bottom: 2px solid
      ${props =>
        props.theme.isGymboree
          ? props.theme.colorPalette.orange[800]
          : props.theme.colorPalette.blue[500]};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => (props.viewAll ? '' : props.theme.spacing.LAYOUT_SPACING.MED)};
      margin-right: ${props => (props.viewAll ? '' : props.theme.spacing.LAYOUT_SPACING.MED)};
      min-height: 277px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: ${props => (props.viewAll ? '' : props.theme.spacing.ELEM_SPACING.XL)};
      margin-right: ${props => (props.viewAll ? '' : props.theme.spacing.ELEM_SPACING.XL)};
    }
  }

  .earnPointDesc {
    margin-bottom: ${props =>
      props.viewAll
        ? props.theme.spacing.ELEM_SPACING.XXL
        : props.theme.spacing.LAYOUT_SPACING.LRG};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 0;
    }
  }

  .activityTitleMargin {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 0;
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .earnExtraPointsTileImage {
    margin-top: ${props =>
      props.viewAll ? props.theme.spacing.ELEM_SPACING.XL : props.theme.spacing.LAYOUT_SPACING.MED};
    height: 96px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
  }

  .earnExtraPointsTileImageSingle {
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: ${props => (props.viewAll ? props.theme.spacing.LAYOUT_SPACING.SM : '')};
    }
  }
  .earnExtraPointsTileTextMargin {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
  }
`;

export default styles;
