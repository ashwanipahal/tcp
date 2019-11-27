import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routerPush } from '@tcp/core/src/utils';
import { Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/BackToView.style';

class BackToView extends PureComponent {
  routesBack = e => {
    e.preventDefault();
    const { defaultOpen } = this.props;
    if (defaultOpen) {
      routerPush('/', '/home');
    } else if (window.history.length > 2) window.history.back();
    else {
      routerPush('/', '/home');
    }
  };

  render() {
    const { className, linkText } = this.props;

    return (
      <div className={className}>
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          handleLinkClick={this.routesBack}
          noLink
          className={`${className}__backlink`}
          title={linkText}
        >
          <span className="left-arrow" />
          {linkText}
        </Anchor>
      </div>
    );
  }
}

BackToView.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

BackToView.defaultProps = {
  children: null,
};

export default withStyles(BackToView, style);
