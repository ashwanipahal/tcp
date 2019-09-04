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
      categoryList: [item = {}],
    } = this.props;
    const { catId } = item;

    // TODO: Intro animation is being jerky without it and the REST is failing. Need to check why.
    setTimeout(() => {
      this.updateCategoryId(catId);
    }, 4000);
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
  productTabList: PropTypes.shape({}),
  onProductTabChange: PropTypes.func,
};

export default ProductTabList;
