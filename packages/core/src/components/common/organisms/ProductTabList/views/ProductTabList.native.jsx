import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';

import { Wrapper } from '../ProductTabList.style.native';

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

    // TODO: Intro animation is being jerky without it and the REST is failing. Need to check why.
    setTimeout(() => {
      this.updateCategoryId(catId);
    }, 4000);
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
    const { selectedCategoryId } = this.state;
    const buttonTabItems = this.getButtonTabItems();

    return (
      <Wrapper>
        <ButtonTabs
          selectedTabId={selectedCategoryId}
          onTabChange={this.onButtonTabChange}
          tabs={buttonTabItems}
        />
      </Wrapper>
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
  productTabList: PropTypes.shape({}),
  onProductTabChange: PropTypes.func,
};

export default ProductTabList;
