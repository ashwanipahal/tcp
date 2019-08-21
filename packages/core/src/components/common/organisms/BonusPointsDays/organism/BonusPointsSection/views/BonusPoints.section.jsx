import React from 'react';
import PropTypes from 'prop-types';
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
        component="span"
        color="orange.800"
        className="elem-mr-XS"
      >
        {labels.myPlaceRewards.lbl_place_rewards_bonus}
      </BodyCopy>
      <BodyCopy
        fontFamily="primary"
        fontSize={['fs16', 'fs13', 'fs18']}
        fontWeight="extrabold"
        component="span"
        className="elem-mr-XS"
        color="primary.main"
      >
        {labels.myPlaceRewards.lbl_place_rewards_points}
      </BodyCopy>
      <BodyCopy
        fontFamily="primary"
        fontSize={['fs16', 'fs13', 'fs18']}
        fontWeight="extrabold"
        component="span"
        color="pink.500"
      >
        {labels.myPlaceRewards.lbl_place_rewards_day}
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
  let valueOfbonusDayAvailableToday = 2;
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
            {labels.myPlaceRewards.lbl_bonus_points_apply_any_day}
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
            {labels.myPlaceRewards.lbl_bonus_points_msg}
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
          {labels.myPlaceRewards.lbl_my_rewards_used_all}
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
        data-locator="detailslink"
        className="details-link"
        onClick={e => toggleBonusPointsModal(e)}
      >
        {labels.common.lbl_common_details}
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
        ignoreGutter={{ small: true, medium: true }}
        className="hide-in-large-up"
      >
        <CollapsibleContainer
          className={className}
          header={header}
          body={body}
          iconLocator="arrowicon"
        />
      </Col>
      <div className="hide-in-medium-down">
        {header}
        {body}
      </div>
    </div>
  );
};

BonusPointsSection.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
  className: PropTypes.string,
  bonusData: PropTypes.shape({}),
  toggleBonusPointsModal: PropTypes.func,
  enableApplyCta: PropTypes.bool,
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
};

BonusPointsSection.defaultProps = {
  labels: { myPlaceRewards: { lbl_bonus_points_msg: '' } },
  className: '',
  bonusData: {},
  toggleBonusPointsModal: () => {},
  enableApplyCta: false,
  getBonusDaysData: () => {},
  orderDetails: {},
};

getContent.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
  toggleBonusPointsModal: PropTypes.func,
  bonusPoints: PropTypes.shape([]),
  bonusData: PropTypes.shape({}),
  enableApplyCta: PropTypes.bool,
  getBonusDaysData: PropTypes.func,
  orderDetails: PropTypes.shape({}),
};

getContent.defaultProps = {
  labels: {
    myPlaceRewards: { lbl_bonus_points_apply_any_day: '', lbl_bonus_points_msg: '' },
    common: { lbl_common_details: '' },
  },
  bonusPoints: [],
  toggleBonusPointsModal: () => {},
  bonusData: {},
  enableApplyCta: false,
  getBonusDaysData: () => {},
  orderDetails: {},
};

getHeader.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
  orderDetails: PropTypes.shape({}),
};

getHeader.defaultProps = {
  labels: {
    myPlaceRewards: {
      lbl_place_rewards_bonus: '',
      lbl_place_rewards_points: '',
      lbl_place_rewards_day: '',
    },
  },
  orderDetails: {},
};

export default withStyles(BonusPointsSection, styles);
export { BonusPointsSection as BonusPointsSectionVanilla };
