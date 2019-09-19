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
      tabItems: [item = {}],
    } = this.props;
    const { category: { cat_id: catId } = {} } = item;
    this.updateCategoryId(catId);
  }

  onButtonTabChange = catId => {
    this.updateCategoryId(catId);
  };

  getTabItemsMap() {
    const { tabItems } = this.props;
    return tabItems.reduce((map, item) => {
      const {
        category: { cat_id: catId },
      } = item;
      const tabsMap = map;
      tabsMap[catId] = item;
      return tabsMap;
    }, {});
  }

  getButtonTabItems() {
    const { tabItems } = this.props;

    return tabItems.map(item => {
      const {
        category: { cat_id: catId } = {},
        text: { text },
      } = item;
      return { label: text, id: catId };
    });
  }

  updateCategoryId(catId) {
    if (catId) {
      const { productTabList, getProductTabListData, onProductTabChange } = this.props;
      const categoryItem = this.getTabItemsMap()[catId];
      this.setState({ selectedCategoryId: catId });
      onProductTabChange(catId, categoryItem);
      if (!productTabList[catId]) {
        getProductTabListData({ categoryId: catId });
      }
    }
  }

  render() {
    const { selectedCategoryId, dataLocator } = this.state;
    const buttonTabItems = this.getButtonTabItems();

    return (
      <ButtonTabs
        selectedTabId={selectedCategoryId}
        onTabChange={this.onButtonTabChange}
        tabs={buttonTabItems}
        dataLocator={dataLocator}
      />
    );
  }
}

ProductTabList.defaultProps = {
  getProductTabListData: () => {},
  tabItems: [],
  productTabList: {},
  onProductTabChange: () => {},
};

ProductTabList.propTypes = {
  getProductTabListData: PropTypes.func,
  tabItems: PropTypes.arrayOf(
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
