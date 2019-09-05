import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';

class ProductTabList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: '',
    };
  }

  componentDidMount() {
    const {
      categoryList: [item = {}],
    } = this.props;
    const { catId } = item;
    this.updateCategoryId(catId);
  }

  onButtonTabChange = catId => {
    this.updateCategoryId(catId);
  };

  updateCategoryId(catId) {
    if (catId) {
      const { productTabList, getProductTabListData, onProductTabChange } = this.props;
      this.setState({ selectedCategoryId: catId });
      onProductTabChange(catId);
      if (!productTabList[catId]) {
        getProductTabListData({ categoryId: catId });
      }
    }
  }

  render() {
    const { categoryList } = this.props;
    const { selectedCategoryId } = this.state;
    const buttonTabItems = categoryList.map(item => ({
      id: item.catId,
      label: item.text,
    }));

    return (
      <ButtonTabs
        selectedTabId={selectedCategoryId}
        onTabChange={this.onButtonTabChange}
        tabs={buttonTabItems}
      />
    );
  }
}

ProductTabList.defaultProps = {
  getProductTabListData: () => {},
  categoryList: [],
  productTabList: {},
  onProductTabChange: () => {},
};

ProductTabList.propTypes = {
  getProductTabListData: PropTypes.func,
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  productTabList: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(
      PropTypes.shape({
        uniqueId: PropTypes.string,
        imageUrl: PropTypes.string,
      })
    ),
  }),
  onProductTabChange: PropTypes.func,
};

export default ProductTabList;
