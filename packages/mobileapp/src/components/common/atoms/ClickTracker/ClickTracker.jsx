import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { trackClick, setClickAnalyticsData } from '@tcp/core/src/analytics/actions';

export class ClickTracker extends React.PureComponent {
  handlePress = () => {
    const {
      onPress,
      trackClickAction,
      setClickAnalyticsDataAction,
      clickData,
      name,
      module,
      ...otherprops
    } = this.props;
    setClickAnalyticsDataAction(clickData);
    trackClickAction({ name, module });
    onPress();
    setClickAnalyticsDataAction({});
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { as: Component, onPress, children, ...otherprops } = this.props;
    return children ? (
      <Component onPress={this.handlePress} {...otherprops}>
        {children}
      </Component>
    ) : (
      <Component onPress={this.handlePress} {...otherprops} />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    trackClickAction: data => {
      dispatch(trackClick(data));
    },
    setClickAnalyticsDataAction: data => {
      dispatch(setClickAnalyticsData(data));
    },
  };
};

ClickTracker.propTypes = {
  as: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  clickData: PropTypes.shape({}),
  pageData: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

ClickTracker.defaultProps = {
  as: { TouchableOpacity },
  name: '',
  children: null,
  clickData: null,
  pageData: null,
};

export default connect(
  null,
  mapDispatchToProps
)(ClickTracker);
