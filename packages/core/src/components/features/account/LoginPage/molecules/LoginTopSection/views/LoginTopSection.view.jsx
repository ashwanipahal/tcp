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
const LoginTopSection = ({ labels, className, isCanada, variation }) => {
  let subDescKeys = [];
  if (!isCanada) {
    subDescKeys = Object.keys(labels.login).filter(lbl => /lbl_login_subDescription_/.test(lbl));
  }
  return (
    <BodyCopy component="div" textAlign="center" className={className}>
      {!isCanada && !(variation === 'favorites' || variation === 'checkout') && (
        <BodyCopy component="div" textAlign="center" className="bordered">
          <ImageComp
            src={getIconPath('my-place-rewards')}
            className="logo elem-mb-LRG"
            data-locator="login-mprbanner"
          />
        </BodyCopy>
      )}
      {!(variation === 'favorites' || variation === 'checkout') && (
        <>
          <BodyCopy component="div" className="bordered elem-pt-MED elem-pb-LRG">
            <BodyCopy fontSize="fs14" fontWeight="black" fontFamily="secondary" textAlign="center">
              {labels.login.lbl_login_heading}
            </BodyCopy>
            {subDescKeys.length > 0 &&
              subDescKeys.map(key => (
                <BodyCopy fontFamily="secondary" textAlign="center" fontSize="fs12">
                  {labels.login[key]}
                </BodyCopy>
              ))}
          </BodyCopy>
        </>
      )}
      {variation === 'checkout' && (
        <>
          <BodyCopy fontSize="fs36" fontWeight="black" fontFamily="secondary" textAlign="center">
            {labels.login.lbl_login_checkout_modal_heading}
          </BodyCopy>

          <BodyCopy component="span" fontSize="fs18" fontFamily="secondary" textAlign="center">
            {labels.login.lbl_login_checkout_modal_heading_1}
          </BodyCopy>
          <BodyCopy
            component="span"
            fontSize="fs18"
            fontWeight="black"
            fontFamily="secondary"
            textAlign="center"
          >
            {labels.login.lbl_login_checkout_modal_heading_2}
          </BodyCopy>
        </>
      )}
      {variation === 'favorites' && (
        <>
          <BodyCopy fontSize="fs16" fontWeight="black" fontFamily="secondary" textAlign="center">
            {labels.login.lbl_login_favorites_modal_heading}
          </BodyCopy>

          <BodyCopy
            component="span"
            fontSize="fs12"
            fontWeight="black"
            fontFamily="secondary"
            textAlign="center"
          >
            {labels.login.lbl_login_favorites_modal_heading_1}
          </BodyCopy>
        </>
      )}
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
  variation: PropTypes.bool.isRequired,
};

LoginTopSection.defaultProps = {
  labels: {},
  isCanada: false,
};

export default withStyles(LoginTopSection, styles);
export { LoginTopSection as LoginTopSectionVanilla };
