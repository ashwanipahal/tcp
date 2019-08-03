import React from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CreateAccounPage.style';
import CreateAccountForm from '../../../molecules/CreateAccountForm';
import CreateAccountTopSection from '../../../molecules/CreateAccountTopSection';

class CreateAccounPage extends React.Component {
  static propTypes = {
    createAccountAction: PropTypes.func,
    labels: {},
    isIAgreeChecked: PropTypes.bool,
  };

  static defaultProps = {
    createAccountAction: () => {},
    labels: PropTypes.shape({}),
    isIAgreeChecked: false,
  };

  constructor(props) {
    super(props);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.state = { hideShowPwd: false, confirmHideShowPwd: false };
    this.onPwdHideShowClick = this.onPwdHideShowClick.bind(this);
    this.onConfirmPwdHideShowClick = this.onConfirmPwdHideShowClick.bind(this);
  }

  onPwdHideShowClick = value => {
    this.setState({ hideShowPwd: value });
  };

  onConfirmPwdHideShowClick = value => {
    this.setState({ confirmHideShowPwd: value });
  };

  handleSubmitForm(payload) {
    const { createAccountAction } = this.props;
    createAccountAction(payload);
  }

  render() {
    const { labels, isIAgreeChecked } = this.props;
    const { hideShowPwd, confirmHideShowPwd } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false} {...this.props}>
        <View>
          <CreateAccountTopSection labels={labels} />
          <CreateAccountForm
            labels={labels}
            handleSubmitForm={this.handleSubmitForm}
            onPwdHideShowClick={this.onPwdHideShowClick}
            hideShowPwd={hideShowPwd}
            onConfirmPwdHideShowClick={this.onConfirmPwdHideShowClick}
            confirmHideShowPwd={confirmHideShowPwd}
            isIAgreeChecked={isIAgreeChecked}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withStyles(CreateAccounPage, styles);
export { CreateAccounPage as CreateAccounPageVanilla };
