import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import styles from '../styles/TileOption.style';

export const TileOption = ({
  className,
  optionText,
  optionValue,
  isSelected,
  onSelection,
  questionId,
}) => {
  return (
    <div className={className}>
      <div
        className={`tile-container${isSelected ? ' selected' : ''}`}
        onClick={() => onSelection(optionValue, questionId)}
        role="presentation"
      >
        <BodyCopy fontSize="fs14" fontWeight="regular" fontFamily="secondary" className="tile-text">
          {optionText}
        </BodyCopy>
      </div>
    </div>
  );
};

TileOption.propTypes = {
  optionText: PropTypes.string,
  optionValue: PropTypes.string,
  onSelection: PropTypes.func,
  className: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  questionId: PropTypes.string.isRequired,
};

TileOption.defaultProps = {
  optionText: '',
  optionValue: '',
  onSelection: () => {},
  className: '',
};

export default withStyles(TileOption, styles);
export { TileOption as TileOptionVanilla };
