import React from 'react';
import { PropTypes } from 'prop-types';
import { bin2hex, md5 } from '../encoding';
import cssClassName from '../../../../../../../utils/cssClassName';
import { requireUrlScript } from '../../../../../../../utils/resourceLoader';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductReviewsStyle from '../ProductReviews.style';
import { getLocator } from '../../../../../../../utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';

class ProductReviews extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    const { expanded } = this.props;
    this.state = {
      isLoading: true,
      expanded,
    };
    this.captureContainerRef = this.captureContainerRef.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.bindWriteReviewClick = this.bindWriteReviewClick.bind(this);
  }

  componentDidMount() {
    const { bazaarvoiceApiUrl } = this.props;
    return requireUrlScript(bazaarvoiceApiUrl).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  }

  bindWriteReviewClick() {
    const { ratingsProductId } = this.props;
    const containerDivId = `BVRRContainer-${ratingsProductId}`;
    const summaryContainerDiv = `BVRRSummaryContainer-${ratingsProductId}`;
    const buttons = document.querySelectorAll(
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
    const { isGuest, onLoginClick } = this.props;
    if (isGuest) {
      event.preventDefault();
      event.stopPropagation();
      onLoginClick();
      return false;
    }
    return false;
  }

  captureContainerRef(ref) {
    const { ratingsProductId, isGuest, userId, mprId } = this.props;
    this.containerRef = ref;

    const scope = 'rr';
    const action = 'show_reviews';
    const containerDivId = `BVRRContainer-${ratingsProductId}`;
    const options = {
      contentContainerDiv: containerDivId,
      productId: ratingsProductId,
      summaryContainerDiv: `BVRRSummaryContainer-${ratingsProductId}`,
    };

    document
      .getElementById(containerDivId)
      .addEventListener('DOMSubtreeModified', this.bindWriteReviewClick);

    if (window.$BV) {
      // NODE: this code was taken (as is) from TCP production
      if (!isGuest) {
        // define the sharedKey
        const sharedKey = 'Fca3yih00AVeVDFvmaDwnwlWM';

        // obtain current date in the format of yyyyMMdd
        const rightNow = new Date();
        const res = rightNow
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '');
        const queryString = `date=${res.toString()}&userid=${userId}&MprId=${mprId}`;
        // define unhashed security key
        const unhashed = sharedKey.toString().concat(queryString.toString());

        // obtain HEX representation of queryString
        const hexQueryString = bin2hex(queryString);

        // obtain MD5 hash of the unhashed security key
        const hashed = md5(unhashed);

        const securityToken = hashed.toString() + hexQueryString.toString();

        window.$BV.configure('global', {
          productId: ratingsProductId,
          userToken: securityToken.toString(),
        });
      } else {
        window.$BV.configure('global', {
          productId: ratingsProductId,
        });
      }

      window.$BV.ui(scope, action, options);
    }
  }

  handleToggle() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  render() {
    const { expanded, isLoading } = this.state;
    const {
      className,
      reviewsCount,
      isClient,
      ratingsProductId,
      ratingsAndReviewsLabel,
    } = this.props;

    if (isLoading || !isClient) {
      return null;
    }

    const accordionClassName = cssClassName('ratings-and-reviews-accordion ', {
      'accordion-expanded ': expanded,
    });

    return (
      <div
        className={`${className} ${accordionClassName}`}
        data-locator={getLocator('pdp_rating_reviews')}
      >
        <BodyCopy
          className="accordion-button-toggle"
          component="div"
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="black"
          onClick={this.handleToggle}
          data-locator={getLocator('pdp_rating_reviews_title')}
        >
          {ratingsAndReviewsLabel.lbl_ratings_and_reviews}
          <span data-locator={getLocator('pdp_rating_reviews_count')}>{`(${reviewsCount})`}</span>
        </BodyCopy>
        <div
          id={`BVRRContainer-${ratingsProductId}`}
          ref={this.captureContainerRef}
          className={`ratings-and-reviews-container ${accordionClassName}`}
        />
      </div>
    );
  }
}

ProductReviews.propTypes = {
  ratingsProductId: PropTypes.string.isRequired,
  isClient: PropTypes.bool.isRequired,
  isGuest: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  mprId: PropTypes.string,
  expanded: PropTypes.bool,
  className: PropTypes.string,
  reviewsCount: PropTypes.number,
  bazaarvoiceApiUrl: PropTypes.string,
  onLoginClick: PropTypes.func,
  ratingsAndReviewsLabel: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

ProductReviews.defaultProps = {
  expanded: true,
  userId: '',
  mprId: '',
  className: '',
  reviewsCount: 0,
  ratingsAndReviewsLabel: '',
  bazaarvoiceApiUrl: '',
  onLoginClick: () => {},
};

export default withStyles(ProductReviews, ProductReviewsStyle);
export { ProductReviews as ProductReviewsVanilla };
