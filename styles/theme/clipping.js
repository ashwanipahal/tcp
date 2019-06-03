const UNCLIPPED = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
const CLIPPED = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
const CLIPPED_LEFT = CLIPPED;
const CLIPPED_RIGHT = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
const CLIPPED_10 = 'polygon(0 0, 10% 0, 10% 100%, 0 100%)';
const CLIPPED_70 = 'polygon(0 0, 70% 0, 70% 100%, 0 100%)';
const CLIPPED_95 = 'polygon(95% 0, 100% 0, 100% 100%, 95% 100%)';

// clipping
export default {
  unclipped: UNCLIPPED,
  clipped: CLIPPED,
  clippedLeft: CLIPPED_LEFT,
  clippedRight: CLIPPED_RIGHT,
  clipped10: CLIPPED_10,
  clipped70: CLIPPED_70,
  clipped95: CLIPPED_95,
};
