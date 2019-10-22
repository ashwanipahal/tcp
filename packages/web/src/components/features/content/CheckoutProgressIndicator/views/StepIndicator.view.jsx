import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from '../StepIndicator.style';

const StepIndicator = ({ className, key, name, isActive, isComplete, onClick }) => {
  let stepClass = '';
  let indicatorClass = '';

  if (isActive) {
    stepClass = 'active';
    indicatorClass = 'white-dot ';
  } else if (isComplete) {
    stepClass = 'completed';
    indicatorClass = 'white-background ';
  } else {
    stepClass = 'pending';
    indicatorClass = 'pending-background ';
  }

  return (
    <li className={`${className}${' stepIndicatorList '}${stepClass}`} key={key}>
      <span className={indicatorClass} />
      {isComplete ? (
        <button type="button" onClick={onClick}>
          <BodyCopy
            className="stageName"
            component="span"
            color="text.primary"
            fontFamily="secondary"
            fontWeight={stepClass !== 'pending' ? 'extrabold' : ''}
          >
            {name}
          </BodyCopy>
        </button>
      ) : (
        <BodyCopy
          className="stageName"
          component="span"
          color="text.primary"
          fontFamily="secondary"
          fontWeight={stepClass !== 'pending' ? 'extrabold' : ''}
        >
          {name}
        </BodyCopy>
      )}
    </li>
  );
};

StepIndicator.propTypes = {
  className: PropTypes.string.isRequired,
  key: PropTypes.string,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func,
};

StepIndicator.defaultProps = {
  key: '',
  isActive: false,
  isComplete: false,
  onClick: () => {},
};

export default withStyles(StepIndicator, style);
