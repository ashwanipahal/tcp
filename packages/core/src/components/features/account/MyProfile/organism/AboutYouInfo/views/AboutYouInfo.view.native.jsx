import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import AboutYouInformationContainer from '@tcp/core/src/components/features/account/AboutYouInformation';
import ModalViewWrapper from '@tcp/core/src/components/features/account/MyProfile/organism/ChangePasswordInfo/styles/ChangePasswordInfo.style.native';
import { getLabelValue } from '@tcp/core/src/utils/utils';

export class AboutYouInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAboutYouInfoEditModal: false,
    };
  }

  /**
   * This function is to open/close the survey edit modal from child components
   */
  toggleModal = () => {
    const { showAboutYouInfoEditModal } = this.state;
    this.setState({
      showAboutYouInfoEditModal: !showAboutYouInfoEditModal,
    });
  };

  render() {
    const { labels, userSurvey } = this.props;
    const answer1 = (userSurvey && userSurvey.size && userSurvey.getIn([0, 0])) || '';
    const answer2Array = userSurvey && userSurvey.size && userSurvey.get(1);
    const answer2 = answer2Array && answer2Array.size ? answer2Array.join(', ') : '';
    const { showAboutYouInfoEditModal } = this.state;

    return (
      <MyProfileTile
        title={getLabelValue(labels, 'lbl_profile_about_you_title')}
        ctaTitle={getLabelValue(labels, 'lbl_profile_update_info')}
        dataLocator="moreaboutyou-updateinfo"
        handleComponentChange={this.toggleModal}
      >
        <BodyCopyWithSpacing
          data-locator="moreaboutyou-describetext"
          fontSize="fs13"
          fontFamily="secondary"
          fontWeight="regular"
          text={`${getLabelValue(labels, 'lbl_profile_about_you_describe')}: ${answer1}`}
        />
        <View marginTop={20}>
          {answer2 !== '' && (
            <BodyCopyWithSpacing
              data-locator="moreaboutyou-shoppingfortext"
              fontSize="fs13"
              fontFamily="secondary"
              fontWeight="regular"
              text={`${getLabelValue(labels, 'lbl_profile_about_you_shopping')}: ${answer2}`}
            />
          )}
        </View>
        <ModalNative
          isOpen={showAboutYouInfoEditModal}
          onRequestClose={this.toggleModal}
          heading={getLabelValue(labels, 'lbl_profile_about_you_modal_heading')}
        >
          <SafeAreaView>
            <ModalViewWrapper>
              <AboutYouInformationContainer labels={labels} onClose={this.toggleModal} />
            </ModalViewWrapper>
          </SafeAreaView>
        </ModalNative>
      </MyProfileTile>
    );
  }
}

AboutYouInfo.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_update_info: PropTypes.string,
    lbl_profile_about_you_modal_heading: PropTypes.string,
    lbl_profile_about_you_shopping: PropTypes.string,
    lbl_profile_about_you_describe: PropTypes.string,
  }),
  userSurvey: PropTypes.shape([]).isRequired,
};

AboutYouInfo.defaultProps = {
  labels: {
    lbl_profile_about_you_modal_heading: '',
    lbl_profile_update_info: '',
    lbl_profile_about_you_shopping: '',
    lbl_profile_about_you_describe: '',
  },
};

export default AboutYouInfo;
