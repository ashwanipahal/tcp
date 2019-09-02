import React from 'react';
import PropTypes from 'prop-types';

class ProductListTabs extends React.Component {
  componentDidMount() {
    const { getProductListTabsData } = this.props;
    getProductListTabsData({ categoryId: '47511>49007' });
  }

  render() {
    // const {} = this.props;

    return null;
  }
}

ProductListTabs.defaultProps = {
  getProductListTabsData: () => {},
};

ProductListTabs.propTypes = {
  getProductListTabsData: PropTypes.func,
};

export default ProductListTabs;
