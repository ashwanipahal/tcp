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
const LoginTopSection = ({ labels, className, isCanada }) => {
  return (
    <BodyCopy component="div" textAlign="center" className={className}>
      {!isCanada && (
        <BodyCopy component="div" textAlign="center">
          <ImageComp src={getIconPath('my-place-rewards')} className="logo elem-mb-LRG" />
        </BodyCopy>
      )}
      <BodyCopy component="div" className="bordered elem-pt-MED elem-pb-LRG">
        <BodyCopy fontSize="fs14" fontWeight="black" fontFamily="secondary" textAlign="center">
          {labels.login.lbl_login_heading}
        </BodyCopy>
        <BodyCopy
          fontWeight="semibold"
          fontSize="fs13"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-SM"
        >
          {labels.login.lbl_login_subHeading}
        </BodyCopy>
        {!isCanada && (
          <BodyCopy fontFamily="secondary" textAlign="center" fontSize="fs12">
            {labels.login.lbl_login_subDescription}
          </BodyCopy>
        )}
      </BodyCopy>
    </BodyCopy>
  );
};

LoginTopSection.propTypes = {
  labels: PropTypes.shape({
    lbl_login_heading: PropTypes.string,
    lbl_login_subHeading: PropTypes.string,
    lbl_login_subDescription: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
  isCanada: PropTypes.bool,
};

LoginTopSection.defaultProps = {
  labels: {},
  isCanada: false,
};

export default withStyles(LoginTopSection, styles);
export { LoginTopSection as LoginTopSectionVanilla };
