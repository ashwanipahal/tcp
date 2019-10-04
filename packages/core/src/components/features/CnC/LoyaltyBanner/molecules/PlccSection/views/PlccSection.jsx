/* eslint-disable complexity */
import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/PlccSection.style';
import { BodyCopy } from '../../../../../../common/atoms';

const PlccSection = props => {
  const { className, finalStr, finalStrRemainingPlcc, labels, earnedReward } = props;

  return (
    <div className={`${className} bodyPlcc`}>
      <BodyCopy
        className="youCanEarnPointsPlcc alignCenter elem-pt-MED"
        fontSize="fs18"
        component="p"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {finalStr}
      </BodyCopy>
      <BodyCopy
        className="onThisPurchasePlcc alignCenter"
        fontSize="fs18"
        component="p"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {labels.onThisPurchasePlcc}
      </BodyCopy>
      <BodyCopy
        className="whenYouCheckOutPlcc alignCenter elem-pt-MED"
        fontSize="fs16"
        component="p"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {labels.whenYouCheckOutPlcc}
      </BodyCopy>
      <BodyCopy
        className="myPlaceRewardsCCPlcc alignCenter"
        fontSize="fs16"
        component="p"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {labels.myPlaceRewardsCCPlcc}
      </BodyCopy>
      {!earnedReward && (
        <BodyCopy
          className="finalStrRemainingPlcc alignCenter elem-pt-MED"
          fontSize="fs16"
          component="p"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          {finalStrRemainingPlcc}
        </BodyCopy>
      )}
    </div>
  );
};

PlccSection.propTypes = {
  earnedReward: PropTypes.number,
  labels: PropTypes.shape({}),
  className: PropTypes.string,
  finalStr: PropTypes.string,
  finalStrRemainingPlcc: PropTypes.string,
};

PlccSection.defaultProps = {
  className: '',
  labels: {},
  earnedReward: 0,
  finalStr: '',
  finalStrRemainingPlcc: '',
};

export default withStyles(PlccSection, Styles);
export { PlccSection as PlccSectionVanilla };
