import React from 'react';
import PropTypes from 'prop-types';
import { requireUrlScript } from '../../../../../../../utils/resourceLoader';

export default class Spotlights extends React.PureComponent {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.captureContainerRef = this.captureContainerRef.bind(this);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const { spotlightUrl } = this.props;
    return requireUrlScript(spotlightUrl).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  captureContainerRef = ref => {
    const { categoryId } = this.props;
    this.containerRef = ref;
    if (
      window.BV &&
      // eslint-disable-next-line no-underscore-dangle
      !(window.BV.Spotlights._renderQueue && window.BV.Spotlights._renderQueue.length > 0)
    ) {
      window.BV.Spotlights.render({
        contentType: 'spotlights',
        subjectId: `SL-${categoryId}`,
      });
    }
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return null;
    return <div id="BVSpotlightsContainer" ref={this.captureContainerRef} />;
  }
}

Spotlights.propTypes = {
  spotlightUrl: PropTypes.string.isRequired,
};
