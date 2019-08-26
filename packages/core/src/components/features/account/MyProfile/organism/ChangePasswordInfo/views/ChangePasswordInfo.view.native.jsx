import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import ChangePasswordContainer from '@tcp/core/src/components/features/account/ChangePassword/container/ChangePassword.container';
import {
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
} from '../styles/ChangePasswordInfo.style.native';

export class ChangePasswordInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showChangePasswordModal: false,
    };
  }

  toggleModal = () => {
    const { showChangePasswordModal } = this.state;
    this.setState({
      showChangePasswordModal: !showChangePasswordModal,
    });
  };

  render() {
    const { labels } = this.props;
    const { showChangePasswordModal } = this.state;
    return (
      <View>
        <MyProfileTile
          title={labels.lbl_profile_password}
          ctaTitle={labels.lbl_profile_change_password}
          handleComponentChange={this.toggleModal}
        >
          <BodyCopyWithSpacing
            fontSize="fs16"
            spacingStyles="margin-bottom-MED"
            text={labels.lbl_profile_change_your_password}
          />
          <BodyCopyWithSpacing
            fontSize="fs14"
            spacingStyles="margin-bottom-MED"
            text={labels.lbl_profile_password_info_line1}
          />
          <BodyCopyWithSpacing fontSize="fs14" text={labels.lbl_profile_password_info_line2} />
        </MyProfileTile>
        <ModalNative isOpen={showChangePasswordModal} onRequestClose={this.toggleModal}>
          <ModalHeading>
            <BodyCopy
              mobileFontFamily={['secondary']}
              fontWeight="extrabold"
              fontSize="fs16"
              text={labels.lbl_profile_change_password}
            />
          </ModalHeading>
          <LineWrapper>
            <LineComp marginTop={10} marginBottom={10} borderWidth={1.5} borderColor="black" />
          </LineWrapper>
          <SafeAreaView>
            <ModalViewWrapper>
              <ChangePasswordContainer labels={labels} onClose={this.toggleModal} />
            </ModalViewWrapper>
          </SafeAreaView>
        </ModalNative>
      </View>
    );
  }
}

ChangePasswordInfo.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_password: PropTypes.string,
    lbl_profile_change_password: PropTypes.string,
    lbl_profile_change_your_password: PropTypes.string,
    lbl_profile_password_info_line1: PropTypes.string,
    lbl_profile_password_info_line2: PropTypes.string,
  }),
  handleComponentChange: PropTypes.func.isRequired,
};

ChangePasswordInfo.defaultProps = {
  labels: {
    lbl_profile_password: '',
    lbl_profile_change_password: '',
    lbl_profile_change_your_password: '',
    lbl_profile_password_info_line1: '',
    lbl_profile_password_info_line2: '',
  },
};

export default ChangePasswordInfo;
