import React from 'react';

/**
 * InitialPropsHOC
 * This is a HOC of Component that is wrapped in it
 * It calls getInitialProps method of wrapped component on load
 * and calls same getInitialProps method on brand switch
 *
 * @param {*} Component
 * @returns
 */
const InitialPropsHOC = Component => {
  return class InitialProps extends React.PureComponent<Props> {
    /**
     * @function componentDidMount
     * called when component is mount and calls getInitialProps method of wrapped component
     * and adds didFocus listener to the view which is called every time view is displayed
     *
     */
    componentDidMount() {
      this.addDidFocusListener();
    }

    componentWillUnmount() {
      // Remove the did focus listener
      this.didFocusSubscription.remove();
    }

    /**
     * @function addDidFocusListener
     * Adds didFocus listener to view which is called every time view is displayed
     * It calls getInitialProps method of wrapped component if brand is switched
     *
     */
    addDidFocusListener = () => {
      const { navigation } = this.props;
      if (!navigation.addListener) return;
      this.didFocusSubscription = navigation.addListener('didFocus', () => {
        if (this.component && this.component.getInitialProps) this.component.getInitialProps();
      });
    };

    /**
     * renders wrapped component
     *
     * @returns
     */
    render() {
      return (
        <Component
          {...this.props}
          ref={ref => {
            this.component = ref;
          }}
        />
      );
    }
  };
};

export default InitialPropsHOC;
