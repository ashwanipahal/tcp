import React from 'react';
import {
    Image,
    View,
    Text,
} from 'react-native';

export const ProductTile = ({item}) => {
    const url = "https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/"+item.imagename+"-6.jpg";
    const pic = {
        uri: url
    };
    return(
        <View key={item.product_name} className="product-item">
                <View className="product-image">
                    <Image source={pic} style={{width: 100, height: 100}} alt="product" title="Product Image"/>
                </View>
                <Text className="product-name">
                    {item.product_name}
                </Text>
                <Text className="product-disc-price">
                    {item.min_offer_price}
                </Text>
                <Text className="product-original-price">
                    {`Was ${item.min_list_price}`}
                </Text>
        </View>
    )
}