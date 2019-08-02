import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import ImageComp from '../../../../../../common/atoms/Image';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { getIconPath } from '../../../../../../../utils';
import styles from '../styles/LoginTopSection.styles';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const LoginTopSection = ({ labels, className }) => {
  return (
    <BodyCopy component="div" textAlign="center" className={className}>
      <BodyCopy component="div" textAlign="center">
        <ImageComp src={getIconPath('my-place-rewards')} className="logo elem-mb-LRG" />
      </BodyCopy>
      <BodyCopy component="div" className="bordered elem-pt-MED elem-pb-LRG">
        <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary" textAlign="center">
          {labels.login.ACC_LBL_LOGIN_HEADING}
        </BodyCopy>
        <BodyCopy
          fontWeight="semibold"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-SM"
        >
          {labels.login.ACC_LBL_LOGIN_SUB_HEADING}
        </BodyCopy>
        <BodyCopy fontFamily="secondary" textAlign="center">
          {labels.login.ACC_LBL_LOGIN_SUB_DESCRIPTION}
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
  );
};

LoginTopSection.propTypes = {
  labels: PropTypes.shape({
    ACC_LBL_LOGIN_HEADING: PropTypes.string,
    ACC_LBL_LOGIN_SUB_HEADING: PropTypes.string,
    ACC_LBL_LOGIN_SUB_DESCRIPTION: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
};

LoginTopSection.defaultProps = {
  labels: {},
};

export default withStyles(LoginTopSection, styles);
export { LoginTopSection as LoginTopSectionVanilla };
