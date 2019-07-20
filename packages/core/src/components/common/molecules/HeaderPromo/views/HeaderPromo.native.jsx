import React from 'react';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { Wrapper, WrapperView, PromoImage, CenterView } from '../HeaderPromo.style.native';

const bannerTextFirst = 'EARN PLACE CASH!';
const bannerTextSecond = 'Buy Online, pickup in store';

const rightIcon = require('../../../../../assets/carrot-large-right.png');
const leftIcon = require('../../../../../assets/carrot-large-left.png');

const bodyCopyStyle = { margin: 5 };

const HeaderPromo = () => (
  <Wrapper>
    <WrapperView>
      <PromoImage source={leftIcon} />
    </WrapperView>
    <CenterView>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs14"
        textAlign="center"
        color="text.primary"
        fontWeight="black"
        text={bannerTextFirst}
        style={bodyCopyStyle}
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
    <WrapperView>
      <PromoImage source={rightIcon} />
    </WrapperView>
  </Wrapper>
);

export default HeaderPromo;
