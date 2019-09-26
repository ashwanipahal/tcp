/* eslint-disable */
import React from 'react';
import { PropTypes } from 'prop-types';
import { bin2hex, md5 } from '../encoding';
import cssClassName from '../../../../../../../utils/cssClassName';
import { requireUrlScript } from '../../../../../../../utils/resourceLoader';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductReviewsStyle from '../ProductReviews.style';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';

class ProductReviews extends React.Component {
  static propTypes = {
    /** id of the product - for BV */
    ratingsProductId: PropTypes.string.isRequired,

    /** indicates the it's broqwser mode, I want it as prop to force a re-render on client */
    isClient: PropTypes.bool.isRequired,

    /** Flag indicates whether the user is a guest */
    isGuest: PropTypes.bool.isRequired,

    userId: PropTypes.string,
    /** MPR ID of the User */
    mprId: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      expanded: this.props.expanded,
    };

    this.captureContainerRef = this.captureContainerRef.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.bindWriteReviewClick = this.bindWriteReviewClick.bind(this);
  }

  componentDidMount() {
    // TODO remove hardcode url
    const bazaarvoiceApiUrl =
      'https://display.ugc.bazaarvoice.com/static/ChildrensPlace/en_US/bvapi.js';
    return requireUrlScript(bazaarvoiceApiUrl).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  }

  bindWriteReviewClick() {
    let containerDivId = 'BVRRContainer-' + this.props.ratingsProductId;
    let summaryContainerDiv = 'BVRRSummaryContainer-' + this.props.ratingsProductId;

    let buttons = document.querySelectorAll(
      `#${containerDivId} button.bv-write-review, #${containerDivId} .bv-write-review-label, #${summaryContainerDiv} button.bv-write-review, #${summaryContainerDiv} .bv-write-review-label`
    );
    if (buttons.length > 0) {
      document
        .getElementById(containerDivId)
        .removeEventListener('DOMSubtreeModified', this.bindWriteReviewClick);

      [].forEach.call(buttons, button => {
        button.addEventListener('click', this.handleLoginClick);
      });
    }
  }

  handleLoginClick(event) {
    if (this.props.isGuest) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onLoginClick();
      return false;
    }
  }

  captureContainerRef(ref) {
    this.containerRef = ref;

    let scope = 'rr';
    let action = 'show_reviews';
    let containerDivId = 'BVRRContainer-' + this.props.ratingsProductId;
    let options = {
      contentContainerDiv: containerDivId,
      productId: this.props.ratingsProductId,
      summaryContainerDiv: 'BVRRSummaryContainer-' + this.props.ratingsProductId,
    };

    document
      .getElementById(containerDivId)
      .addEventListener('DOMSubtreeModified', this.bindWriteReviewClick);

    if (window.$BV) {
      // NODE: this code was taken (as is) from TCP production
      if (!this.props.isGuest) {
        // define the sharedKey
        let sharedKey = 'Fca3yih00AVeVDFvmaDwnwlWM';

        // obtain current date in the format of yyyyMMdd
        let rightNow = new Date();
        let res = rightNow
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '');
        let queryString =
          'date=' + res.toString() + '&userid=' + this.props.userId + '&MprId=' + this.props.mprId;
        // define unhashed security key
        let unhashed = sharedKey.toString().concat(queryString.toString());

        // obtain HEX representation of queryString
        let hexQueryString = bin2hex(queryString);

        // obtain MD5 hash of the unhashed security key
        // var hashed = CryptoJS.MD5(unhashed);
        let hashed = md5(unhashed);

        let securityToken = hashed.toString() + hexQueryString.toString();

        window.$BV.configure('global', {
          productId: this.props.ratingsProductId,
          userToken: securityToken.toString(),
        });
      } else {
        window.$BV.configure('global', {
          productId: this.props.ratingsProductId,
        });
      }

      window.$BV.ui(scope, action, options);
    }
  }

  handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    let { expanded } = this.state;
    const { isMobile, className } = this.props;
    console.info('expanded', expanded);

    if (this.state.isLoading || !this.props.isClient) {
      return null;
    }

    let accordionClassName = cssClassName(
      'ratings-and-reviews-accordion ',
      { 'accordion ': isMobile },
      { 'accordion-expanded ': expanded }
    );

    return (
      <div className={`${className} ${accordionClassName}`}>
        <div className="accordion-button-toggle" onClick={this.handleToggle}>
          Ratings & Reviews
          <button className="accordion-toggle" title="Ratings & Reviews">
            Ratings & Reviews
          </button>
        </div>
        <div
          id={'BVRRContainer-' + this.props.ratingsProductId}
          ref={this.captureContainerRef}
          className={`ratings-and-reviews-container ${accordionClassName}`}
        />
      </div>
    );
  }
}

export default withStyles(ProductReviews, ProductReviewsStyle);
export { ProductReviews as ProductReviewsVanilla };
