import React from 'react';
import PropTypes from 'prop-types';
import BonusPointsSection from '../../../organism/BonusPointsSection';
import BonusPointsReadSection from '../../../organism/BonusPointsReadSection';
import Modal from '../../../../../../common/molecules/Modal';
import RichText from '../../../../../../common/atoms/RichText';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles, { modalstyles } from '../styles/BonusPoints.view.style';
import constants from '../../../BonusPointsDays.constants';

class BonusPointsView extends React.Component {
  static propTypes = {
    labels: PropTypes.shape({}),
    bonusData: PropTypes.shape({}),
    bonusDetailsData: PropTypes.string,
    className: PropTypes.string,
    view: PropTypes.string,
  };

  static defaultProps = {
    labels: { myPlaceRewards: { lbl_place_rewards_bonus: '', lbl_place_rewards_points: '' } },
    bonusData: {},
    bonusDetailsData: '',
    className: '',
    view: constants.VIEWS.EDIT
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
    const { labels, bonusData, bonusDetailsData, className, view } = this.props;
    const { openModalState } = this.state;
    return (
      <React.Fragment>
        {view === constants.VIEWS.READ && (
          <BonusPointsReadSection
            labels={labels.myPlaceRewards}
            toggleBonusPointsModal={this.toggleBonusPointsModal}
            availableBonusPointDays={bonusData && bonusData.availableBonusPointDays}
            usedBonusPointDays={bonusData && bonusData.usedBonusPointDays}
          />
        )}
        {view === constants.VIEWS.EDIT && (
          <div className={className}>
            <BonusPointsSection
              labels={labels}
              bonusData={bonusData}
              toggleBonusPointsModal={this.toggleBonusPointsModal}
            />
          </div>
        )}
        <Modal
          isOpen={openModalState}
          onRequestClose={this.toggleBonusPointsModal}
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content bonus-details-modal"
          heading={`${labels.myPlaceRewards.lbl_place_rewards_bonus} ${
            labels.myPlaceRewards.lbl_place_rewards_points
          } DETAILS`}
          fixedWidth
          maxWidth="704px"
          minHeight="550px"
          showHeading
          inheritedStyles={modalstyles}
        >
          <RichText richTextHtml={bonusDetailsData} dataLocator="bonus-points-details" />
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(BonusPointsView, styles);
export { BonusPointsView as BonusPointsViewVanilla };
