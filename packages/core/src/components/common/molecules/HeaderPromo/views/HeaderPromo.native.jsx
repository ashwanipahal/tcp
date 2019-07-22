/* eslint-disable no-unused-expressions */
import React from 'react';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { Wrapper, WrapperView, PromoImage, CenterView } from '../HeaderPromo.style.native';
import colors from '../../../../../../styles/themes/TCP/colors';
import { Carousel } from '../..';
import { getScreenWidth } from '../../../../../utils/utils.native';

const bannerTextFirst = 'EARN PLACE CASH!';
const bannerTextSecond = 'Buy Online, pickup in store';

const rightIcon = require('../../../../../assets/carrot-large-right.png');
const leftIcon = require('../../../../../assets/carrot-large-left.png');

/* TODO - Remove the style1, style2, style3 when the styles start coming up from CMS */

// const Style1 = { color: colors.BRAND.BOYS, marginRight: 5 };
// const Style2 = { color: colors.PRIMARY.GREEN, marginRight: 5 };
const Style3 = { color: colors.BRAND.PRIMARY, marginRight: 5 };

/**
 * Module height and width.
 * Height is fixed for mobile
 * Width can vary as per device width.
 */
const MODULE_HEIGHT = 42;
const MODULE_WIDTH = getScreenWidth();

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
        text: 'Buy online, pickup in store',
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
        text: 'NEED IT NOW ?',
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
          style={Style3}
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

const HeaderPromo = () => (
  <Wrapper>
    <WrapperView>
      <PromoImage source={leftIcon} />
    </WrapperView>
    <Carousel
      data={dataObject}
      renderItem={renderView}
      height={MODULE_HEIGHT}
      width={MODULE_WIDTH}
      vertical={false}
      carouselConfig={{
        autoplay: true,
      }}
    />
    <WrapperView>
      <PromoImage source={rightIcon} />
    </WrapperView>
  </Wrapper>
);

export default HeaderPromo;
