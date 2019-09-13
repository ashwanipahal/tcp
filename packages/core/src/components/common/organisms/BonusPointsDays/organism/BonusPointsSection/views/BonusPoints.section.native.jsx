import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
  isBagPage,
  bagBonusLabels,
}) => {
  let buttonText = '';
  let dataLocator = '';

  const labelsNode = isBagPage ? bagBonusLabels : labels;

  if (isUsed) {
    buttonText = `${getLabelValue(labelsNode, 'lbl_bonusPoints_usedOn')} ${dateUsed}`;
    dataLocator = 'usedonbtn';
  } else if (forFutureUse || futureDisabled) {
    buttonText = getLabelValue(labelsNode, 'lbl_bonusPoints_futureUse');
    dataLocator = 'availableforfutureusebtn';
  } else if (appliedToBagBonusPointDays) {
    buttonText = getLabelValue(labelsNode, 'lbl_bonusPoints_ctaApplied');
    dataLocator = 'appliedtoorderbtn';
  } else {
    buttonText = getLabelValue(labelsNode, 'lbl_bonusPoints_ctaApply');
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
const createBonusPoints = ({ bonusData, labels, isBagPage, bagBonusLabels }) => {
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
      isBagPage,
      bagBonusLabels,
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
          text={getLabelValue(labels, 'lbl_bonusPoints_placeRewardsBonus')}
        />
      </MarginRightWrapper>
      <MarginRightWrapper>
        <BodyCopy
          mobileFontFamily="primary"
          fontSize="fs16"
          fontWeight="extrabold"
          component="span"
          color="primary.main"
          text={getLabelValue(labels, 'lbl_bonusPoints_placeRewardsPoints')}
        />
      </MarginRightWrapper>
      <BodyCopy
        mobileFontFamily="primary"
        fontSize="fs16"
        fontWeight="extrabold"
        component="span"
        color="pink.500"
        text={getLabelValue(labels, 'lbl_bonusPoints_placeRewardsDay')}
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
  isPlcc,
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
              text={getLabelValue(labels, 'lbl_bonusPoints_applyAnyDay')}
            />
          </ApplyAnyDayWrapper>
          <InfoWrapper>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              data-locator="infomsg"
              textAlign="center"
              text={getLabelValue(labels, 'lbl_bonusPoints_msg')}
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
            text={getLabelValue(labels, 'lbl_bonusPoints_myRewardsUsedAll')}
          />
        </InfoWrapper>
      )}
      <BonusPointsAvailability
        labels={labels}
        bonusPoints={bonusPoints}
        enableApplyCta={enableApplyCta}
        getBonusDaysData={getBonusDaysData}
        orderDetails={orderDetails}
        bonusDayAvailableToday={valueOfbonusDayAvailableToday}
        className="availability-msg"
        isPlcc={isPlcc}
      />
      <Anchor
        fontSizeVariation="medium"
        underline
        href="#"
        anchorVariation="primary"
        dataLocator="detailslink"
        className="details-link"
        onPress={e => toggleBonusPointsModal(e)}
        text={getLabelValue(labels, 'lbl_bonusPoints_details')}
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
  isPlcc,
  isBagPage,
  bagBonusLabels,
  showAccordian,
}) => {
  const bonusPoints =
    bonusData && createBonusPoints({ bonusData, labels, isBagPage, bagBonusLabels });
  const header = getHeader({ labels });
  const body = getContent({
    labels,
    toggleBonusPointsModal,
    bonusPoints,
    bonusData,
    enableApplyCta,
    getBonusDaysData,
    orderDetails,
    isPlcc,
  });
  return (
    <View>
      {showAccordian ? (
        <CollapsibleContainer header={header} body={body} iconLocator="arrowicon" />
      ) : (
        <>
          {header}
          {body}
        </>
      )}
    </View>
  );
};

BonusPointsSection.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  bonusData: PropTypes.shape({}),
  toggleBonusPointsModal: PropTypes.func,
  enableApplyCta: PropTypes.bool,
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
  isPlcc: PropTypes.bool,
  isBagPage: PropTypes.bool,
  bagBonusLabels: PropTypes.shape({}),
  showAccordian: PropTypes.bool,
};

BonusPointsSection.defaultProps = {
  labels: { placeRewards: { lbl_bonus_points_msg: '' } },
  bonusData: {},
  toggleBonusPointsModal: () => {},
  enableApplyCta: false,
  getBonusDaysData: () => {},
  orderDetails: {},
  isPlcc: false,
  isBagPage: false,
  bagBonusLabels: {},
  showAccordian: true,
};

getContent.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  toggleBonusPointsModal: PropTypes.func,
  bonusPoints: PropTypes.shape([]),
  bonusData: PropTypes.shape({}),
  enableApplyCta: PropTypes.bool,
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
  isPlcc: PropTypes.bool,
};

getContent.defaultProps = {
  labels: {},
  bonusPoints: [],
  toggleBonusPointsModal: () => {},
  bonusData: {},
  enableApplyCta: false,
  getBonusDaysData: () => {},
  orderDetails: {},
  isPlcc: false,
};

getHeader.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  orderDetails: PropTypes.shape({}),
};

getHeader.defaultProps = {
  labels: {
    placeRewards: {
      lbl_bonusPoints_placeRewardsBonus: '',
      lbl_bonusPoints_placeRewardsPoints: '',
      lbl_place_rewards_day: '',
    },
  },
  orderDetails: {},
};

export default BonusPointsSection;
