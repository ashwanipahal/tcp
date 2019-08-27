import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
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
    buttonText = `${labels.myPlaceRewards.lbl_bonus_points_used_on} ${dateUsed}`;
    dataLocator = 'usedonbtn';
  } else if (forFutureUse || futureDisabled) {
    buttonText = labels.myPlaceRewards.lbl_bonus_points_future_use;
    dataLocator = 'availableforfutureusebtn';
  } else if (appliedToBagBonusPointDays) {
    buttonText = labels.common.lbl_common_applied_to_order;
    dataLocator = 'appliedtoorderbtn';
  } else {
    buttonText = labels.myPlaceRewards.lbl_bonus_points_available_today;
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
          text={labels.myPlaceRewards.lbl_place_rewards_bonus}
        />
      </MarginRightWrapper>
      <MarginRightWrapper>
        <BodyCopy
          mobileFontFamily="primary"
          fontSize="fs16"
          fontWeight="extrabold"
          component="span"
          color="primary.main"
          text={labels.myPlaceRewards.lbl_place_rewards_points}
        />
      </MarginRightWrapper>
      <BodyCopy
        mobileFontFamily="primary"
        fontSize="fs16"
        fontWeight="extrabold"
        component="span"
        color="pink.500"
        text={labels.myPlaceRewards.lbl_place_rewards_day}
      />
    </StyledHeader>
  );
};

const getContent = ({ labels, toggleBonusPointsModal, bonusPoints, bonusData }) => {
  let allUsed = false;
  if (bonusData) {
    const { totalBonusPointDays, usedBonusPointDays } = bonusData;
    allUsed = totalBonusPointDays === usedBonusPointDays;
  }

  return (
    <React.Fragment>
      {!allUsed ? (
        <React.Fragment>
          <ApplyAnyDayWrapper>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              data-locator="msgtextinbold"
              textAlign="center"
              text={labels.myPlaceRewards.lbl_bonus_points_apply_any_day}
            />
          </ApplyAnyDayWrapper>
          <InfoWrapper>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              data-locator="infomsg"
              textAlign="center"
              text={labels.myPlaceRewards.lbl_bonus_points_msg}
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
            text={labels.myPlaceRewards.lbl_my_rewards_used_all}
          />
        </InfoWrapper>
      )}
      <BonusPointsAvailability
        labels={labels}
        bonusPoints={bonusPoints}
        className="availability-msg"
      />
      <Anchor
        fontSizeVariation="medium"
        underline
        href="#"
        anchorVariation="primary"
        dataLocator="detailslink"
        className="details-link"
        onPress={e => toggleBonusPointsModal(e)}
        text={labels.common.lbl_common_details}
      />
    </React.Fragment>
  );
};

const BonusPointsSection = ({ labels, bonusData, toggleBonusPointsModal }) => {
  const bonusPoints = bonusData && createBonusPoints({ bonusData, labels });
  const header = getHeader({ labels });
  const body = getContent({ labels, toggleBonusPointsModal, bonusPoints, bonusData });
  return (
    <View>
      <CollapsibleContainer header={header} body={body} iconLocator="arrowicon" />
    </View>
  );
};

BonusPointsSection.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
  bonusData: PropTypes.shape({}),
  toggleBonusPointsModal: PropTypes.func,
};

BonusPointsSection.defaultProps = {
  labels: { myPlaceRewards: { lbl_bonus_points_msg: '' } },
  bonusData: {},
  toggleBonusPointsModal: () => {},
};

getContent.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
  toggleBonusPointsModal: PropTypes.func,
  bonusPoints: PropTypes.shape([]),
  bonusData: PropTypes.shape({}),
};

getContent.defaultProps = {
  labels: {
    myPlaceRewards: { lbl_bonus_points_apply_any_day: '', lbl_bonus_points_msg: '' },
    common: { lbl_common_details: '' },
  },
  bonusPoints: [],
  toggleBonusPointsModal: () => {},
  bonusData: {},
};

getHeader.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
};

getHeader.defaultProps = {
  labels: {
    myPlaceRewards: {
      lbl_place_rewards_bonus: '',
      lbl_place_rewards_points: '',
      lbl_place_rewards_day: '',
    },
  },
};

export default BonusPointsSection;
