import React from 'react';
import PropTypes from 'prop-types';
import { requireUrlScript } from '../../../../../../../utils/resourceLoader';

export default class Spotlights extends React.PureComponent {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    const { spotlightUrl, categoryId } = this.props;
    return requireUrlScript(spotlightUrl).then(() => {
      document
        .querySelector('[data-bv-show="spotlights"]')
        .setAttribute('data-bv-subject-id', `SL-${categoryId}`);
    });
  };

  componentWillReceiveProps = nexProps => {
    const { categoryId } = nexProps;
    const { categoryId: prevCategoryId } = this.props;
    if (prevCategoryId !== categoryId) {
      document
        .querySelector('[data-bv-show="spotlights"]')
        .setAttribute('data-bv-subject-id', `SL-${categoryId}`);
    }
  };

  render() {
    return <div data-bv-show="spotlights" data-bv-site-id="Spotlights" />;
  }
}

Spotlights.propTypes = {
  spotlightUrl: PropTypes.string.isRequired,
};
