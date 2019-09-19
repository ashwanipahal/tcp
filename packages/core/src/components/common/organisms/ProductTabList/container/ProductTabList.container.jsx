import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { productTabListDataReq } from './ProductTabList.actions';
import ProductTabListView from '../views';

class ProductTabListContainer extends React.PureComponent {
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

  onTabChange = catId => {
    this.updateCategoryId(catId);
  };

  /* Create a map of category Ids with the items.  */
  getTabItemsMap = tabItems => {
    return tabItems.reduce((map, item) => {
      const {
        category: { cat_id: catId },
      } = item;
      const tabsMap = map;
      tabsMap[catId] = item;
      return tabsMap;
    }, {});
  };

  /*
    Create a required data object for the ButtonTabs components
    which is being used in the ProductTabList view.
  */
  getButtonTabItems = tabItems => {
    return tabItems.map(item => {
      const {
        category: { cat_id: catId } = {},
        text: { text },
      } = item;
      return { label: text, id: catId };
    });
  };

  updateCategoryId(catId) {
    if (catId) {
      const { productTabList, getProductTabListData, onProductTabChange, tabItems } = this.props;
      const categoryItem = this.getTabItemsMap(tabItems)[catId];
      this.setState({ selectedCategoryId: catId });
      onProductTabChange(catId, categoryItem);
      if (!productTabList[catId]) {
        getProductTabListData({ categoryId: catId });
      }
    }
  }

  render() {
    const { selectedCategoryId } = this.state;
    const { tabItems, dataLocator } = this.props;
    const buttonTabItems = this.getButtonTabItems(tabItems);

    return (
      <ProductTabListView
        selectedTabId={selectedCategoryId}
        onTabChange={this.onTabChange}
        tabs={buttonTabItems}
        dataLocator={dataLocator}
      />
    );
  }
}

ProductTabListContainer.defaultProps = {
  getProductTabListData: () => {},
  tabItems: [],
  productTabList: {},
  onProductTabChange: () => {},
  dataLocator: '',
};

ProductTabListContainer.propTypes = {
  getProductTabListData: PropTypes.func,
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  productTabList: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        uniqueId: PropTypes.string.isRequired,
        imageUrl: PropTypes.array.isRequired,
        seo_token: PropTypes.string,
      })
    )
  ),
  onProductTabChange: PropTypes.func,
  dataLocator: PropTypes.string,
};

export const mapStateToProps = state => {
  const { ProductTabList } = state;

  return {
    productTabList: ProductTabList,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getProductTabListData: payload => {
      dispatch(productTabListDataReq(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTabListContainer);

export { ProductTabListContainer as ProductTabListContainerVanilla };
