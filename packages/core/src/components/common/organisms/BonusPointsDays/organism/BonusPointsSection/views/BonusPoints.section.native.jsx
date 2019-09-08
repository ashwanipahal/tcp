import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BodyCopy from '../../../../../atoms/BodyCopy';
import Anchor from '../../../../../atoms/Anchor';
import BonusPointsAvailability from '../../../molecules/BonusPointsAvailability';
import CollapsibleContainer from '../../../../../molecules/CollapsibleContainer';
import {
  StyledHeader,
  MarginRightWrapper,
  ApplyAnyDayWrapper,
  InfoWrapper,
} from '../styles/BonusPoints.section.style.native';

const getButtonText = ({
  appliedToBagBonusPointDays,
  futureDisabled,
  dateUsed,
  labels,
  forFutureUse,
  isUsed,
}) => {
  let buttonText = '';
  let dataLocator = '';
  if (isUsed) {
    buttonText = `${labels.placeRewards.lbl_bonus_points_used_on} ${dateUsed}`;
    dataLocator = 'usedonbtn';
  } else if (forFutureUse || futureDisabled) {
    buttonText = labels.placeRewards.lbl_bonus_points_future_use;
    dataLocator = 'availableforfutureusebtn';
  } else if (appliedToBagBonusPointDays) {
    buttonText = labels.common.lbl_common_applied_to_order;
    dataLocator = 'appliedtoorderbtn';
  } else {
    buttonText = labels.placeRewards.lbl_bonus_points_available_today;
    dataLocator = 'availabletodaybtn';
  }
  return { buttonText, dataLocator };
};

/**
 * @method createBonusPointsCTAs creates bonus points object for CTAs to
 * render available in the account.
 * @param {object} props object required for rendering bonus points
 * based on the specific conditions
 */
const createBonusPoints = ({ bonusData, labels }) => {
  const {
    totalBonusPointDays,
    availableBonusPointDays,
    usedBonusPointDays,
    appliedToBagBonusPointDays,
    usedBonusPointDates,
  } = bonusData;
  const bonusPoints = [];
  const allAvailable = totalBonusPointDays === availableBonusPointDays;

  for (let bonusPointIndex = 1; bonusPointIndex <= totalBonusPointDays; bonusPointIndex += 1) {
    const isUsed = bonusPointIndex <= usedBonusPointDays;
    const futureDisabled = bonusPointIndex > usedBonusPointDays + 1;
    const forFutureUse = bonusPointIndex > usedBonusPointDays + 1 && allAvailable;
    const dateUsed =
      isUsed && usedBonusPointDates[bonusPointIndex - 1]
        ? usedBonusPointDates[bonusPointIndex - 1]
        : '';
    const { buttonText, dataLocator } = getButtonText({
      appliedToBagBonusPointDays,
      futureDisabled,
      dateUsed,
      labels,
      forFutureUse,
      isUsed,
    });

    const disabled = isUsed || forFutureUse || futureDisabled;

    bonusPoints.push({
      buttonText,
      disabled,
      dataLocator,
    });
  }

  return bonusPoints;
};

const getHeader = ({ labels }) => {
  return (
    <StyledHeader className="elem-mb-SM" data-locator="bonuspointsdayhdr">
      <MarginRightWrapper>
        <BodyCopy
          mobileFontFamily="primary"
          fontSize="fs16"
          fontWeight="extrabold"
          component="span"
          color="orange.800"
          text={labels.placeRewards.lbl_place_rewards_bonus}
        />
      </MarginRightWrapper>
      <MarginRightWrapper>
        <BodyCopy
          mobileFontFamily="primary"
          fontSize="fs16"
          fontWeight="extrabold"
          component="span"
          color="primary.main"
          text={labels.placeRewards.lbl_place_rewards_points}
        />
      </MarginRightWrapper>
      <BodyCopy
        mobileFontFamily="primary"
        fontSize="fs16"
        fontWeight="extrabold"
        component="span"
        color="pink.500"
        text={labels.placeRewards.lbl_place_rewards_day}
      />
    </StyledHeader>
  );
};

const getContent = ({
  labels,
  toggleBonusPointsModal,
  bonusPoints,
  bonusData,
  enableApplyCta,
  getBonusDaysData,
  orderDetails,
}) => {
  let allUsed = false;
  let valueOfbonusDayAvailableToday = 0;
  if (bonusData) {
    const { totalBonusPointDays, usedBonusPointDays, appliedToBagBonusPointDays } = bonusData;
    allUsed = totalBonusPointDays === usedBonusPointDays;
    valueOfbonusDayAvailableToday = appliedToBagBonusPointDays;
  }

  return (
    <ViewWithSpacing spacingStyles="padding-top-SM">
      {!allUsed ? (
        <React.Fragment>
          <ApplyAnyDayWrapper>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              data-locator="msgtextinbold"
              textAlign="center"
              text={labels.placeRewards.lbl_bonus_points_apply_any_day}
            />
          </ApplyAnyDayWrapper>
          <InfoWrapper>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              data-locator="infomsg"
              textAlign="center"
              text={labels.placeRewards.lbl_bonus_points_msg}
            />
          </InfoWrapper>
        </React.Fragment>
      ) : (
        <InfoWrapper>
          <BodyCopy
            mobileFontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
            data-locator="infomsg"
            textAlign="center"
            text={labels.placeRewards.lbl_my_rewards_used_all}
          />
        </InfoWrapper>
      )}
      <BonusPointsAvailability
        labels={labels}
        bonusPoints={bonusPoints}
        className="availability-msg"
        enableApplyCta={enableApplyCta}
        getBonusDaysData={getBonusDaysData}
        orderDetails={orderDetails}
        bonusDayAvailableToday={valueOfbonusDayAvailableToday}
      />
      <Anchor
        fontSizeVariation="medium"
        underline
        href="#"
        anchorVariation="primary"
        dataLocator="detailslink"
        className="details-link"
        onPress={e => toggleBonusPointsModal(e)}
        text={labels.placeRewards.lbl_common_details}
      />
    </ViewWithSpacing>
  );
};

const BonusPointsSection = ({
  labels,
  bonusData,
  toggleBonusPointsModal,
  enableApplyCta,
  getBonusDaysData,
  orderDetails,
}) => {
  const bonusPoints = bonusData && createBonusPoints({ bonusData, labels });
  const header = getHeader({ labels });
  const body = getContent({
    labels,
    toggleBonusPointsModal,
    bonusPoints,
    bonusData,
    enableApplyCta,
    getBonusDaysData,
    orderDetails,
  });
  return (
    <View>
      <CollapsibleContainer header={header} body={body} iconLocator="arrowicon" />
    </View>
  );
};

BonusPointsSection.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  bonusData: PropTypes.shape({}),
  toggleBonusPointsModal: PropTypes.func,
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
  enableApplyCta: PropTypes.bool,
};

BonusPointsSection.defaultProps = {
  labels: { placeRewards: { lbl_bonus_points_msg: '' } },
  bonusData: {},
  toggleBonusPointsModal: () => {},
  getBonusDaysData: () => {},
  orderDetails: {},
  enableApplyCta: false,
};

getContent.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  toggleBonusPointsModal: PropTypes.func,
  bonusPoints: PropTypes.shape([]),
  bonusData: PropTypes.shape({}),
  enableApplyCta: PropTypes.bool,
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
};

getContent.defaultProps = {
  labels: {
    placeRewards: {
      lbl_bonus_points_apply_any_day: '',
      lbl_bonus_points_msg: '',
      lbl_common_details: '',
    },
  },
  bonusPoints: [],
  toggleBonusPointsModal: () => {},
  bonusData: {},
  enableApplyCta: false,
  getBonusDaysData: () => {},
  orderDetails: {},
};

getHeader.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  orderDetails: PropTypes.shape({}),
};

getHeader.defaultProps = {
  labels: {
    placeRewards: {
      lbl_place_rewards_bonus: '',
      lbl_place_rewards_points: '',
      lbl_place_rewards_day: '',
    },
  },
  orderDetails: {},
};

export default BonusPointsSection;
