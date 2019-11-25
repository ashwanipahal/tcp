import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '../../../../common/hoc/withStyles';
import {
  PlaceCashContainer,
  PlaceCashTextWrapper,
  PlaceCashTncContainer,
} from '../styles/PlaceCashBanner.style.native';
import PlaceCashDetailsModal from './PlaceCashDetails.modal.view.native';

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
    const { labels, isEnabled, isOrderConfirmation } = this.props;
    const { isPlaceCasModalOpen } = this.state;

    const imgStyle = {
      height: 100,
      width: '100%',
      position: 'relative',
      top: 2,
      left: 2,
    };
    return isEnabled ? (
      <PlaceCashContainer>
        <ImageBackground source={{ uri: labels.imgUrl }} style={imgStyle}>
          <PlaceCashTextWrapper>
            <BodyCopy
              fontSize={isOrderConfirmation ? 'fs16' : 'fs18'}
              text={labels.title}
              textAlign="center"
            />
            <BodyCopy fontSize="fs14" text={labels.subTitle} />
            <PlaceCashTncContainer>
              <BodyCopy text={labels.tnc} fontSize="fs8" />
              <Anchor
                fontSizeVariation="small"
                underline
                noLink
                to=""
                fontSize="fs8"
                anchorVariation="primary"
                fontFamily="primary"
                text={labels.modalLink}
                dataLocator="detailslink"
                onPress={e => this.toggleShowDetailModal(e)}
              />
            </PlaceCashTncContainer>
          </PlaceCashTextWrapper>
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
        </ImageBackground>
      </PlaceCashContainer>
    ) : null;
  }
}

PlaceCashBanner.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isEnabled: PropTypes.isRequired,
};

export default withStyles(PlaceCashBanner);
export { PlaceCashBanner as PlaceCashBannerVanilla };
