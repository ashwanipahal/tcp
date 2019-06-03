const ARROW_RIGHT = {
  animateLeft: {
    small: '&::before { transform: scaleX(1.3); }',
    large: '&::before { transform: scaleX(1.5); }',
  },
  animateRight: '&::before { width: 26px; }',
};

const PLUS = 'transform: rotate(90deg) translateX(-50%)';

const DOWNLOAD = '&::before { transform: scaleY(1.5); }';

const CHEVRON_DOWN = 'transform: rotate(180deg);';

// iconAnimations
export default {
  arrowRight: {
    animateLeft: ARROW_RIGHT.animateLeft,
    animateRight: ARROW_RIGHT.animateRight,
  },
  plus: PLUS,
  download: DOWNLOAD,
  chevronDown: CHEVRON_DOWN,
};
