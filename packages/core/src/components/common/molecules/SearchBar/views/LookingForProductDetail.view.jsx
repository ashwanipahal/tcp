import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyCopy, Anchor, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchBarStyle from '../SearchBar.style';

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
                      asPath={`${item.productUrl}`}
                      to={`${item.productUrl}`}
                      className="suggestion-label"
                    >
                      <Image
                        alt={`${item.name}`}
                        className="autosuggest-image"
                        src={`${item.imageUrl[0]}`}
                        data-locator={`${item.name}`}
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
