import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import CategoryListingRoot from '../styles/CategoryListing.style.native';

class CategoryListing extends PureComponent {
  render() {
    return (
      <CategoryListingRoot>
        <View>
          <Text>Heading</Text>
        </View>
        <View>
          <Text>Promo Banner</Text>
        </View>
        <View>
          <Text>Category List Panel</Text>
        </View>
        <View>
          <Text>Recommendations</Text>
        </View>
        <View>
          <Text>Get Candid Section</Text>
        </View>
        <View>
          <Text>SEO Section</Text>
        </View>
        <View>
          <Text>Ratings and Review</Text>
        </View>
      </CategoryListingRoot>
    );
  }
}

export default CategoryListing;
export { CategoryListing as CategoryListingVanilla };
