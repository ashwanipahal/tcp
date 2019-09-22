import React from 'react';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { BodyCopy, RichText, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import styles from './styles/ExtraPointsDetailModal.style';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param waysToEarnRow - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */
class ExtraPointsDetailModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    waysToEarnRow: PropTypes.shape({}),
    onRequestClose: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    className: '',
    waysToEarnRow: {},
  };

  onRequestClosePopup = () => {
    const { onRequestClose } = this.props;
    onRequestClose(null);
  };

  /**
   * This function use for return the JSX of the component
   * can be passed in the component.
   * @param waysToEarnRow - this is waysToEarnRow data used for show Activity details
   */

  getModalMarkup = () => {
    const { className, waysToEarnRow } = this.props;
    const activeActivity = waysToEarnRow.activityModal;

    return (
      <div className={className}>
        <BodyCopy component="div" className="earnExtraPointsTileImage">
          <BodyCopy component="div" className={`imageSizeSingle ${waysToEarnRow.activityCode}`} />
        </BodyCopy>
        <BodyCopy
          fontSize="fs18"
          fontWeight="black"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-MED"
          data-locator={`earnPointsModal_${activeActivity.activityModalAction}_title`}
        >
          {activeActivity.activityModalTitle}
        </BodyCopy>
        <BodyCopy
          component="div"
          fontSize="fs16"
          fontWeight="black"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-MED"
          data-locator={`earnPointsModal_${activeActivity.activityModalAction}_shortTitle`}
        >
          {activeActivity.activityModalShortTitle}
        </BodyCopy>

        <BodyCopy
          component="div"
          fontSize="fs14"
          fontWeight="regular"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-MED"
          data-locator={`earnPointsModal_${activeActivity.activityModalAction}_ShortDesc`}
        >
          <RichText richTextHtml={activeActivity.activityModalLongDescription} />
        </BodyCopy>
        <BodyCopy component="div" textAlign="center">
          <Button
            fill="BLUE"
            buttonVariation="fixed-width"
            data-locator={`earnPointsModal_${activeActivity.activityModalAction}_activityCta`}
            fullWidth
          >
            {activeActivity.activityModalCtaText}
          </Button>
        </BodyCopy>
      </div>
    );
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { openState } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={this.onRequestClosePopup}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="500px"
        minHeight="450px"
        fixedWidth
        closeIconDataLocator="ExtraPointsDetailModal_crossIcon"
      >
        {this.getModalMarkup()}
      </Modal>
    );
  }
}

export default withStyles(ExtraPointsDetailModal, styles);
export { ExtraPointsDetailModal as ExtraPointsDetailModalVanilla };
