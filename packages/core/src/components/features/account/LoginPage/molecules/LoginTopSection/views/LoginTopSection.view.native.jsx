import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import ImageComp from '../../../../../../common/atoms/Image';
import LineComp from '../../../../../../common/atoms/Line';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import TheMarketPlaceLogo from '../../../../../../../assets/my-place-rewards.png';
import favIcon from '../../../../../../../../../mobileapp/src/assets/images/empty-heart.png';
import {
  SectionStyle,
  HeadingStyle,
  ResetPassword,
  ImageWrapper,
  FavtHeading,
  FavtSubHeading,
  WelcomeBackWrapper,
} from '../LoginTopSection.style.native';
import Anchor from '../../../../../../common/atoms/Anchor';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const showForgotPassword = props => {
  const { showForgotPasswordForm } = props;
  showForgotPasswordForm();
};

const LoginTopSection = props => {
  const { labels, variation, updateHeader } = props;
  const imgStyle = { alignSelf: 'center', marginTop: 20 };

  if (variation === 'checkout' && updateHeader) {
    updateHeader(); // hide the header and rule line
  }

  return (
    <View {...props}>
      {!(variation === 'favorites' || variation === 'checkout') && (
        <React.Fragment>
          <ImageComp source={TheMarketPlaceLogo} width={186} height={60} style={imgStyle} />

          <LineComp marginTop={30} marginBottom={17} />
          <HeadingStyle>{getLabelValue(labels, 'lbl_login_heading', 'login')}</HeadingStyle>

          <BodyCopy
            fontSize="fs12"
            textAlign="center"
            text={getLabelValue(labels, 'lbl_login_subDescription_heading_1', 'login')}
          />

          <BodyCopy
            fontSize="fs12"
            textAlign="center"
            text={getLabelValue(labels, 'lbl_login_Description_heading_2', 'login')}
          />
          <ResetPassword>
            <Anchor
              id="forgotPasswordForm"
              class="clickhere"
              fontSizeVariation="medium"
              text={getLabelValue(labels, 'lbl_login_Description_clickhere', 'login')}
              underline
              onPress={() => {
                showForgotPassword(props);
              }}
            />
            <BodyCopy
              component="span"
              fontSize="fs12"
              text={getLabelValue(labels, 'lbl_login_Description_heading_3', 'login')}
            />
          </ResetPassword>
          <LineComp marginTop={25} marginBottom={0} />
        </React.Fragment>
      )}

      {variation === 'favorites' && (
        <>
          <ImageWrapper>
            <ImageComp source={favIcon} width={22} height={20} />
          </ImageWrapper>
          <FavtHeading>
            <BodyCopy
              text={getLabelValue(labels, 'lbl_login_favorites_modal_heading', 'login')}
              fontSize="fs16"
              fontWeight="black"
              mobilefontFamily={['secondary']}
              textAlign="center"
            />
          </FavtHeading>
          <FavtSubHeading>
            <BodyCopy
              component="span"
              fontSize="fs12"
              mobilefontFamily={['secondary']}
              textAlign="center"
              text={getLabelValue(labels, 'lbl_login_favorites_modal_heading_1', 'login')}
            />
          </FavtSubHeading>
        </>
      )}
      {variation === 'checkout' && (
        <>
          <WelcomeBackWrapper>
            <BodyCopy
              fontSize="fs28"
              fontWeight="black"
              fontFamily="primary"
              textAlign="center"
              text={getLabelValue(labels, 'lbl_login_checkout_modal_heading', 'login')}
            />
          </WelcomeBackWrapper>

          <BodyCopy
            fontSize="fs18"
            fontFamily="secondary"
            fontWeight="regular"
            textAlign="center"
            text={getLabelValue(labels, 'lbl_login_checkout_modal_heading_1', 'login')}
          />

          <BodyCopy
            fontSize="fs18"
            fontWeight="black"
            fontFamily="secondary"
            textAlign="center"
            text={getLabelValue(labels, 'lbl_login_checkout_modal_heading_2', 'login')}
          />
          <LineComp small marginTop={25} marginBottom={0} />
        </>
      )}
    </View>
  );
};

LoginTopSection.propTypes = {
  variation: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    login: {
      lbl_login_heading: PropTypes.string,
      lbl_login_subHeading: PropTypes.string,
      lbl_login_subDescription: PropTypes.string,
    },
  }),
  updateHeader: PropTypes.func.isRequired,
};

LoginTopSection.defaultProps = {
  labels: {
    login: {
      lbl_login_heading: 'Welcome Back',
      lbl_login_subHeading: 'Log in to earn points for MY PLACE REWARDS ',
      lbl_login_subDescription_heading_1: 'Signed up in store?\n',
      lbl_login_subDescription_heading_2:
        'An online account has been created with your email! Click here to reset your password.',
      lbl_login_favorites_modal_heading: '',
      lbl_login_favorites_modal_heading_1: '',
      lbl_login_checkout_modal_heading: '',
      lbl_login_checkout_modal_heading_1: '',
      lbl_login_checkout_modal_heading_2: '',
    },
  },
};

export default withStyles(LoginTopSection, SectionStyle);
export { LoginTopSection as LoginTopSectionVanilla };
