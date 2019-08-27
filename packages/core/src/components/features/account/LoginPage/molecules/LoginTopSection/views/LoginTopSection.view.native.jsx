import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import ImageComp from '../../../../../../common/atoms/Image';
import LineComp from '../../../../../../common/atoms/Line';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import TheMarketPlaceLogo from '../../../../../../../assets/my-place-rewards.png';
import favIcon from '../../../../../../../../../mobileapp/src/assets/images/filled-heart.png';
import {
  SectionStyle,
  HeadingStyle,
  SubHeadingStyle,
  DescriptionStyle,
  ImageWrapper,
} from '../LoginTopSection.style.native';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const LoginTopSection = props => {
  const { labels, variation } = props;
  const imgStyle = { alignSelf: 'center', marginTop: 20 };
  return (
    <View {...props}>
      {!(variation === 'favorites' || variation === 'checkout') && (
        <React.Fragment>
          <ImageComp source={TheMarketPlaceLogo} width={186} height={60} style={imgStyle} />

          <LineComp marginTop={30} marginBottom={17} />
          <HeadingStyle>{labels.login.lbl_login_heading}</HeadingStyle>
          <SubHeadingStyle>{labels.login.lbl_login_subHeading}</SubHeadingStyle>
          <DescriptionStyle>{labels.login.lbl_login_Description_heading_1}</DescriptionStyle>
          <DescriptionStyle>{labels.login.lbl_login_Description_heading_2}</DescriptionStyle>
          <LineComp marginTop={25} marginBottom={0} />
        </React.Fragment>
      )}

      {variation === 'favorites' && (
        <React.Fragment>
          <ImageWrapper>
            <ImageComp source={favIcon} width={20} height={18} />
          </ImageWrapper>
          <BodyCopy
            text={labels.login.lbl_login_favorites_modal_heading}
            fontSize="fs16"
            fontWeight="black"
            mobilefontFamily={['secondary']}
            textAlign="center"
          />
          <BodyCopy
            component="span"
            fontSize="fs12"
            mobilefontFamily={['secondary']}
            textAlign="center"
            text={labels.login.lbl_login_favorites_modal_heading_1}
          />
        </React.Fragment>
      )}

      {variation === 'checkout' && (
        <React.Fragment>
          <BodyCopy
            fontSize="fs28"
            fontWeight="black"
            mobilefontFamily={['primary']}
            textAlign="center"
            text={labels.login.lbl_login_checkout_modal_heading}
          />

          <BodyCopy
            component="span"
            fontSize="fs18"
            mobilefontFamily={['secondary']}
            textAlign="center"
            text={labels.login.lbl_login_checkout_modal_heading_1}
          />

          <BodyCopy
            component="span"
            fontSize="fs18"
            fontWeight="black"
            mobilefontFamily={['secondary']}
            textAlign="center"
            text={labels.login.lbl_login_checkout_modal_heading_2}
          />
          <LineComp marginTop={25} marginBottom={0} />
        </React.Fragment>
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
};

LoginTopSection.defaultProps = {
  labels: {
    login: {
      lbl_login_heading: 'Welcome Back',
      lbl_login_subHeading: 'Log in to earn points for MY PLACE REWARDS ',
      lbl_login_subDescription_heading_1: 'Signed up in store?\n',
      lbl_login_subDescription_heading_2:
        'An online account has been created with your email! Click here to reset your password.',
    },
  },
};

export default withStyles(LoginTopSection, SectionStyle);
export { LoginTopSection as LoginTopSectionVanilla };
