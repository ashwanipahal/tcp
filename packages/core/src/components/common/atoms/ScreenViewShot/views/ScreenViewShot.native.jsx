// This is used for capturing screen shot
import React from 'react';
import { PropTypes } from 'prop-types';
import ViewShot from 'react-native-view-shot';

export class ScreenViewShot extends React.PureComponent {
  render() {
    const { children, setScreenViewShotRef, ...otherProps } = this.props;
    return (
      <ViewShot ref={setScreenViewShotRef} {...otherProps}>
        {children}
      </ViewShot>
    );
  }
}

ScreenViewShot.propTypes = {
  children: PropTypes.node.isRequired,
  setScreenViewShotRef: PropTypes.func.isRequired,
};

export default ScreenViewShot;
