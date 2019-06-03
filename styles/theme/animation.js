const FADE_IN = `
0% {
  opacity: 0;
}

10% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

const FADE_IN_UP = `
0% {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
}

10% {
  opacity: 0;
  transform: translate3d(0, 20px, 0);
}

100% {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;

const FADE_IN_UP_LONG = `
0% {
  opacity: 0;
  transform: translate3d(0, 80px, 0);
}

10% {
  opacity: 0;
  transform: translate3d(0, 80px, 0);
}

100% {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;

const EXPAND = `
0% {
  opacity: 0;
  letter-spacing: 16px;
}

70% {
  opacity: 1;
}

100% {
  opacity: 1;
  letter-spacing: 18px;
}
`;

const EXPAND_SMALL = `
0% {
  opacity: 0;
  letter-spacing: 4px;
}

70% {
  opacity: 1;
}

100% {
  opacity: 1;
  letter-spacing: 8px;
}
`;

const SCALE_DOWNLOAD = {
  arrow: `
    0%{
      transform-origin: bottom;
      transform: scale(1);
    }

    50% {
      transform-origin: bottom;
      transform: scale(0);
    }

    85% {
      transform-origin: top;
      transform: scale(0);
    }

    100% {
      transform-origin: top;
      transform: scale(1);
    }
  `,
  stroke: `
    0%{
      transform: scaleY(1.5);
      transform-origin: bottom;
    }
    50% {
      transform: scaleY(0);
      top: auto;
      bottom: 0px;
      transform-origin: bottom;
    }
    50.1% {
      transform: scaleY(0);
      top: calc(100% - 24px);
      bottom: auto;
      transform-origin: top;
    }
    100% {
      transform: scaleY(1.5);
      top: calc(100% - 24px);
      transform-origin: top;
    }
  `,
};

const SCALE_DOWN_RIGHT = {
  arrow: `
    0% {
      transform-origin: right;
      transform: scale(1);
    }

    50% {
      transform-origin: right;
      transform: scale(0);
    }

    85% {
      transform-origin: left;
      transform: scale(0);
    }

    100% {
      transform-origin: left;
      transform: scale(1);
    }
  `,
  stroke: {
    small: `
      0% {
        transform: scaleX(1.3);
        transform-origin: right;
      }
      50% {
        transform: scaleX(0);
        right: 0px;
        left: auto;
        transform-origin: right;
      }
      50.1% {
        transform: scaleX(0);
        right: auto;
        left: calc(100% - 28px);
        transform-origin: left;
      }
      100% {
        transform: scaleX(1.3);
        left: calc(100% - 28px);
        transform-origin: left;
      }
    `,
    large: `
      0% {
        transform: scaleX(1.5);
        transform-origin: right;
      }
      50% {
        transform: scaleX(0);
        right: 0px;
        left: auto;
        transform-origin: right;
      }
      50.1% {
        transform: scaleX(0);
        right: auto;
        left: calc(100% - 32px);
        transform-origin: left;
      }
      100% {
        transform: scaleX(1.5);
        left: calc(100% - 32px);
        transform-origin: left;
      }
    `,
  },
};

const CLIP_REVEAL_LTR = `
0% {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
}

100% {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
`;

const CLIP_REVEAL_RTL = `
0% {
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
}

100% {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
`;

const HINT_CLIP_REVEAL = `
0% {
  clip-path: polygon(95% 0, 100% 0, 100% 100%, 95% 100%);
}

100% {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
`;

const HINT_CLIP_HIDE = `
0% {
  clip-path: polygon(95% 0, 100% 0, 100% 100%, 95% 100%);
}

100% {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
`;

const FULL_SWIPE_LTR = `
0% {
  opacity: 1;
  left: -2px;
  transform: translateX(-100%);
}

99.9% {
  left: -2px;
}

100% {
  opacity: 1;
  left: 0;
  transform: translateX(0);
}
`;

const FULL_SWIPE_RTL = `
0% {
  opacity: 1;
  left: 2px;
  transform: translateX(0);
}

99.9% {
  opacity: 1;
  left: 2px;
}

100% {
  opacity: 1;
  left: 0;
  transform: translateX(-100%);
}
`;

const IMG_PARALLAX_LTR = `
0% {
  transform: translate3d(-8%, 0, 0);
}

100% {
  transform: translate3d(-1%, 0, 0);
}
`;

const IMG_PARALLAX_RTL = `
0% {
  transform: translate3d(8%, 0, 0);
}

100% {
  transform: translate3d(-1%, 0, 0);
}
`;

const FILTER_CONTENT = `
0% {
  opacity: 1;
}

100% {
  opacity: 0;
}
`;

const TEXT_HIGHLIGHT = `
0% {
  background-position: 0 0;
}

100% {
  background-position: -100% 0;
}
`;

// Easing
export default {
  fadeIn: FADE_IN,
  fadeInUp: FADE_IN_UP,
  fadeInUpLong: FADE_IN_UP_LONG,
  expand: EXPAND,
  expandSmall: EXPAND_SMALL,
  scaleDownRight: SCALE_DOWN_RIGHT,
  scaleDownload: SCALE_DOWNLOAD,
  clipReveal: {
    ltr: CLIP_REVEAL_LTR,
    rtl: CLIP_REVEAL_RTL,
  },
  hintClip: {
    reveal: HINT_CLIP_REVEAL,
    hide: HINT_CLIP_HIDE,
  },
  fullSwipe: {
    ltr: FULL_SWIPE_LTR,
    rtl: FULL_SWIPE_RTL,
  },
  imgParallax: {
    ltr: IMG_PARALLAX_LTR,
    rtl: IMG_PARALLAX_RTL,
  },
  filterContent: FILTER_CONTENT,
  textHighlight: TEXT_HIGHLIGHT,
};
