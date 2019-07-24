import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from './Drawer.style';

class Drawer extends React.Component {
  isDrawerNotRequiredOnAllViewports = (mobile, tablet, desktop) => {
    return mobile && tablet && desktop;
  };

  render() {
    const { children, className, mobile, tablet, desktop, open } = this.props;

    return (
      <React.Fragment>
        {this.isDrawerNotRequiredOnAllViewports(mobile, tablet, desktop) && (
          <React.Fragment>{children}</React.Fragment>
        )}
        {
          <React.Fragment>
            <aside className={`${className} tcp-drawer ${open && 'tcp-drawer__isOpen'}`}>
              <div className="tcp-drawer-content">{children}</div>
            </aside>
            <div className={`${className} ${open && 'tcp-drawer-overlay'}`} />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
  tablet: PropTypes.bool,
  desktop: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

Drawer.defaultProps = {
  mobile: false,
  tablet: false,
  desktop: false,
};

export { Drawer as DrawerVanilla };
export default withStyles(Drawer, style);
