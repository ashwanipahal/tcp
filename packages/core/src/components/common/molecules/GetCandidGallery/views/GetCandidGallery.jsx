/* istanbul ignore file */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { BodyCopy, Button } from '../../../atoms';
import style from '../styles/GetCandidGallery.style';
import withStyles from '../../../hoc/withStyles';
import { requireNamedOnlineModule } from '../../../../../utils/resourceLoader';
import { getAPIConfig, getLabelValue } from '../../../../../utils';

const CANDID_GALLERY_CONTAINER_ID = 'tcp-get-candid-image-container';

class GetCandidGallery extends React.Component {
  constructor(props) {
    super(props);
    this.apiConfig = getAPIConfig();
  }

  componentDidMount() {
    this.injectGetCandidWallTemplate();
    this.initGetCandid();
  }

  getDefaultHeading = () => {
    const { labels } = this.props;

    return (
      <div>
        <BodyCopy
          className="heading"
          fontWeight="semibold"
          fontSize={['fs20', 'fs20', 'fs32']}
          textAlign="center"
          data-locator="get_gallery_page_header_text_1"
        >
          {labels.lbl_getCandid_title}
        </BodyCopy>

        <BodyCopy
          className="description"
          fontSize={['fs16', 'fs16', 'fs26']}
          textAlign="center"
          data-locator="get_gallery_page_header_text_2"
        >
          {labels.lbl_getCandid_titleDescription}
        </BodyCopy>
      </div>
    );
  };

  /**
   * Create a template script for the GetCandid Wall plugin and inject in
   * the head.
   */
  injectGetCandidWallTemplate = () => {
    const { labels } = this.props;
    const script = document.createElement('script');
    script.id = 'mediaTemplate';
    script.type = 'text/x-jsrender';
    script.innerHTML = `
      <div class="candid-wall-cell">
          <div class="candid-wall-overlay"></div>
          <div class="candid-wall-overlay-text">
              <div>${labels.lbl_getCandid_BtnShopNow}</div>
          </div>
          <a class='media' data-media-index='{{> Index }}'>
          <img data-original="{{> Media.Images.LowResolution.Url }}"
                alt="{{> Title }}"
                style="display:inline-block;" class="lazy">
        </a>
     </div>
    `;
    document.head.appendChild(script);
  };

  onUploadButton = () => {
    if (window && window.candid) {
      window.candid.upload(this.apiConfig.CAND_API_KEY, [], this.apiConfig.CAND_URL);
    }
  };

  initGetCandid = () => {
    const apiKey = this.apiConfig.CANDID_API_KEY;
    // DOC: https://support.getcandid.com/support/solutions/articles/5000524031-widget-properties
    // Load All js file in following order.
    /*
     * wallJs is required because sometimes when we switch back and forth using client side routing,
     * The gallery page breaks because the jsView is not available.
     */
    const allJsFileLoadPromise = ['jquery', 'wallJs', 'getCandid', 'getCandidIsotope'].reduce(
      (loadPromise, jsFile) => {
        return loadPromise.then(() => requireNamedOnlineModule(jsFile));
      },
      Promise.resolve()
    );

    allJsFileLoadPromise.then(() => {
      window.candid.wall(`#${CANDID_GALLERY_CONTAINER_ID}`, {
        id: apiKey,
        cluster: 'prod-2',
        layoutMode: 'packery',
        layout: 'isotope-packery',
        tag: 'gallery',
      });
    });
  };

  render() {
    const { className, labels } = this.props;

    return (
      <div className={className}>
        <div>{this.getDefaultHeading()}</div>

        <div className="button-container">
          <Button
            onClick={this.onUploadButton}
            buttonVariation="fixed-width"
            className="add-photo-btn"
            data-locator="get_gallery_page_add_photo_btn"
          >
            {labels.lbl_getCandid_BtnPhoto}
          </Button>
        </div>

        <div>
          <div id={CANDID_GALLERY_CONTAINER_ID} />
        </div>
      </div>
    );
  }
}

GetCandidGallery.defaultProps = {
  labels: {},
  className: '',
};

GetCandidGallery.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
};

const mapStateToProps = ({ Labels }) => {
  const getCandidLabelOf = label => getLabelValue(Labels, label, 'getCandid', 'global');

  const labels = {
    lbl_getCandid_title: getCandidLabelOf('lbl_getCandid_title'),
    lbl_getCandid_titleDescription: getCandidLabelOf('lbl_getCandid_titleDescription'),
    lbl_getCandid_BtnShopNow: getCandidLabelOf('lbl_getCandid_BtnShopNow'),
    lbl_getCandid_BtnPhoto: getCandidLabelOf('lbl_getCandid_BtnPhoto'),
  };

  return {
    labels,
  };
};

export default connect(mapStateToProps)(withStyles(GetCandidGallery, style));
export { GetCandidGallery as GetCandidGalleryVanilla };
