import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BonusPointsSection from '../../../organism/BonusPointsSection';
import BonusPointsReadSection from '../../../organism/BonusPointsReadSection';
import Modal from '../../../../../molecules/Modal';
import RichText from '../../../../../atoms/RichText';
import RichTextWrapper from '../styles/BonusPoints.view.style.native';
import constants from '../../../BonusPointsDays.constants';

class BonusPointsView extends React.Component {
  static propTypes = {
    labels: PropTypes.shape({}),
    bonusData: PropTypes.shape({}),
    bonusDetailsData: PropTypes.string,
    className: PropTypes.string,
    isPlcc: PropTypes.bool,
    view: PropTypes.string,
  };

  static defaultProps = {
    labels: { myPlaceRewards: { lbl_place_rewards_bonus: '', lbl_place_rewards_points: '' } },
    bonusData: {},
    bonusDetailsData: '',
    className: '',
    isPlcc: false,
    view: constants.VIEWS.EDIT,
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
    const { labels, bonusData, bonusDetailsData, className, view, isPlcc } = this.props;
    const { openModalState } = this.state;
    return (
      <View className={className}>
        {view === constants.VIEWS.READ && (
          <BonusPointsReadSection
            labels={labels.myPlaceRewards}
            toggleBonusPointsModal={this.toggleBonusPointsModal}
            availableBonusPointDays={bonusData && bonusData.availableBonusPointDays}
            usedBonusPointDays={bonusData && bonusData.usedBonusPointDays}
            isPlcc={isPlcc}
          />
        )}
        {view !== constants.VIEWS.READ && (
          <BonusPointsSection
            labels={labels}
            bonusData={bonusData}
            toggleBonusPointsModal={this.toggleBonusPointsModal}
          />
        )}
        <Modal
          isOpen={openModalState}
          onRequestClose={this.toggleBonusPointsModal}
          heading={`${labels.myPlaceRewards.lbl_place_rewards_bonus} ${
            labels.myPlaceRewards.lbl_place_rewards_points
          } DETAILS`}
          headingAlign="left"
          headingFontFamily="secondary"
        >
          <RichTextWrapper>
            <RichText source={{ html: bonusDetailsData }} dataLocator="bonus-points-details" />
          </RichTextWrapper>
        </Modal>
      </View>
    );
  }
}

export default BonusPointsView;
