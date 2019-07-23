import React from 'react';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import Carousel from 'react-native-snap-carousel';
import { Wrapper, WrapperView, PromoImage, CenterView } from '../HeaderPromo.style.native';
import colors from '../../../../../../styles/themes/TCP/colors';
import { getScreenWidth } from '../../../../../utils/utils.native';

const bannerTextFirst = 'EARN PLACE CASH!';
const bannerTextSecond = 'Buy Online, pickup in store';

const rightIcon = require('../../../../../assets/carrot-large-right.png');
const leftIcon = require('../../../../../assets/carrot-large-left.png');

/**
 * Module height and width.
 * Height is fixed for mobile
 * Width can vary as per device width.
 */
const MODULE_HEIGHT = 42;
const MODULE_WIDTH = getScreenWidth();
const autoplay = true;

/* TODO - Remove the style1, style2, style3 when the styles start coming up from CMS */

const manageTextStyles = style => {
  if (style === 'style1') {
    return { color: colors.BRAND.BOYS, marginRight: 5 };
  }
  if (style === 'style2') {
    return { color: colors.PRIMARY.GREEN, marginRight: 5 };
  }
  return { color: colors.BRAND.PRIMARY, marginRight: 5 };
};

const dataObject = [
  {
    linkClass: {
      url: 'https://www.childrensplace.com/us/home',
      title: 'Promo text banner 1',
      text: 'Promo text banner 1',
      target: '',
      external: 0,
      class: 'green-dollar',
      __typename: 'LinkClass',
    },
    textItems: [
      {
        text: 'EARN PLACE CASH! ',
        style: 'style2',
        __typename: 'StyledText',
      },
      {
        text: 'Buy online,',
        style: null,
        __typename: 'StyledText',
      },
    ],
  },

  {
    linkClass: {
      url: 'https://www.childrensplace.com/us/home',
      title: 'Promo text banner 2',
      text: 'Promo text banner 2',
      target: '',
      external: 0,
      class: 'orange-schedule',
      __typename: 'LinkClass',
    },

    textItems: [
      {
        text: 'NEED IT hjhjjh ?',
        style: 'style1',
        __typename: 'StyledText',
      },

      {
        text: 'Buy online, pickup in store.',
        style: null,
        __typename: 'StyledText',
      },
    ],
    __typename: 'PromoTextBanner',
  },
];

/**
 * @desc Returns updated Banner text details with styles.
 */
const renderView = () => {
  return (
    <Wrapper>
      <CenterView>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs14"
          textAlign="center"
          fontWeight="black"
          text={bannerTextFirst}
          style={manageTextStyles('style1')}
        />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs14"
          textAlign="center"
          color="black"
          fontWeight="regular"
          text={bannerTextSecond}
        />
      </CenterView>
    </Wrapper>
  );
};

class HeaderPromo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.carousel = null;
  }

  /**
   * To manage the direction of the carousel
   */
  manageSlide = direction => {
    if (direction === 'next') {
      return this.carousel.snapToPrev();
    }
    return this.carousel.snapToNext();
  };

  render() {
    return (
      <Wrapper>
        <WrapperView onPress={() => this.manageSlide('next')}>
          <PromoImage source={leftIcon} />
        </WrapperView>
        <Carousel
          data={dataObject}
          renderItem={renderView}
          sliderWidth={MODULE_WIDTH}
          itemWidth={MODULE_WIDTH}
          sliderHeight={MODULE_HEIGHT}
          itemHeight={MODULE_HEIGHT}
          autoplay={autoplay}
          ref={c => {
            this.carousel = c;
          }}
        />
        <WrapperView onPress={() => this.manageSlide('prev')}>
          <PromoImage source={rightIcon} />
        </WrapperView>
      </Wrapper>
    );
  }
}

export default HeaderPromo;
