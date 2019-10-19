import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../atoms/BodyCopy';
import Anchor from '../../../../../atoms/Anchor';
import Row from '../../../../../atoms/Row';
import Col from '../../../../../atoms/Col';
import withStyles from '../../../../../hoc/withStyles';
import styles from '../styles/BonusPoints.section.style';
import BonusPointsAvailability from '../../../molecules/BonusPointsAvailability';
import CollapsibleContainer from '../../../../../molecules/CollapsibleContainer';

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
    buttonText = `${getLabelValue(labels, 'lbl_bonusPoints_usedOn')} ${dateUsed}`;
    dataLocator = 'usedonbtn';
  } else if (forFutureUse || futureDisabled) {
    buttonText = getLabelValue(labels, 'lbl_bonusPoints_futureUse');
    dataLocator = 'availableforfutureusebtn';
  } else if (appliedToBagBonusPointDays) {
    buttonText = getLabelValue(labels, 'lbl_bonusPoints_ctaApplied');
    dataLocator = 'appliedtoorderbtn';
  } else {
    buttonText = getLabelValue(labels, 'lbl_bonusPoints_ctaApply');
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

  for (let i = 1; i <= totalBonusPointDays; i += 1) {
    const isUsed = i <= usedBonusPointDays;
    const futureDisabled = i > usedBonusPointDays + 1;
    const forFutureUse = i > usedBonusPointDays + 1 && allAvailable;
    const dateUsed = isUsed && usedBonusPointDates[i - 1] ? usedBonusPointDates[i - 1] : '';
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
    <div className="elem-mb-SM" data-locator="bonuspointsdayhdr">
      <BodyCopy
        fontFamily="primary"
        fontSize={['fs16', 'fs13', 'fs18']}
        fontWeight="extrabold"
        component="h2"
        color="orange.800"
        className="elem-mr-XS"
      >
        {getLabelValue(labels, 'lbl_bonusPoints_placeRewardsBonus')}
      </BodyCopy>
      <BodyCopy
        fontFamily="primary"
        fontSize={['fs16', 'fs13', 'fs18']}
        fontWeight="extrabold"
        component="h2"
        className="elem-mr-XS"
        color="primary.main"
      >
        {getLabelValue(labels, 'lbl_bonusPoints_placeRewardsPoints')}
      </BodyCopy>
      <BodyCopy
        fontFamily="primary"
        fontSize={['fs16', 'fs13', 'fs18']}
        fontWeight="extrabold"
        component="h2"
        color="pink.500"
      >
        {getLabelValue(labels, 'lbl_bonusPoints_placeRewardsDay')}
      </BodyCopy>
    </div>
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
    <React.Fragment>
      {!allUsed ? (
        <React.Fragment>
          <BodyCopy
            fontFamily="secondary"
            fontSize={['fs14', 'fs10', 'fs16']}
            fontWeight="extrabold"
            component="p"
            data-locator="msgtextinbold"
            textAlign="center"
            className="apply-any-day-msg"
          >
            {getLabelValue(labels, 'lbl_bonusPoints_applyAnyDay')}
          </BodyCopy>
          <BodyCopy
            fontFamily="secondary"
            fontSize={['fs12', 'fs12', 'fs16']}
            fontWeight="regular"
            component="p"
            data-locator="infomsg"
            textAlign="center"
            className="availability-msg"
          >
            {getLabelValue(labels, 'lbl_bonusPoints_msg')}
          </BodyCopy>
        </React.Fragment>
      ) : (
        <BodyCopy
          fontFamily="secondary"
          fontSize={['fs12', 'fs12', 'fs16']}
          fontWeight="regular"
          component="p"
          data-locator="infomsg"
          textAlign="center"
          className="availability-msg"
        >
          {getLabelValue(labels, 'lbl_bonusPoints_myRewardsUsedAll')}
        </BodyCopy>
      )}
      <Row fullBleed>
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <BonusPointsAvailability
            labels={labels}
            bonusPoints={bonusPoints}
            enableApplyCta={enableApplyCta}
            getBonusDaysData={getBonusDaysData}
            orderDetails={orderDetails}
            bonusDayAvailableToday={valueOfbonusDayAvailableToday}
            className="availability-msg"
          />
        </Col>
      </Row>
      <Anchor
        fontSizeVariation="medium"
        underline
        href="#"
        anchorVariation="primary"
        dataLocator="detailslink"
        className="details-link"
        onClick={e => toggleBonusPointsModal(e)}
      >
        {getLabelValue(labels, 'lbl_bonusPoints_details')}
      </Anchor>
    </React.Fragment>
  );
};

const BonusPointsSection = ({
  labels,
  bonusData,
  className,
  toggleBonusPointsModal,
  enableApplyCta,
  getBonusDaysData,
  orderDetails,
  isDefaultOpen,
  showAccordian,
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
    <div className={className}>
      <Col
        colSize={{
          large: 12,
          medium: 8,
          small: 6,
        }}
        ignoreGutter={{ small: true }}
      >
        <CollapsibleContainer
          className={className}
          header={header}
          body={body}
          defaultOpen={isDefaultOpen}
          iconLocator="arrowicon"
          isDefaultView={!showAccordian}
          showHeaderAlways
        />
      </Col>
    </div>
  );
};

BonusPointsSection.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  className: PropTypes.string,
  bonusData: PropTypes.shape({}),
  toggleBonusPointsModal: PropTypes.func,
  enableApplyCta: PropTypes.bool,
  isDefaultOpen: PropTypes.bool,
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
  showAccordian: PropTypes.bool.isRequired,
};

BonusPointsSection.defaultProps = {
  labels: { placeRewards: { lbl_bonus_points_msg: '' } },
  className: '',
  bonusData: {},
  toggleBonusPointsModal: () => {},
  enableApplyCta: false,
  getBonusDaysData: () => {},
  orderDetails: {},
  isDefaultOpen: false,
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
      lbl_bonusPoints_placeRewardsPoints: '',
      lbl_place_rewards_day: '',
    },
  },
  orderDetails: {},
};

export default withStyles(BonusPointsSection, styles);
export { BonusPointsSection as BonusPointsSectionVanilla };
