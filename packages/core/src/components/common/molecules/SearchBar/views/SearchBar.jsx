import React from 'react';
import proptypes from 'prop-types';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../hoc/withStyles';
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
const SearchBar = props => {
  const {
    className,
    searchRef,
    showProduct,
    changeSearchText,
    openSearchBar,
    closeSearchBar,
    isOpen,
    searchData,
    labels,
  } = props;
  return (
    <React.Fragment>
      <BodyCopy className={className} component="div">
        {isOpen ? (
          <div className="searchWrapper">
            <div className="searchbar">
              <input
                ref={searchRef}
                onChange={changeSearchText}
                className="search-input"
                maxLength="50"
              />
              <Image
                alt="close"
                className="search-image icon-small"
                onClick={closeSearchBar}
                src={getIconPath('search-icon')}
                data-locator="close-icon"
                height="25px"
              />
              <Image
                alt="close"
                className="close-image icon-small"
                onClick={closeSearchBar}
                src={getIconPath('search-close-icon')}
                data-locator="close-icon"
                height="25px"
              />

              {!showProduct ? (
                <div className="suggestionBox">
                  <div className="trendingBox">
                    <BodyCopy className="trendingBoxHead">
                      {getLabelValue(labels, 'lbl_search_whats_trending')}
                    </BodyCopy>
                    <BodyCopy
                      className="trendingBoxBody"
                      fontFamily="Nunito"
                      fontSize="15px"
                      lineHeight="39"
                      component="div"
                    >
                      <ul>
                        {searchData.trending.map(item => {
                          return (
                            <li key={item.id} className="tagName">
                              {item.text}
                            </li>
                          );
                        })}
                      </ul>
                    </BodyCopy>
                  </div>
                  <div className="recentBox">
                    <BodyCopy className="recentBoxHead">
                      {getLabelValue(labels, 'lbl_search_recent_search')}
                    </BodyCopy>
                    <BodyCopy
                      component="div"
                      className="recentBoxBody"
                      fontFamily="Nunito"
                      fontSize="15px"
                      lineHeight="39"
                    >
                      <ul>
                        {searchData.recent.map(item => {
                          return (
                            <li key={item.id} className="recentTag">
                              {item.text}
                            </li>
                          );
                        })}
                      </ul>
                    </BodyCopy>
                  </div>
                </div>
              ) : (
                <div className="matchBox">
                  <div className="matchLinkBox">
                    <BodyCopy className="matchLinkBoxHead">
                      {getLabelValue(labels, 'lbl_search_looking_for')}
                    </BodyCopy>
                    <BodyCopy
                      component="div"
                      className="matchLinkBoxBody"
                      fontFamily="Nunito"
                      fontSize="15px"
                      lineHeight="39"
                    >
                      <ul>
                        {searchData.looking.map(item => {
                          return (
                            <li key={item.id} className="linkName">
                              {item.text}
                            </li>
                          );
                        })}
                      </ul>
                    </BodyCopy>
                  </div>
                  <div className="matchProductBox">
                    <BodyCopy className="matchProductHead">
                      {getLabelValue(labels, 'lbl_search_product_matches')}
                    </BodyCopy>
                    <BodyCopy
                      className="matchProductBody"
                      fontFamily="Nunito"
                      fontSize="15px"
                      lineHeight="39"
                      component="div"
                    >
                      <ul>
                        {searchData.products.map(item => {
                          return <li key={item.id} className="productBox" />;
                        })}
                      </ul>
                    </BodyCopy>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Image
            alt="close"
            className="search-image icon`"
            onClick={openSearchBar}
            src={getIconPath('search-icon')}
            data-locator="close-icon"
            height="25px"
          />
        )}
      </BodyCopy>
    </React.Fragment>
  );
};

SearchBar.propTypes = {
  className: proptypes.string,
  searchRef: proptypes.element,
  showProduct: proptypes.func.isRequired,
  changeSearchText: proptypes.func.isRequired,
  openSearchBar: proptypes.func.isRequired,
  closeSearchBar: proptypes.func.isRequired,
  isOpen: proptypes.bool,
  searchData: proptypes.shape({}).isRequired,
  labels: proptypes.shape({
    lbl_search_whats_trending: proptypes.string,
    lbl_search_recent_search: proptypes.string,
    lbl_search_looking_for: proptypes.string,
    lbl_search_product_matches: proptypes.string,
  }),
};

SearchBar.defaultProps = {
  className: '',
  searchRef: null,
  isOpen: false,
  labels: proptypes.shape({
    lbl_search_whats_trending: '',
    lbl_search_recent_search: '',
    lbl_search_looking_for: '',
    lbl_search_product_matches: '',
  }),
};

export { SearchBar as SearchBarVanilla };
export default withStyles(SearchBar, SearchBarStyle);
