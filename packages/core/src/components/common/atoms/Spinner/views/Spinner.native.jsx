import React from 'react';
import { Animated } from 'react-native';
import SpinnerWrapper, { MainView } from '../styles/Spinner.style.native';

const AnimatedMainView = Animated.createAnimatedComponent(MainView);

class SpinnerView extends React.Component {
  constructor(props) {
    super(props);
    this.moveAnimation = new Animated.ValueXY({ x: 0, y: 0 });
    this.state = {
      squeezeHeight: new Animated.Value(8),
      expandHeight: new Animated.Value(0),
      viewHeight: 8,
      viewWidth: 8,
      squeezeViewMarginLeft: 17,
      marginLeft: 10,
    };
  }

  componentDidMount() {
    this.showSpinnerAnimation();
  }

  showSpinnerAnimation = () => {
    const { squeezeHeight, expandHeight } = this.state;
    Animated.loop(
      Animated.parallel([
        Animated.timing(expandHeight, {
          duration: 300,
          toValue: 8,
        }),
        Animated.spring(this.moveAnimation, {
          toValue: { x: 10, y: 0 },
          duration: 200,
        }),
        Animated.timing(squeezeHeight, {
          duration: 500,
          toValue: 0,
        }),
      ])
    ).start();
  };

  render() {
    const {
      squeezeHeight,
      expandHeight,
      viewHeight,
      viewWidth,
      marginLeft,
      squeezeViewMarginLeft,
    } = this.state;
    return (
      <SpinnerWrapper>
        <AnimatedMainView
          style={{
            width: expandHeight,
            height: expandHeight,
          }}
        />
        <AnimatedMainView
          style={[{ width: viewWidth, height: viewHeight }, this.moveAnimation.getLayout()]}
        />
        <AnimatedMainView
          style={[
            { marginLeft, width: viewWidth, height: viewHeight },
            this.moveAnimation.getLayout(),
          ]}
        />
        <AnimatedMainView
          style={[
            {
              marginLeft: squeezeViewMarginLeft,
              width: squeezeHeight,
              height: squeezeHeight,
            },
          ]}
        />
      </SpinnerWrapper>
    );
  }
}

export default SpinnerView;
