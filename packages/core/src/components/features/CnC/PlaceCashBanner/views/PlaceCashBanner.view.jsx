import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/PlaceCashBanner.style';
import { BodyCopy, Row, Col, DamImage, Anchor } from '../../../../common/atoms';
import PlaceCashDetailsModal from './PlaceCashDetails.modal.view';
/**
 * PlaceCashBanner Component
 * @description Display User's place cash value earned
 * @param {*} label
 * @param {Boolean} isEnabled
 * @returns {JSX}
 */

class PlaceCashBanner extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isPlaceCasModalOpen: false,
    };
  }

  toggleShowDetailModal = e => {
    e.preventDefault();
    const { isPlaceCasModalOpen } = this.state;
    this.setState({
      isPlaceCasModalOpen: !isPlaceCasModalOpen,
    });
  };

  render() {
    const { labels, className, isEnabled } = this.props;
    const { isPlaceCasModalOpen } = this.state;

    return isEnabled ? (
      <div className={className}>
        <div className="place-cash">
          <Row className="place-cash__container">
            <Col
              key="placeCashBanner"
              className="place-cash__row"
              colSize={{ small: 6, medium: 8, large: 12 }}
              textAlign="center"
            >
              {/* Fix Me: with given zeplin assets transforms are not working properly
              need correct zeplin assets : mod_placeBug_bag_d */}
              <DamImage
                className="place-cash__img"
                imgConfigs={[]}
                width="100%"
                imgData={{
                  url: labels.imgUrl,
                  alt: labels.imgUrl,
                }}
              />
              <div className="place-cash__text-wrapper">
                <BodyCopy
                  component="h3"
                  fontSize={['fs10', 'fs10', 'fs14']}
                  fontFamily="primary"
                  fontWeight="bold"
                  textAlign="center"
                  className="place-cash__title"
                  data-locator="place-cash_info_text"
                >
                  {labels.title}
                </BodyCopy>
                <BodyCopy
                  component="h4"
                  fontSize={['fs10', 'fs9', 'fs12']}
                  fontFamily="primary"
                  textAlign="center"
                  className="place-cash__subTitle"
                  data-locator="place-cash_info_text"
                >
                  {labels.subTitle}
                </BodyCopy>
                <div className="place-cash__tnc-container">
                  <BodyCopy
                    component="span"
                    fontFamily="primary"
                    textAlign="center"
                    className="place-cash__tnc-text"
                    data-locator="place-cash_info_text"
                  >
                    {labels.tnc}
                  </BodyCopy>
                  <Anchor
                    fontSizeVariation="medium"
                    underline
                    href="#"
                    anchorVariation="primary"
                    fontFamily="primary"
                    title={labels.label4}
                    dataLocator="detailslink"
                    className="place-cash__modalLink"
                    onClick={e => this.toggleShowDetailModal(e)}
                  >
                    {labels.modalLink}
                  </Anchor>
                </div>
              </div>
              <PlaceCashDetailsModal
                labels={labels}
                openState={isPlaceCasModalOpen}
                onRequestClose={() => {
                  this.setState({
                    isPlaceCasModalOpen: false,
                  });
                }}
                heading={labels.detailModalTitle}
              />
            </Col>
          </Row>
        </div>
      </div>
    ) : null;
  }
}

PlaceCashBanner.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  isEnabled: PropTypes.bool.isRequired,
};

PlaceCashBanner.defaultProps = {
  className: '',
};

export default withStyles(PlaceCashBanner, styles);
export { PlaceCashBanner as PlaceCashBannerVanilla };
