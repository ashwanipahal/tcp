import React from 'react';
import {
    Text,
    FlatList,
} from 'react-native';
import { ProductTile } from "./productTileComponent";

export const ProductList = ({data}) => {
    return(
        <React.Fragment>
            <Text>PLP Page</Text>
            <FlatList className="product-wrapper"
                      data={data}
                      renderItem={ProductTile}>
            </FlatList>
        </React.Fragment>
    )
}