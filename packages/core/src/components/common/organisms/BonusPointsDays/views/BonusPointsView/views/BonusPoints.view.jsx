import React from 'react';
import PropTypes from 'prop-types';
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
    enableApplyCta: PropTypes.bool,
    getBonusDaysData: PropTypes.func,
    orderDetails: PropTypes.shape({}),
    showAccordian: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    labels: { placeRewards: { lbl_place_rewards_bonus: '', lbl_place_rewards_points: '' } },
    bonusData: {},
    bonusDetailsData: '',
    className: '',
    view: constants.VIEWS.EDIT,
    isPlcc: false,
    enableApplyCta: false,
    getBonusDaysData: () => {},
    orderDetails: {},
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
      enableApplyCta,
      getBonusDaysData,
      orderDetails,
      showAccordian,
    } = this.props;
    const { openModalState } = this.state;
    return (
      <>
        {view === constants.VIEWS.READ && (
          <BonusPointsReadSection
            labels={labels.placeRewards}
            toggleBonusPointsModal={this.toggleBonusPointsModal}
            availableBonusPointDays={bonusData && bonusData.availableBonusPointDays}
            usedBonusPointDays={bonusData && bonusData.usedBonusPointDays}
            isPlcc={isPlcc}
          />
        )}
        {view === constants.VIEWS.EDIT && (
          <div className={className}>
            <BonusPointsSection
              labels={labels}
              bonusData={bonusData}
              toggleBonusPointsModal={this.toggleBonusPointsModal}
              enableApplyCta={enableApplyCta}
              getBonusDaysData={getBonusDaysData}
              orderDetails={orderDetails}
              showAccordian={showAccordian}
            />
          </div>
        )}
        <Modal
          isOpen={openModalState}
          onRequestClose={this.toggleBonusPointsModal}
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content bonus-details-modal"
          heading={`${labels.placeRewards.lbl_place_rewards_bonus} ${
            labels.placeRewards.lbl_place_rewards_points
          } DETAILS`}
          fixedWidth
          maxWidth="704px"
          minHeight="550px"
          showHeading
          inheritedStyles={modalstyles}
        >
          <RichText richTextHtml={bonusDetailsData} dataLocator="bonus-points-details" />
        </Modal>
      </>
    );
  }
}

export default withStyles(BonusPointsView, styles);
export { BonusPointsView as BonusPointsViewVanilla };
