import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import CategoryListingRoot from '../styles/CategoryListing.style.native';

class CategoryListing extends PureComponent {
  componentDidMount() {
    const { getLayout } = this.props;
    getLayout('boy', 'categoryListingPage');
  }

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

CategoryListing.propTypes = {
  getLayout: PropTypes.func.isRequired,
};

export default CategoryListing;
export { CategoryListing as CategoryListingVanilla };
