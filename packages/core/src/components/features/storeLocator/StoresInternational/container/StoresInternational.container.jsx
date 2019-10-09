import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getViewportInfo } from '@tcp/core/src/utils';
import { getModuleXContent } from './StoresInternational.actions';
import StoresInternational from './views/StoresInternational';
import { getContent, getModuleXContentId } from './StoresInternational.selectors';
import STORE_INTL_CONSTANTS from './StoresInternational.constants';

export class StoresInternationalContainer extends Component {
  componentDidMount() {
    const { getModuleX, contentId } = this.props;
    getModuleX(contentId);
    this.addSelectEventHandler();
  }

  componentDidUpdate(prevProps) {
    const { content } = this.props;
    if (content && content !== prevProps.content) {
      this.addSelectEventHandler();
    }
  }

  componentWillUnmount() {
    /**
     * Remove event listener
     */
    const selector = document.getElementById('country-selector');
    if (selector) {
      selector.removeEventListener('change', this.selectCallback);
    }
  }

  selectCallback = e => {
    const { value } = e.target;
    const selectedCountryTile = document.querySelector(value);
    if (selectedCountryTile) {
      let headerOffset = STORE_INTL_CONSTANTS.STORES_INTERNATIONAL_CONDENSED_HEADER_OFFSET_SM;
      if (getViewportInfo().isDesktop) {
        headerOffset = STORE_INTL_CONSTANTS.STORES_INTERNATIONAL_CONDENSED_HEADER_OFFSET_LG;
      }
      const selectedCountryTilePosition = selectedCountryTile.getBoundingClientRect().top;
      const offsetPosition = selectedCountryTilePosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  addSelectEventHandler() {
    const { content } = this.props;
    /**
     * Store Locator static page event listener
     * Required for onchange handler
     */
    if (content) {
      const selector = document.getElementById('country-selector');
      if (selector) {
        selector.addEventListener('change', this.selectCallback);
      }
    }
  }

  render() {
    return <StoresInternational {...this.props} dataLocator="store_InternationalstoresWrapper" />;
  }
}

StoresInternationalContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  getModuleX: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
};

StoresInternationalContainer.defaultProps = {
  children: null,
};

export const mapStateToProps = state => {
  return {
    content: getContent(state),
    contentId: getModuleXContentId(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  getModuleX: payload => {
    dispatch(getModuleXContent(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoresInternationalContainer);
