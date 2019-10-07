import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getModuleXContent } from './StoresInternational.actions';
import StoresInternational from './views/StoresInternational';
import { getContent, getModuleXContentId } from './StoresInternational.selectors';

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
      selectedCountryTile.scrollIntoView({
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