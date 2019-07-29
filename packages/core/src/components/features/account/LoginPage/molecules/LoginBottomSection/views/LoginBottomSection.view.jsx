import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import styles from '../styles/LoginBottomSection.styles';

const LoginBottomSection = ({ labels, className }) => {
  return (
    <div className={`${className} elem-pt-LRG`}>
      <BodyCopy textAlign="center" className="elem-mb-LRG">{labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_HELP}</BodyCopy>
      <Button
        fill="BLUE"
        type="submit"
        buttonVariation="fixed-width"
        data-locator=""
      >
        {labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_CTA}
      </Button>
    </div>
)
}

LoginBottomSection.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(LoginBottomSection, styles);
