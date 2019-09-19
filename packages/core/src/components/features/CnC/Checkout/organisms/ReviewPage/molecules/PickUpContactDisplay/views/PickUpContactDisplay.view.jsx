import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/PickUpContactDisplay.style';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';

class PickUpContactDisplay extends React.PureComponent {
  render() {
    const { className, formData } = this.props;

    return (
      <div className={className}>
        <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
          {`${formData.get('firstName')} ${formData.get('lastName')}`}
        </BodyCopy>
        {formData.get('phoneNumber') && (
          <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
            {formData.get('phoneNumber')}
          </BodyCopy>
        )}
        {formData.get('emailAddress') && (
          <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
            {formData.get('emailAddress')}
          </BodyCopy>
        )}
      </div>
    );
  }
}

PickUpContactDisplay.propTypes = {
  className: PropTypes.string.isRequired,
  formData: PropTypes.shape({}).isRequired,
};

export default withStyles(PickUpContactDisplay, styles);
export { PickUpContactDisplay as PickUpContactDisplayVanilla };
