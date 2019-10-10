import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  routeToStoreDetails,
  scrollToParticularElement,
  isClient,
  getLocator,
  getLabelValue,
} from '../../../../../../utils';
import { Anchor } from '../../../../../common/atoms';
import { StoreSelector, StoresCountryTile } from '../../../../../common/molecules';
import style from '../styles/StoreList.style';
import STORE_LIST_CONSTANTS from '../StoreList.constants';

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      defaultOpenIndex: -1,
      isAccordionClick: false,
    };
    this.scrollTimeout = null;
  }

  componentDidUpdate(_, prevState) {
    const { location, isAccordionClick } = this.state;

    if (!isAccordionClick && prevState.location !== location) {
      this.scrollToLocation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.scrollTimeout);
  }

  scrollToLocation = () => {
    const { location } = this.state;
    this.scrollTimeout = setTimeout(() => {
      clearTimeout(this.scrollTimeout);
      const scrollToElem = document.getElementById(`scroll-${location}`);
      if (scrollToElem) {
        scrollToParticularElement(scrollToElem);
      }
    }, STORE_LIST_CONSTANTS.SCROLL_TIMEOUT);
  };

  render() {
    const { location, defaultOpenIndex } = this.state;
    const { className, labels, storesList } = this.props;
    const { storeListUS, storeListCA } = storesList;
    const finalStores =
      Array.isArray(storeListUS) && Array.isArray(storeListCA)
        ? [...storeListUS, ...storeListCA]
        : [];
    const stores = finalStores.map(store => ({
      title: store.displayName,
      content: store.displayName,
      value: store.displayName,
    }));

    return (
      <div className={className}>
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          handleLinkClick={e => {
            e.preventDefault();
            if (isClient()) window.history.back();
          }}
          noLink
          className={`${className}__backlink`}
          title={getLabelValue(labels, 'lbl_storelist_backLink')}
          dataLocator={getLocator('store_USCanadabacklink')}
        >
          <span className="left-arrow" />
          {getLabelValue(labels, 'lbl_storelist_backLink')}
        </Anchor>
        {finalStores.length > 0 && (
          <StoreSelector
            titleText={labels.lbl_storelist_searchByStates}
            defaultSelectText={labels.lbl_storelist_searchByStates_dropdown}
            options={stores}
            selectedLocation={location}
            selectionCallback={(_, v) => {
              this.setState({
                location: v,
                defaultOpenIndex: -1,
                isAccordionClick: false,
              });
            }}
            dataLocator="store_USCanadasearchlabel"
          />
        )}
        {finalStores.length > 0 &&
          finalStores.map((store, i) => (
            <StoresCountryTile
              title={store.displayName}
              labels={labels}
              stores={store.storesList}
              titleClickCb={item => {
                const { routerHandler } = routeToStoreDetails(item);
                routerHandler();
              }}
              isDefaultOpen={
                defaultOpenIndex === -1 ? location === store.displayName : defaultOpenIndex === i
              }
              dataLocatorKey="USCanada"
              onToggleCallback={({ isExpanded }) => {
                if (isExpanded) {
                  this.setState({
                    defaultOpenIndex: i,
                    location: store.displayName,
                    isAccordionClick: true,
                  });
                } else {
                  this.setState({
                    defaultOpenIndex: -1,
                    location: store.displayName,
                    isAccordionClick: true,
                  });
                }
              }}
            />
          ))}
      </div>
    );
  }
}

StoreList.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  storesList: PropTypes.shape({
    storeListUS: PropTypes.shape([]),
    storeListCA: PropTypes.shape([]),
  }),
};

StoreList.defaultProps = {
  storesList: {
    storeListUS: [],
    storeListCA: [],
  },
  labels: {},
};

export default withStyles(StoreList, style);

export { StoreList as StoreListVanilla };
