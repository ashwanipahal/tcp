import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BonusPointsSection from '../../../organism/BonusPointsSection';
import BonusPointsReadSection from '../../../organism/BonusPointsReadSection';
import Modal from '../../../../../molecules/Modal';
import RichText from '../../../../../atoms/RichText';
import {
  RichTextWrapper,
  contentHeight,
  BonusPointsLoaderWrapper,
} from '../styles/BonusPoints.view.style.native';
import constants from '../../../BonusPointsDays.constants';

class BonusPointsView extends React.Component {
  static propTypes = {
    labels: PropTypes.shape({}),
    bonusData: PropTypes.shape({}),
    bonusDetailsData: PropTypes.string,
    className: PropTypes.string,
    isPlcc: PropTypes.bool,
    view: PropTypes.string,
    getBonusDaysData: PropTypes.func,
    orderDetails: PropTypes.shape({}),
    isBagPage: PropTypes.bool,
    showAccordian: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    labels: {},
    bonusData: {},
    bonusDetailsData: '',
    className: '',
    isPlcc: false,
    view: constants.VIEWS.EDIT,
    getBonusDaysData: () => {},
    orderDetails: {},
    isBagPage: false,
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
      isBagPage,
      showAccordian,
      isFetching,
      ...otherProps
    } = this.props;
    const { openModalState } = this.state;
    return (
      <View className={className}>
        {view === constants.VIEWS.READ && (
          <BonusPointsReadSection
            labels={labels.account.myPlaceRewards}
            toggleBonusPointsModal={this.toggleBonusPointsModal}
            availableBonusPointDays={bonusData && bonusData.availableBonusPointDays}
            usedBonusPointDays={bonusData && bonusData.usedBonusPointDays}
            isPlcc={isPlcc}
          />
        )}
        {!isFetching ? (
          <>
            {view !== constants.VIEWS.READ && (
              <BonusPointsSection
                labels={labels.global.bonusPoints}
                bonusData={bonusData}
                toggleBonusPointsModal={this.toggleBonusPointsModal}
                getBonusDaysData={getBonusDaysData}
                orderDetails={orderDetails}
                isPlcc={isPlcc}
                isBagPage={isBagPage}
                bagBonusLabels={labels.checkout.bagBonusPoints}
                showAccordian={showAccordian}
                {...otherProps}
              />
            )}
          </>
        ) : (
          <BonusPointsLoaderWrapper>
            <LoaderSkelton />
          </BonusPointsLoaderWrapper>
        )}
        <Modal
          isOpen={openModalState}
          onRequestClose={this.toggleBonusPointsModal}
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
          headingAlign="left"
          headingFontFamily="secondary"
        >
          <ScrollView>
            <RichTextWrapper>
              <RichText
                source={{ html: bonusDetailsData }}
                style={contentHeight}
                dataLocator="bonus-points-details"
              />
            </RichTextWrapper>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

export default BonusPointsView;
