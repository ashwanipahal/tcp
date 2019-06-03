import { css, keyframes } from 'styled-components';
import easing from './theme/easing';
import duration from './theme/duration';
import animation from './theme/animation';
import mediaQuery from './theme/mediaQuery';

const fadeIn = keyframes` ${animation.fadeIn} `;
const fadeInUp = keyframes` ${animation.fadeInUp} `;
const fadeInUpLong = keyframes` ${animation.fadeInUpLong} `;
const expand = keyframes` ${animation.expand} `;
const expandSmall = keyframes` ${animation.expandSmall} `;

export default css`
  .-fadeIn {
    animation: ${fadeIn} ${duration.xslow} ${easing.easeOutQuart} forwards;
  }

  .-fadeInSlow {
    animation: ${fadeIn} ${duration.xxslow} ease-in-out forwards;
  }

  .-fadeInUp {
    animation: ${fadeInUp} ${duration.xslow} ${easing.easeOutQuart} forwards;
  }

  .-fadeInUpLong {
    animation: ${fadeInUpLong} ${duration.slow} ${easing.easeOutQuart} forwards;
  }

  .-expand {
    animation: ${expandSmall} ${duration.xslow} ${easing.easeOutQuart} forwards;

    @media ${mediaQuery.small} {
      animation: ${expand} ${duration.xslow} ${easing.easeOutQuart} forwards;
    }
  }
`;
