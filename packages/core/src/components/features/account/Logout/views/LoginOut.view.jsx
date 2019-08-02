import React from 'react';
import PropTypes from 'prop-types';

class LogOutView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { labels } = this.props;
    return (
      <React.Fragment className={className}>
        <div>
          <Anchor
            onClick={this.onBackClick}
            className="elem-pb-SM"
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            to="/account?id=address-book"
            data-locator="addnewaddress-back"
          >
            {labels.FORGOT_PASSWORD_BACK_LOGIN}
          </Anchor>
        </div>
      </React.Fragment>
    );
  }
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default LoginView;
