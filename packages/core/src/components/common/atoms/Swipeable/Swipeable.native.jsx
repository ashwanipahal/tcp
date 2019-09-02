import Swipeable from 'react-native-swipeable';

// / @name open
// / @description This will open the left or right buttons
// / @arg {string} side ['right'] - The side to open.
// / @arg {fn} onDone - do something after the buttons are open

/* eslint-disable no-underscore-dangle */
Swipeable.prototype.open = function open(side = 'right', onDone) {
  const { pan } = this.state;
  const left = side === 'left';
  const right = side === 'right';

  this.setState(
    {
      leftActionActivated: left,
      leftButtonsActivated: left,
      rightActionActivated: right,
      rightButtonsActivated: right,
    },
    () => {
      const animationFn = this._getReleaseAnimationFn();
      const animationConfig = this._getReleaseAnimationConfig();
      this.setState({
        lastOffset: animationConfig.toValue,
        leftActionActivated: false,
        leftButtonsActivated: left,
        leftButtonsOpen: left,
        rightActionActivated: false,
        rightButtonsActivated: right,
        rightButtonsOpen: right,
      });
      pan.flattenOffset();

      animationFn(pan, animationConfig).start(onDone);
    }
  );
};

// / @name toggle
// / @description This will open the left or right buttons
// / @arg {string} side ['right'] - The side to open.
// / @arg {fn} onDone - do something after the buttons are toggled
Swipeable.prototype.toggle = function toggle(side = 'right', onDone) {
  if (!this.state[`${side}ButtonsOpen`]) {
    this.open(side, onDone);
  } else {
    this.recenter();
  }
};

export default Swipeable;
