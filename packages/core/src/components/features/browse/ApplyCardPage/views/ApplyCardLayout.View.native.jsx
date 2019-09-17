import React from 'react';
import PropTypes from 'prop-types';
import ModalNative from '../../../../common/molecules/Modal';
import { Image } from '../../../../common/atoms';
import { ImageContainer } from '../styles/ApplyCardPage.style.native';

const headerImage = require('../../../../../../../core/src/assets/tcp-cc.png');

export class ApplyCardLayout extends React.PureComponent<Props> {
  toggleApplyCard = () => {
    const { applyCard } = this.state;
    this.setState({
      applyCard: !applyCard,
    });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { onRequestClose, labels } = this.props;
    const fullWidth = {
      width: '100%',
    };

    console.info('>>>> labelslabels------', labels);

    return (
      <ModalNative
        onRequestClose={onRequestClose}
        horizontalBar={false}
        headingAlign="center"
        headingFontFamily="secondary"
        fontSize="fs22"
        headerStyle={fullWidth}
      >
        <ImageContainer>
          <Image source={headerImage} width="70%" height="166px" />
        </ImageContainer>
      </ModalNative>
    );
  }
}

ApplyCardLayout.propTypes = {
  onRequestClose: PropTypes.bool.isRequired,
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
};

export default ApplyCardLayout;
