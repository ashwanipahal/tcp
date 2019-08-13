import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router'; // eslint-disable-line
import { requireNamedOnlineModule } from '../../../../../utils/resourceLoader';
import { Button, Row, Col, BodyCopy } from '../../../atoms';
import style from '../styles/GetCandid.style';
import withStyles from '../../../hoc/withStyles';
import { getAPIConfig } from '../../../../../utils';
import { PDP_PAGE_ID } from '../config';

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

  componentDidMount() {
    const candidSlot = 'tcp-get-candid-image-container';
    const apiKey = this.candidConfig.CANDID_API_KEY;

    const { pageTag } = 'homepage';

    requireNamedOnlineModule('getCandid').then(() => {
      window.candid.init({
        id: apiKey,
        tag: pageTag,
        containerId: candidSlot,
        ready: e => {
          if (e && e.data && e.data.data && e.data.data.length > 0) {
            document
              .getElementsByClassName('get-candid-button-container')[0]
              .classList.remove('displayNone');
            document
              .getElementsByClassName('get-candid-heading')[0]
              .classList.remove('displayNone');
            document.getElementById('get-candid-container').style = '7px solid #f7f7f7';
          }
        },
        empty: () => {
          document.getElementById('get-candid-container').style.display = 'none';
        },
      });
    });
  }

  handleUpload = () => {
    if (window.candid) {
      window.candid.upload(this.candidConfig.CAND_API_KEY, [], this.candidConfig.CAND_URL);
    }
  };

  handleViewGalleryClick = () => {
    const { pageType } = this.props;
    const icid = PDP_PAGE_ID;
    // window.location.href = `https://www.childrensplace.com/us/content/mystyleplace?icid=hp_s17_button_getcandid_070819_getcandid`;
    // window.location.href = `${window.location.origin}/us/content/mystyleplace?icid=${
    // eslint-disable-line icid[pageType]
    // }`;
    Router.push(`/gallery?icid=${icid[pageType]}`);
  };

  getDefaultHeading = () => {
    const { labels } = this.props;

    return (
      <div className="get-candid-default-heading test">
        <BodyCopy
          fontWeight="500"
          fontSize={['fs20', 'fs20', 'fs32']}
          textAlign="center"
          className="get-candid-main-heading"
          data-locator="get_candid_module_header_textImages_1"
        >
          {labels.title}
        </BodyCopy>

        <BodyCopy
          fontWeight="500"
          fontSize={['fs16', 'fs16', 'fs26']}
          textAlign="center"
          className="get-candid-heading-desc"
          data-locator="get_candid_module_header_textImages_2"
        >
          {labels.titleDescription}
        </BodyCopy>
      </div>
    );
  };

  render() {
    const { className, labels } = this.props;
    return (
      <section id="get-candid-container" className={className}>
        <Row centered>
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

        <Row centered>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <div id="tcp-get-candid-image-container" />
          </Col>
        </Row>
        <Row centered>
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
                type="button"
                className="gallery-button-left"
                data-locator="view_gallery_button"
              >
                {labels.BtnGallery}
              </Button>

              <Button
                onClick={this.handleUpload}
                buttonVariation="fixed-width"
                type="button"
                className="gellary-button-right"
                data-locator="add_photo_button"
              >
                {labels.BtnPhoto}
              </Button>
            </Col>
          </div>
        </Row>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: (state.Labels.modules && state.Labels.modules.getCandid) || {},
  };
};

export default connect(mapStateToProps)(withStyles(GetCandid, style));
export { GetCandid as GetCandidVanilla };
