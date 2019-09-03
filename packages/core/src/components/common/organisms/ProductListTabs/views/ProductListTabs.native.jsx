import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';

import { Wrapper } from '../ProductListTabs.style.native';

class ProductListTabs extends React.PureComponent {
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
    setTimeout(() => {
      this.updateCategoryId(catId);
    }, 4000);
  }

  onButtonTabChange = catId => {
    this.updateCategoryId(catId);
  };

  updateCategoryId(catId) {
    if (catId) {
      const { getProductListTabsData, onProductTabChange } = this.props;
      this.setState({ selectedCategoryId: catId });
      getProductListTabsData({ categoryId: catId });
      onProductTabChange(catId);
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

ProductListTabs.defaultProps = {
  getProductListTabsData: () => {},
  categoryList: [],
  onProductTabChange: () => {},
};

ProductListTabs.propTypes = {
  getProductListTabsData: PropTypes.func,
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  onProductTabChange: PropTypes.func,
};

export default ProductListTabs;
