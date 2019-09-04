import React from 'react';
import proptypes from 'prop-types';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';
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
  } = props;
  return (
    <React.Fragment>
      <BodyCopy className={className}>
        {isOpen ? (
          <BodyCopy class="searchWrapper">
            <BodyCopy className="searchbar">
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
                <BodyCopy className="suggestionBox">
                  <BodyCopy className="trendingBox">
                    <BodyCopy className="trendingBoxHead">WHAT&apos;S TRENDING</BodyCopy>
                    <BodyCopy className="trendingBoxBody">
                      <ul>
                        <li className="tagName">EASTER</li>
                        <li className="tagName">EASTER</li>
                        <li className="tagName">EASTER</li>
                        <li className="tagName">EASTER</li>
                      </ul>
                    </BodyCopy>
                  </BodyCopy>
                  <BodyCopy className="recentBox">
                    <BodyCopy className="recentBoxHead">YOUR RECENT SEARCH</BodyCopy>
                    <BodyCopy className="recentBoxBody">
                      <ul>
                        <li className="recentTag">DRESS</li>
                        <li className="recentTag">GIRL</li>
                        <li className="recentTag">DRESS</li>
                        <li className="recentTag">GIRL</li>
                      </ul>
                    </BodyCopy>
                  </BodyCopy>
                </BodyCopy>
              ) : (
                <BodyCopy className="matchBox">
                  <BodyCopy className="matchLinkBox">
                    <BodyCopy className="matchLinkBoxHead">I&apos;M Looking For</BodyCopy>
                    <BodyCopy className="matchLinkBoxBody">
                      <ul>
                        <li className="linkName">Pants</li>
                        <li className="linkName">Jeans</li>
                        <li className="linkName">Pants Pj</li>
                        <li className="linkName">Jeans set</li>
                      </ul>
                    </BodyCopy>
                  </BodyCopy>
                  <BodyCopy className="matchProductBox">
                    <BodyCopy className="matchProductHead">YOUR RECENT SEARCH</BodyCopy>
                    <BodyCopy className="matchProductBody">
                      <ul>
                        <li className="productBox" />
                        <li className="productBox" />
                        <li className="productBox" />
                        <li className="productBox" />
                      </ul>
                    </BodyCopy>
                  </BodyCopy>
                </BodyCopy>
              )}
            </BodyCopy>
          </BodyCopy>
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
};

SearchBar.defaultProps = {
  className: '',
  searchRef: null,
  isOpen: false,
};

export { SearchBar as SearchBarVanilla };
export default withStyles(SearchBar, SearchBarStyle);
