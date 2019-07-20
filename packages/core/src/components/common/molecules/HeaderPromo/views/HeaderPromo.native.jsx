import React from 'react';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { Wrapper, LeftView, PromoImage, CenterView } from '../HeaderPromo.style.native';

const bannerTextFirst = 'EARN PLACE CASH!';
const bannerTextSecond = 'Get $10 for every $20 spent today.';

const clockIcon = require('../../../../../assets/clock.png');

const HeaderPromo = () => (
  <Wrapper>
    <LeftView>
      <PromoImage source={clockIcon} />
    </LeftView>
    <CenterView>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs12"
        textAlign="center"
        color="black"
        fontWeight="black"
        text={bannerTextFirst}
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

export default HeaderPromo;
