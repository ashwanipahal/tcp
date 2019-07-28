/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import endpoints from '../../../../../../../service/endpoint';
import { ProductName, ProductDesc } from '../styles/ProductInformation.style.native';

// @flow
type Props = {
  labels: any,
  data: Object,
};
const ProductInformation = ({ data, labels }: Props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ width: 120 }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: endpoints.global.baseURI + data.skuInfo.imageUrl }}
        />
        {!data.isGiftCard && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: `${endpoints.global.baseURI}/static/images/${data.brand}` }}
          />
        )}
      </View>
      <View style={{ width: 203 }}>
        <ProductName>
          <BodyCopy fontSize="fs12" fontWeight={['semibold']} text={data.productName} />
        </ProductName>
        <ProductDesc>
          <BodyCopy
            fontSize="fs12"
            fontWeight={['semibold']}
            textAlign="center"
            text={data.isGiftCard === true ? `Design: ` : `${labels.colorLabel}: `}
          />
          <BodyCopy fontSize="fs12" text={data.skuInfo.color.name} />
        </ProductDesc>
        <ProductDesc>
          <BodyCopy
            fontSize="fs12"
            fontWeight={['semibold']}
            textAlign="center"
            text={data.isGiftCard === true ? `Value: ` : `${labels.sizeLabel}: `}
          />
          <BodyCopy fontSize="fs12" text={`${data.skuInfo.size} `} />
          <BodyCopy
            fontSize="fs12"
            text={!data.skuInfo.fit || data.skuInfo.fit === 'Regular' ? ' ' : data.skuInfo.fit}
          />
        </ProductDesc>
        <ProductDesc>
          <BodyCopy
            fontSize="fs12"
            fontWeight={['semibold']}
            textAlign="center"
            text={`${labels.qtyLabel}: `}
          />
          <BodyCopy fontSize="fs12" text={data.quantity} />
        </ProductDesc>
      </View>
    </View>
  );
};

export default withStyles(ProductInformation);
export { ProductInformation as ProductInformationVanilla };
