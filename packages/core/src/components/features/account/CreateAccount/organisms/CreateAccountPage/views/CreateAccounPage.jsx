import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CreateAccounPage.style';
import CreateAccountForm from '../../../molecules/CreateAccountForm';

class CreateAccounPage extends React.Component {
  static propTypes = {
    createAccountAction: PropTypes.func,
    className: PropTypes.string,
    labels: PropTypes.shape({}),
    isIAgreeChecked: PropTypes.bool,
    hideShowPwd: PropTypes.bool,
    confirmHideShowPwd: PropTypes.bool,
  };

  static defaultProps = {
    createAccountAction: () => {},
    className: '',
    labels: {
      CREATE_ACC_LBL_HIDE: 'hide',
    },
    isIAgreeChecked: false,
    hideShowPwd: false,
    confirmHideShowPwd: false,
  };

  constructor(props) {
    super(props);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm(payload) {
    const { createAccountAction } = this.props;
    createAccountAction(payload);
  }

  render() {
    const { className, labels, isIAgreeChecked, hideShowPwd, confirmHideShowPwd } = this.props;
    return (
      <div className={className}>
        <CreateAccountForm
          className={className}
          labels={labels}
          onSubmit={this.handleSubmitForm}
          isIAgreeChecked={isIAgreeChecked}
          hideShowPwd={hideShowPwd}
          confirmHideShowPwd={confirmHideShowPwd}
        />
      </div>
    );
  }
}

export default withStyles(CreateAccounPage, styles);
export { CreateAccounPage as CreateAccounPageVanilla };
