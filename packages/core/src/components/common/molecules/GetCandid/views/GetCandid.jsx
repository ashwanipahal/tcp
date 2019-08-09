import React from 'react';
import { PropTypes } from 'prop-types';
import Router from 'next/router';
import { requireNamedOnlineModule } from '../../../../../utils/resourceLoader';
import { Button, Row, Col, BodyCopy } from '../../../atoms';
import { getCandid as styles, candidContainer } from '../styles/GetCandid.style';
import withStyles from '../../../hoc/withStyles';
import { getCandidConfig } from '../../../../../utils';

class GetCandid extends React.Component {
  static propTypes = {
    /* bool value if default heading needs to be used */
    defaultHeading: PropTypes.bool,
    /* PageType is the page where the getcandid component is being called from */
    pageType: PropTypes.string,
    /* espotId is the espot key if you need a custom heading */
    espotId: PropTypes.string,
    /*calssName is required */
    className: PropTypes.string,
  };

  static defaultProps = {
    pageType: 'homepage',
    espotId: '',
    defaultHeading: false,
  };

  candidConfig = getCandidConfig();
  constructor(props) {
    super(props);
    console.log('.......candid Props', this.props);
    this.state = {
      apiKey: this.candidConfig.CAND_API_KEY,
      candidSlot: this.candidConfig.CAND_SLOT,
      icid: {
        pdp: this.candidConfig.CAND_PDP,
      },
    };
  }

  componentDidMount() {
    const { apiKey, candidSlot } = this.state;
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
            document.getElementById('get-candid-container').style = candidContainer;
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
    const { icid } = this.state;
    // window.location.href = `https://www.childrensplace.com/us/content/mystyleplace?icid=hp_s17_button_getcandid_070819_getcandid`;
    // window.location.href = `${window.location.origin}/us/content/mystyleplace?icid=${
    //   icid[pageType]
    // }`;
    Router.push('/gallery');
  };

  getDefaultHeading = () => {
    return (
      <div className="get-candid-default-heading test">
        <BodyCopy
          fontWeight="500"
          fontSize={['fs20', 'fs20', 'fs32']}
          textAlign="center"
          className="get-candid-main-heading"
        >
          {this.props.lables.title}
        </BodyCopy>
        <BodyCopy
          fontWeight="500"
          fontSize={['fs16', 'fs16', 'fs26']}
          textAlign="center"
          className="get-candid-heading-desc"
        >
          {this.props.lables.titleDescription}
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
                buttonVariation="variable-width"
                type="button"
                className="u-margin-right"
              >
                {this.props.lables.BtnGallery}
              </Button>

              <Button onClick={this.handleUpload} buttonVariation="variable-width" type="button">
                {this.props.lables.BtnPhoto}
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
// export default GetCandid;
