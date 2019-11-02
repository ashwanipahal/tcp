import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BonusPointsSection from '../../../organism/BonusPointsSection';
import BonusPointsReadSection from '../../../organism/BonusPointsReadSection';
import Modal from '../../../../../molecules/Modal';
import RichText from '../../../../../atoms/RichText';
import withStyles from '../../../../../hoc/withStyles';
import styles, { modalstyles } from '../styles/BonusPoints.view.style';
import constants from '../../../BonusPointsDays.constants';

class BonusPointsView extends React.Component {
  static propTypes = {
    labels: PropTypes.shape({}),
    bonusData: PropTypes.shape({}),
    bonusDetailsData: PropTypes.string,
    className: PropTypes.string,
    view: PropTypes.string,
    isPlcc: PropTypes.bool,
    getBonusDaysData: PropTypes.func,
    orderDetails: PropTypes.shape({}),
    showAccordian: PropTypes.bool.isRequired,
    additionalClassNameModal: PropTypes.string.isRequired,
    isDefaultOpen: PropTypes.bool,
    isInternationalShipping: PropTypes.bool,
  };

  static defaultProps = {
    labels: {},
    bonusData: {},
    bonusDetailsData: '',
    className: '',
    view: constants.VIEWS.EDIT,
    isPlcc: false,
    getBonusDaysData: () => {},
    orderDetails: {},
    isDefaultOpen: false,
    isInternationalShipping: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      openModalState: false,
    };
  }

  toggleBonusPointsModal = e => {
    e.preventDefault();
    const { openModalState } = this.state;
    this.setState({ openModalState: !openModalState });
  };

  render() {
    const {
      labels,
      bonusData,
      bonusDetailsData,
      className,
      view,
      isPlcc,
      getBonusDaysData,
      orderDetails,
      showAccordian,
      additionalClassNameModal,
      isDefaultOpen,
      isInternationalShipping,
    } = this.props;
    const { openModalState } = this.state;
    return (
      !isInternationalShipping && (
        <>
          <div
            className={`${
              showAccordian ? 'bonusPointsDaysWrapperAccordian' : 'bonusPointsDaysWrapper'
            } elem-mb-MED ${className}`}
          >
            {view === constants.VIEWS.READ && (
              <BonusPointsReadSection
                labels={labels.account.myPlaceRewards}
                toggleBonusPointsModal={this.toggleBonusPointsModal}
                availableBonusPointDays={bonusData && bonusData.availableBonusPointDays}
                usedBonusPointDays={bonusData && bonusData.usedBonusPointDays}
                isPlcc={isPlcc}
              />
            )}
            {view === constants.VIEWS.EDIT && (
              <div className={className}>
                <BonusPointsSection
                  labels={labels && labels.global && labels.global.bonusPoints}
                  bonusData={bonusData}
                  toggleBonusPointsModal={this.toggleBonusPointsModal}
                  getBonusDaysData={getBonusDaysData}
                  orderDetails={orderDetails}
                  showAccordian={showAccordian}
                  isDefaultOpen={isDefaultOpen}
                />
              </div>
            )}
            <Modal
              isOpen={openModalState}
              onRequestClose={this.toggleBonusPointsModal}
              overlayClassName="TCPModal__Overlay"
              className="TCPModal__Content bonus-details-modal"
              heading={`${getLabelValue(
                labels,
                'lbl_bonusPoints_placeRewardsBonus',
                'bonusPoints',
                'global'
              )} ${getLabelValue(
                labels,
                'lbl_bonusPoints_placeRewardsPoints',
                'bonusPoints',
                'global'
              )} DETAILS`}
              fixedWidth
              maxWidth="704px"
              minHeight="550px"
              showHeading
              inheritedStyles={modalstyles}
              customWrapperClassName={additionalClassNameModal}
            >
              <RichText richTextHtml={bonusDetailsData} dataLocator="bonus-points-details" />
            </Modal>
          </div>
        </>
      )
    );
  }
}

export default withStyles(BonusPointsView, styles);
export { BonusPointsView as BonusPointsViewVanilla };
