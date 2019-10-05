import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/PlccSection.style';
import { BodyCopy } from '../../../../../../common/atoms';

const PlccSection = props => {
  const { className, finalPointsLabelStr, finalStrRemainingPlcc, labels, earnedReward } = props;

  return (
    <div className={`${className} bodyPlcc`}>
      <BodyCopy
        className="youCanEarnPointsPlcc alignCenter elem-pt-MED"
        fontSize="fs18"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {finalPointsLabelStr}
      </BodyCopy>
      <BodyCopy
        className="onThisPurchasePlcc alignCenter"
        fontSize="fs18"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {labels.onThisPurchasePlcc}
      </BodyCopy>
      <BodyCopy
        className="whenYouCheckOutPlcc alignCenter elem-pt-MED"
        fontSize="fs16"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {labels.whenYouCheckOutPlcc}
      </BodyCopy>
      <BodyCopy
        className="myPlaceRewardsCCPlcc alignCenter"
        fontSize="fs16"
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
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  finalPointsLabelStr: PropTypes.string,
  finalStrRemainingPlcc: PropTypes.string,
};

PlccSection.defaultProps = {
  className: '',
  earnedReward: 0,
  finalPointsLabelStr: '',
  finalStrRemainingPlcc: '',
};

export default withStyles(PlccSection, Styles);
export { PlccSection as PlccSectionVanilla };
