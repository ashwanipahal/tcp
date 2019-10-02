import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { requireNamedOnlineModule } from '../../../../../utils/resourceLoader';
import { Button, Row, Col, BodyCopy } from '../../../atoms';
import style from '../styles/GetCandid.style';
import withStyles from '../../../hoc/withStyles';
import { getAPIConfig, routerPush } from '../../../../../utils';
import withLazyLoad from '../../../hoc/withLazyLoad';

class GetCandid extends React.PureComponent {
  static propTypes = {
    /* PageType is the page where the getcandid component is being called from */
    // eslint-disable-next-line
    pageType: PropTypes.string,
    /* calssName is required */
    className: PropTypes.string,
    /* Labels */
    labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  };

  static defaultProps = {
    pageType: 'homepage',
    className: '',
    labels: {},
  };

  candidConfig = getAPIConfig();

  constructor(props) {
    super(props);
    this.state = {
      getCandidDataLoaded: false,
    };
  }

  componentDidMount() {
    const candidSlot = 'tcp-get-candid-image-container';
    const apiKey = this.candidConfig.CANDID_API_KEY;

    const pageTag = 'homepage';

    requireNamedOnlineModule('getCandid').then(() => {
      window.candid.init({
        id: apiKey,
        tag: pageTag,
        containerId: candidSlot,
        ready: () => this.setState({ getCandidDataLoaded: true }),
      });
    });
  }

  handleUpload = () => {
    if (window.candid) {
      window.candid.upload(this.candidConfig.CAND_API_KEY, [], this.candidConfig.CAND_URL);
    }
  };

  handleViewGalleryClick = () => {
    // window.location.href = `https://www.childrensplace.com/us/content/mystyleplace?icid=hp_s17_button_getcandid_070819_getcandid`;
    // window.location.href = `${window.location.origin}/us/content/mystyleplace?icid=${
    // eslint-disable-line icid[pageType]
    // }`;
    routerPush('/content?contentType=mystyleplace', '/content/mystyleplace');
  };

  getDefaultHeading = () => {
    const { labels } = this.props;

    return (
      <div className="get-candid-default-heading">
        <BodyCopy
          fontWeight="semibold"
          fontSize={['fs20', 'fs20', 'fs32']}
          textAlign="center"
          className="get-candid-main-heading"
          data-locator="get_candid_module_header_textImages_1"
        >
          {labels.lbl_getCandid_title}
        </BodyCopy>

        <BodyCopy
          fontSize={['fs16', 'fs16', 'fs26']}
          textAlign="center"
          className="get-candid-heading-desc"
          data-locator="get_candid_module_header_textImages_2"
        >
          {labels.lbl_getCandid_titleDescription}
        </BodyCopy>
      </div>
    );
  };

  render() {
    const { className, labels } = this.props;
    const { getCandidDataLoaded } = this.state;
    const hideOnLoadingClassName = getCandidDataLoaded ? '' : 'hide';
    /*
       Carousel does not render correctly if we display:none whole component
       on no data. Using this to fix unnecessary height on flex element.
    */
    const noFlexClassName = getCandidDataLoaded ? '' : 'no-flex';

    return (
      <section id="get-candid-container" className={className}>
        <Row className={hideOnLoadingClassName} centered>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            {this.getDefaultHeading()}
          </Col>
        </Row>

        <Row className={noFlexClassName} centered>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            className={noFlexClassName}
          >
            <div id="tcp-get-candid-image-container" />
          </Col>
        </Row>
        <Row className={hideOnLoadingClassName} centered>
          <div className="get-candid-button-container">
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
            >
              <Button
                onClick={this.handleViewGalleryClick}
                buttonVariation="fixed-width"
                className="gallery-button-left"
                data-locator="view_gallery_button"
              >
                {labels.lbl_getCandid_BtnGallery}
              </Button>

              <Button
                onClick={this.handleUpload}
                buttonVariation="fixed-width"
                className="gellary-button-right"
                data-locator="add_photo_button"
              >
                {labels.lbl_getCandid_BtnPhoto}
              </Button>
            </Col>
          </div>
        </Row>
      </section>
    );
  }
}

export const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.getCandid,
  };
};

export default connect(mapStateToProps)(withStyles(withLazyLoad(GetCandid), style));
export { GetCandid as GetCandidVanilla };
