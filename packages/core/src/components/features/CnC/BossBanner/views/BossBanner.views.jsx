import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BOSSBannerStyle from '../styles/BossBanner.style';

class BOSSBanner extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <BOSSBannerStyle>
          <Row tagName="ul" className="banner">
            <Col
              tagName="li"
              key="productDetails"
              className="pickUp"
              colSize={{ small: 6, medium: 8, large: 12 }}
            >
              <span>PICK UP IN STORE AND SAVE EXTRA 5%</span>
            </Col>
          </Row>
          <Row tagName="ul" className="bossText">
            <Col tagName="li" key="productDetails" colSize={{ small: 6, medium: 8, large: 12 }}>
              <span className="bossText">Simply choose</span>
              <span className="bossText noRush">“NO RUSH Pick Up”</span>
              <span className="bossText">in your bag before checking out.</span>
            </Col>
          </Row>
        </BOSSBannerStyle>
      </React.Fragment>
    );
  }
}
export default BOSSBanner;
