import React from 'react';
/* eslint-disable */
import { PropTypes } from 'prop-types';
import { requireNamedOnlineModule } from '../../../../../utils/resourceLoader';
import { Button, Row, Col, BodyCopy, Heading } from '../../../atoms';
import styles from '../styles/GetCandid.style';
import withStyles from '../../../hoc/withStyles';
class GetCandid extends React.Component {
  static propTypes = {
    /* pageTag is used to get the subset of images */
    pageTag: PropTypes.string,
    /* bool value if default heading needs to be used */
    defaultHeading: PropTypes.bool,
    /* PageType is the page where the getcandid component is being called from */
    pageType: PropTypes.string,
    /* espotId is the espot key if you need a custom heading */
    espotId: PropTypes.string,
  };

  static defaultProps = {
    pageTag: 'homepage',
    defaultHeading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      apiKey: '070167ca-8287-4d41-a9bb-6b3850cae9b1',
      candidSlot: 'tcp-get-candid-image-container',
      icid: {
        pdp: 'pdp_na_na_na_03019_candid',
      },
    };
  }

  componentDidMount() {
    const { apiKey, candidSlot } = this.state;
    const { pageTag } = 'homepage'; // this.props;

    requireNamedOnlineModule('getCandid').then(() => {
      window.candid.init({
        id: apiKey,
        tag: pageTag,
        containerId: candidSlot,
        ready: function(e) {
          if (e && e.data && e.data.data) {
            if (e.data.data.length > 0) {
              document
                .getElementsByClassName('get-candid-button-container')[0]
                .classList.remove('displayNone');
              document
                .getElementsByClassName('get-candid-heading')[0]
                .classList.remove('displayNone');
              document.getElementById('get-candid-container').style.borderBottom =
                '7px solid #f7f7f7';
            }
          }
        },
        empty: function() {
          document.getElementById('get-candid-container').style.display = 'none';
        },
      });
    });
  }

  handleUpload = () => {
    if (window.candid) {
      window.candid.upload('070167ca-8287-4d41-a9bb-6b3850cae9b1', [], 'api.getcandid.com');
    }
  };

  handleViewGalleryClick = () => {
    const { pageType } = this.props;
    const { icid } = this.state;
    window.location.href = `${window.location.origin}/us/content/mystyleplace?icid=${
      icid[pageType]
    }`;
  };

  getDefaultHeading = () => {
    return (
      <div className="get-candid-default-heading">
        <BodyCopy
          fontWeight="500"
          fontSize={['fs20', 'fs20', 'fs32']}
          textAlign="center"
          className="get-candid-main-heading"
        >
          #mystylePLACE
        </BodyCopy>
        <BodyCopy
          fontWeight="500"
          fontSize={['fs16', 'fs16', 'fs26']}
          textAlign="center"
          className="get-candid-heading-desc"
        >
          Show us how you are celebrating every big and small occasion
        </BodyCopy>
      </div>
    );
  };

  render() {
    const { espotId, defaultHeading, className } = this.props;
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
          <div className="get-candid-button-container displayNone">
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
            >
              <Button
                onClick={this.handleViewGalleryClick}
                buttonVariation="variable-width"
                type="button"
                className="u-margin-right"
              >
                VIEW GALLERY
              </Button>

              <Button onClick={this.handleUpload} buttonVariation="variable-width" type="button">
                ADD YOUR PHOTO
              </Button>
            </Col>
          </div>
        </Row>
      </section>
    );
  }
}

export default withStyles(GetCandid, styles);
export { GetCandid as GetCandidVanilla };
//export default GetCandid;
