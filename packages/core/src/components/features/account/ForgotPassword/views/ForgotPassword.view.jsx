import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextBox from '../../../../common/atoms/TextBox';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Button from '../../../../common/atoms/Button';
// @flow
type Props = {
  pristine: any,
  className: any,
  onSubmitForgot: Object => void,
};

type State = {
  country: string,
};
class ForgotPasswordView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  changeHandler = e => {
    this.setState({
      email: e.target.value,
    });
  };

  showForgotPasswordForm = () => {};

  onFormSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    const { onSubmitForgot } = this.props;
    onSubmitForgot({
      logonId: email.toUpperCase().trim(),
    });
  };

  render() {
    const { pristine, className } = this.props;
    const { email } = this.state;
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className={className}>
          <Row fullBleed>
            <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
              <Field
                name="Email"
                id="Email"
                type="Email"
                component={TextBox}
                value={email}
                onChange={this.changeHandler}
              />
            </Col>
            <Col
              className="AddAddressForm__submit"
              colSize={{ small: 4, medium: 3, large: 3 }}
              offsetLeft={{ small: 1 }}
            >
              <Button fill="BLUE" disabled={pristine} type="submit" buttonVariation="fixed-width">
                Reset Password
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ForgotPasswordView', // a unique identifier for this form
})(ForgotPasswordView);
