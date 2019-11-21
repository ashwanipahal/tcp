import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSiteId } from '@tcp/core/src/utils/utils';
import { BodyCopy, Anchor, DamImage } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchBarStyle from '../SearchBar.style';
import { routerPush } from '../../../../../utils/index';

/**
 * This component produces a Search Bar component for Header
 * Expects textItems array consisting of objects in below format
 * {
 *    style: "",
 *    text: ""
 * }
 * This component uses BodyCopy atom and accepts all properties of BodyCopy
 * @param {*} props
 */
class LookingForProductDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.generateDamUrl = this.generateDamUrl.bind(this);
  }

  redirectToProductUrl = productUrl => {
    const { closeSearchLayover } = this.props;
    closeSearchLayover();
    routerPush(`/p?pid=${productUrl.split('/p/')[1]}`, `${productUrl}`, {
      shallow: false,
    });
  };

  generateDamUrl = itemUrl => {
    const fileNameFull =
      itemUrl && itemUrl[0] ? itemUrl[0].substring(itemUrl[0].lastIndexOf('/') + 1) : '';
    const fileNameNoExt =
      fileNameFull.lastIndexOf('.') > 0
        ? fileNameFull.substring(0, fileNameFull.lastIndexOf('.'))
        : fileNameFull;
    const prodNum = fileNameNoExt.split('_')[0];
    return `${prodNum}/${fileNameFull}`;
  };

  render() {
    const { searchResults } = this.props;

    return (
      <React.Fragment>
        <BodyCopy className="matchProductBody" lineHeight="39" component="div">
          <ul>
            {searchResults &&
              searchResults.autosuggestProducts &&
              searchResults.autosuggestProducts.map(item => {
                return (
                  <BodyCopy component="li" key={item.id} className="productBox">
                    <Anchor
                      className="suggestion-label"
                      noLink
                      to={`/${getSiteId()}${item.productUrl}`}
                      onClick={e => {
                        e.preventDefault();
                        this.redirectToProductUrl(`${item.productUrl}`);
                      }}
                    >
                      <DamImage
                        className="autosuggest-image"
                        imgData={{
                          alt: `${item.name}`,
                          url: `${this.generateDamUrl(item.imageUrl)}`,
                        }}
                        isProductImage
                        height="25px"
                      />
                    </Anchor>
                  </BodyCopy>
                );
              })}
          </ul>
        </BodyCopy>
      </React.Fragment>
    );
  }
}

LookingForProductDetail.propTypes = {
  closeSearchLayover: PropTypes.func.isRequired,
  searchResults: PropTypes.shape({
    trends: PropTypes.shape({}),
    categories: PropTypes.shape({}),
    products: PropTypes.shape({}),
  }),
};

LookingForProductDetail.defaultProps = {
  searchResults: {
    trends: {},
    categories: {},
    products: {},
  },
};

export default connect()(withStyles(LookingForProductDetail, SearchBarStyle));
