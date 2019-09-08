import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import ImageComp from '../../../../../../common/atoms/Image';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { getIconPath } from '../../../../../../../utils';
import styles from '../styles/LoginTopSection.styles';
import Anchor from '../../../../../../common/atoms/Anchor';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const showForgotPassword = showForgotPasswordForm => {
  showForgotPasswordForm();
};

const LoginTopSection = ({ labels, className, isCanada, variation, showForgotPasswordForm }) => {
  const renderFavtandCheckout = () => {
    return (
      <React.Fragment>
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
            <BodyCopy component="div" textAlign="center">
              <ImageComp
                width={25}
                height={23}
                src={getIconPath('empty-fav-icon')}
                className="elem-mb-LRG"
                data-locator="login-HEART"
              />
            </BodyCopy>
            <BodyCopy
              fontSize="fs16"
              fontWeight="black"
              fontFamily="secondary"
              textAlign="center"
              className="favt_modal_heading"
              color="gray.700"
            >
              {labels.login.lbl_login_favorites_modal_heading}
            </BodyCopy>

            <BodyCopy component="span" fontSize="fs12" fontFamily="secondary" textAlign="center">
              {labels.login.lbl_login_favorites_modal_heading_1}
            </BodyCopy>
          </>
        )}
      </React.Fragment>
    );
  };
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

            {!isCanada && (
              <BodyCopy
                fontSize="fs13"
                fontFamily="secondary"
                textAlign="center"
                className="signuptext"
              >
                {labels.login.lbl_login_subHeading}
              </BodyCopy>
            )}
            {isCanada && (
              <BodyCopy fontSize="fs12" fontFamily="secondary" textAlign="center">
                {labels.login.lbl_login_heading_2}
              </BodyCopy>
            )}
            <BodyCopy fontFamily="secondary" fontSize="fs12" textAlign="center">
              {labels.login.lbl_login_Description_heading_1}
            </BodyCopy>

            <BodyCopy fontFamily="secondary" fontSize="fs12" textAlign="center">
              {labels.login.lbl_login_Description_heading_2}
            </BodyCopy>
            <BodyCopy component="div" textAlign="center">
              <Anchor
                fontSizeVariation="medium"
                anchorVariation="primary"
                underline
                textAlign="center"
                noLink
                onClick={e => {
                  e.preventDefault();
                  showForgotPassword(showForgotPasswordForm);
                }}
              >
                {labels.login.lbl_login_Description_clickhere}
              </Anchor>
              <BodyCopy fontFamily="secondary" component="span" textAlign="center" fontSize="fs12">
                {labels.login.lbl_login_Description_heading_3}
              </BodyCopy>
            </BodyCopy>
          </BodyCopy>
        </>
      )}

      {renderFavtandCheckout()}
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
  showForgotPasswordForm: PropTypes.func,
};

LoginTopSection.defaultProps = {
  labels: {},
  isCanada: false,
  showForgotPasswordForm: () => {},
};

export default withStyles(LoginTopSection, styles);
export { LoginTopSection as LoginTopSectionVanilla };
