import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import styled from 'styled-components';

const LineElement = styled.View`
  height: ${props => (props.height ? props.height : '100%')};
  width: ${props => (props.width ? props.width : '100%')};
  min-height: ${props => (props.height ? props.height : '15px')};
  background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
`;

class FadeInView extends React.Component {
  constructor(props) {
    super(props);

    this.animatedOpacity = new Animated.Value(0);

    this.state = {
      opacityValue: 0,
    };
  }

  componentDidMount() {
    this.getAnimated();

    this.intervalId = setInterval(() => {
      this.getAnimated();
    }, 800);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getAnimated() {
    const { opacityValue } = this.state;

    return Animated.timing(this.animatedOpacity, {
      toValue: opacityValue,
      duration: 500,
      useNativeDriver: true,
    }).start(() => this.setState({ opacityValue: opacityValue === 0 ? 1 : 0 }));
  }

  render() {
    const { maxOpacity, minOpacity, ...otherProps } = this.props;
    return (
      <Animated.View
        style={{
          opacity: this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [maxOpacity, minOpacity],
          }),
        }}
      >
        <LineElement {...otherProps} />
      </Animated.View>
    );
  }
}

FadeInView.propTypes = {
  minOpacity: PropTypes.number,
  maxOpacity: PropTypes.number,
};

FadeInView.defaultProps = {
  minOpacity: 0.3,
  maxOpacity: 1,
};

export default FadeInView;
