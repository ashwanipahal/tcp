import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CreateAccounPage.style';
import CreateAccountForm from '../../../molecules/CreateAccountForm';
import CreateAccountTopSection from '../../../molecules/CreateAccountTopSection';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

class CreateAccounPage extends React.Component {
  static propTypes = {
    createAccountAction: PropTypes.func,
    className: PropTypes.string,
    labels: PropTypes.shape({}),
    isIAgreeChecked: PropTypes.bool,
    hideShowPwd: PropTypes.bool,
    confirmHideShowPwd: PropTypes.bool,
    error: PropTypes.string,
    onAlreadyHaveAnAccountClick: PropTypes.func,
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
    error: {},
    onAlreadyHaveAnAccountClick: () => {},
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
    const {
      className,
      labels,
      isIAgreeChecked,
      hideShowPwd,
      confirmHideShowPwd,
      error,
      onAlreadyHaveAnAccountClick,
    } = this.props;
    return (
      <div className={className}>
        <div className="parent-wrapper">
          <CreateAccountTopSection labels={labels} />
          {error && (
            <div className="elem-pl-LRG elem-pr-LRG elem-pt-LRG">
              <BodyCopy
                fontFamily={['secondary']}
                fontWeight="semibold"
                fontSize="fs12"
                color="error"
              >
                {error}
              </BodyCopy>
            </div>
          )}
          <CreateAccountForm
            className={className}
            labels={labels}
            onSubmit={this.handleSubmitForm}
            isIAgreeChecked={isIAgreeChecked}
            hideShowPwd={hideShowPwd}
            confirmHideShowPwd={confirmHideShowPwd}
            onAlreadyHaveAnAccountClick={onAlreadyHaveAnAccountClick}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(CreateAccounPage, styles);
export { CreateAccounPage as CreateAccounPageVanilla };
