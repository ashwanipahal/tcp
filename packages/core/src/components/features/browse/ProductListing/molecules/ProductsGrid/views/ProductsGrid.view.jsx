import React from 'react';
import { PropTypes } from 'prop-types';
import ProductList from '../../ProductList/views';
import { isClient } from '../../../../../../../utils';

// hardcoded value to load products before the end of the products list (400 is about the height of 1 row)
const NEXT_PAGE_LOAD_OFFSET = 400;

function findElementPosition(objArg) {
  let obj = objArg;
  let curleft = 0;
  let curtop = 0;

  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
    obj = obj.offsetParent;
  } while (obj);

  return {
    left: curleft,
    top: curtop,
  };
}

class ProductsGrid extends React.Component {
  static propTypes = {
    isLoadingMore: PropTypes.bool,
    productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
    getMoreProducts: PropTypes.bool,
    onPickUpOpenClick: PropTypes.func,
    onQuickViewOpenClick: PropTypes.func,
    isGridView: PropTypes.bool,
    className: PropTypes.string,
    labels: PropTypes.string,
  };

  static defaultProps = {
    isLoadingMore: false,
    productsBlock: [],
    getMoreProducts: false,
    onPickUpOpenClick: null,
    onQuickViewOpenClick: null,
    isGridView: false,
    className: '',
    labels: '',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      // TODO - fix this - This would be used when integrating BOSS/ BOPIS
      // eslint-disable-next-line
      bopisAutoSkipStep1: true,
    };

    this.captureContainerDivRef = ref => {
      this.containerDivRef = ref;
    };
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
  }

  componentWillMount() {
    if (isClient()) {
      document.addEventListener('scroll', this.handleLoadNextPage, true);
      document.addEventListener('mousewheel', this.handleLoadNextPage, true);
      document.addEventListener('DOMMouseScroll', this.handleLoadNextPage, true);
    }
  }

  componentDidUpdate() {
    // TODO - fix this when user comes back from PDP, to select the same item, this is required
  }

  componentWillUnmount() {
    if (isClient()) {
      document.removeEventListener('scroll', this.handleLoadNextPage, true);
      document.removeEventListener('mousewheel', this.handleLoadNextPage, true);
      document.removeEventListener('DOMMouseScroll', this.handleLoadNextPage, true);
    }
  }

  pickUpIconClick = (...args) => {
    this.setState(
      {
        // TODO - fix this - This would be used when integrating BOSS/ BOPIS
        // eslint-disable-next-line
        bopisAutoSkipStep1: false,
      },
      () => {
        const { onPickUpOpenClick } = this.props;
        if (onPickUpOpenClick) {
          onPickUpOpenClick(...args);
        }
      }
    );
  };

  quickViewOpenClick = (...args) => {
    this.setState(
      {
        // This would be used when integrating BOSS/ BOPIS
        // eslint-disable-next-line
        bopisAutoSkipStep1: true,
      },
      () => {
        const { onQuickViewOpenClick } = this.props;
        if (onQuickViewOpenClick) {
          onQuickViewOpenClick(...args);
        }
      }
    );
  };

  handleLoadNextPage() {
    const { isLoadingMore, productsBlock, getMoreProducts } = this.props;
    if (!isLoadingMore && this.containerDivRef && productsBlock.length) {
      const offsetY =
        findElementPosition(this.containerDivRef).top + this.containerDivRef.offsetHeight;

      if (window.pageYOffset + window.innerHeight + NEXT_PAGE_LOAD_OFFSET > offsetY) {
        console.log('from the scroll function !!!!!!!!!!!!!!');
        getMoreProducts();
      }
    }
  }

  render() {
    const {
      isGridView,
      productsBlock,
      className,
      labels,
      isLoadingMore,
      ...otherProps
    } = this.props;

    const containerClassName = 'main-section-container ';
    return (
      <main className={containerClassName}>
        <section
          ref={this.captureContainerDivRef}
          className={`products-grid-container ${isGridView ? 'product-grid-view-container' : ''}`}
        >
          <div className="product-grid-content">
            <div className="products-listing-grid">
              <div className="product-grid-block-container">
                {!!productsBlock.length &&
                  productsBlock.map((block, index) => {
                    const nextBlock =
                      index < productsBlock.length - 1 ? productsBlock[index + 1] : false;
                    const isPerfectBlock = nextBlock
                      ? block.length === 21 && typeof nextBlock[0] === 'string'
                      : false;
                    return (
                      <ProductList
                        isPerfectBlock={isPerfectBlock}
                        productsBlock={block}
                        className={`${className} product-list`}
                        labels={labels}
                        {...otherProps}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default ProductsGrid;
