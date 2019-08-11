import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../../common/atoms/Button';
import {
  BtnWrapper,
  MarginRightWrapper,
} from '../styles/BonusPointsAvailability.view.style.native';

let buttonStyle = {
  fontWeight: '400',
  marginBottom: 24,
  fontSize: 10,
  paddingRight: 5,
  paddingLeft: 5,
  paddingBottom: 5,
};

const BonusPointsAvailability = ({ bonusPoints }) => {
  const bonusPointsLength = bonusPoints && bonusPoints.length;

  return (
    <BtnWrapper>
      {bonusPoints &&
        bonusPoints.map((item, index) => {
          buttonStyle = Object.assign({}, buttonStyle, {
            color: item.disabled ? '#575757' : '#1a1a1a',
            paddingTop: bonusPointsLength === 1 ? 14 : 5,
          });
          return (
            <MarginRightWrapper bonusPointsLength={bonusPointsLength}>
              <Button
                buttonVariation="variable-width"
                width={bonusPointsLength === 1 ? '225px' : '103px'}
                height="42px"
                id={index}
                data-locator={item.dataLocator}
                text={item.buttonText}
                style={buttonStyle}
                disableButton
              />
            </MarginRightWrapper>
          );
        })}
    </BtnWrapper>
  );
};

BonusPointsAvailability.propTypes = {
  bonusPoints: PropTypes.shape([]),
};

BonusPointsAvailability.defaultProps = {
  bonusPoints: [{ disabled: false, buttonText: '' }],
};

export default BonusPointsAvailability;
