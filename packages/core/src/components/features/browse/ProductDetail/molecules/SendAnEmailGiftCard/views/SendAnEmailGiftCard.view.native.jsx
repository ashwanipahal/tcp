import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import { UrlHandler } from '../../../../../../../utils/index.native';
import {
  Wrapper,
  SendAnEmailGiftCardWrapper,
  PromoLabel,
} from '../styles/SendAnEmailGiftCard.style.native';

const SendAnEmailGiftCard = props => {
  const { pdpLabels } = props;
  return (
    <Wrapper>
      <SendAnEmailGiftCardWrapper>
        <BodyCopy fontSize="fs15" fontFamily="secondary" text={pdpLabels.preferSendingViaEmail} />

        <Anchor
          onPress={() => {
            UrlHandler(pdpLabels.eGiftCardLink);
          }}
        >
          <BodyCopy
            textDecoration="underline"
            fontSize="fs15"
            fontFamily="secondary"
            text={pdpLabels.sendAnEmailCard}
          />
        </Anchor>
      </SendAnEmailGiftCardWrapper>
      <PromoLabel>
        <BodyCopy fontSize="fs15" fontFamily="secondary" text={pdpLabels.freeShippingEveryDay} />
      </PromoLabel>
    </Wrapper>
  );
};

SendAnEmailGiftCard.defaultProps = {
  pdpLabels: {},
};

SendAnEmailGiftCard.propTypes = {
  pdpLabels: PropTypes.shape({}),
};

export default SendAnEmailGiftCard;
