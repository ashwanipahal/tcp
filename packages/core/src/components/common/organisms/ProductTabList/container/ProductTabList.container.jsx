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
      if (Array.isArray(catId)) {
        catId.forEach(id => {
          tabsMap[id] = item;
          return tabsMap;
        });
      } else {
        tabsMap[catId] = item;
      }
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

  updateCategoryId(categoryId) {
    let catId = categoryId;
    if (catId) {
      if (!Array.isArray(catId)) {
        catId = [catId];
      }
      const { productTabList, getProductTabListData, onProductTabChange, tabItems } = this.props;
      const categoryItem = [];
      catId.map(id => categoryItem.push(this.getTabItemsMap(tabItems)[id]));
      this.setState({ selectedCategoryId: catId });
      onProductTabChange(catId, categoryItem);
      catId.forEach(id => {
        if (!productTabList[id]) {
          getProductTabListData({ categoryId: id });
        }
      });
    }
  }

  render() {
    const { selectedCategoryId } = this.state;
    const { tabItems, dataLocator, style } = this.props;
    const buttonTabItems = this.getButtonTabItems(tabItems);

    return buttonTabItems.length > 1 ? (
      <ProductTabListView
        selectedTabId={selectedCategoryId}
        onTabChange={this.onTabChange}
        tabs={buttonTabItems}
        dataLocator={dataLocator}
        style={style}
      />
    ) : null;
  }
}

ProductTabListContainer.defaultProps = {
  getProductTabListData: () => {},
  tabItems: [],
  productTabList: {},
  onProductTabChange: () => {},
  dataLocator: '',
  style: [],
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
  style: PropTypes.arrayOf(PropTypes.object),
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
