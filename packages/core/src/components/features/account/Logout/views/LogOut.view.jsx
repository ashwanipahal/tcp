import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Button from '../../../../common/atoms/Button';

class LogOutView extends React.Component {
  constructor(props) {
    super(props);
    this.logoutApp = this.logoutApp.bind(this);
    const [body] = document.getElementsByTagName('body');
    this.body = body;
  }

  logoutApp(e) {
    e.preventDefault();
    const { triggerLogout } = this.props;
    triggerLogout();
  }

  render() {
    const { className, underline, labels } = this.props;
    return (
      <React.Fragment className={className}>
        <Button
          onClick={this.logoutApp}
          nohover
          type="button"
          link
          underline={underline}
          className="elem-pb-SM"
          fontSizeVariation="large"
          anchorVariation="primary"
        >
          {getLabelValue(labels, 'CREATE_ACC_SIGN_OUT')}
        </Button>
      </React.Fragment>
    );
  }
}

LogOutView.propTypes = {
  className: PropTypes.string.isRequired,
  triggerLogout: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  underline: PropTypes.bool,
};

LogOutView.defaultProps = {
  underline: false,
};

export default LogOutView;
export { LogOutView as LogOutViewVanilla };
