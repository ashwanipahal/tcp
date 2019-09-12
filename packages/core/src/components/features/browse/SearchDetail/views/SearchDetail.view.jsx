import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import { Row, Col } from '../../../../common/atoms';

class SearchListingView extends React.PureComponent {
  render() {
    const searchProductsList = searchedResult => {
      return (
        searchedResult &&
        searchedResult.map(item => {
          return (
            <div className="product-tile">
              <div>
                <img src={item.imageUrl} alt={item.product_name} />
                {item.min_list_price && <p>{`$ ${item.min_list_price}`}</p>}
                <p>{item.id}</p>
                <p>{item.color}</p>
                <p>{item.product_name}</p>
              </div>
            </div>
          );
        })
      );
    };
    const { className, searchedResult } = this.props;
    return (
      <div className={className}>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="promo-area-1">You Searched For</div>
            {/* {breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />} */}
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 3, medium: 4, large: 6 }}>
            <div className="filter">FILTERS</div>
          </Col>
          <Col colSize={{ small: 3, medium: 4, large: 6 }}>
            <div className="sort-by">SORT BY</div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="showing-results">Showing X Results</div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="search-list-page">Search Listing Page</div>
          </Col>
        </Row>
        <div className="product-tile-wrapper">{searchProductsList(searchedResult)}</div>
      </div>
    );
  }
}

SearchListingView.propTypes = {
  className: PropTypes.string,
  searchedResult: PropTypes.arrayOf(PropTypes.shape({})),
};

SearchListingView.defaultProps = {
  className: '',
  searchedResult: {},
};

export default withStyles(SearchListingView, SearchListingStyle);
