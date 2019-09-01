import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Image from '../../../atoms/Image';
import {
  StyledTouchableOpacity,
  StyledImageWrapper,
  StyledWrapper,
} from '../styles/CollapsibleContainer.style.native';

/**
 *
 * Note: React native imports images using require. so cannot give flexibility to change icons
 */
const upIcon = require('../../../../../assets/carrot-small-up.png');
const downIcon = require('../../../../../assets/carrot-small-down.png');

class CollapsibleContainer extends React.Component {
  static propTypes = {
    header: PropTypes.node.isRequired,
    body: PropTypes.node.isRequired,
    defaultOpen: PropTypes.bool,
    getExpandedState: PropTypes.func,
    index: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    defaultOpen: false,
    getExpandedState: null,
    index: null,
    height: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.defaultOpen || false,
      isBag: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { index: nextIndex, openedTile: nextOpenedTile, getExpandedState } = nextProps;
    const { isBag, isExpanded } = prevState;
    if (isBag) {
      if (getExpandedState && nextIndex === nextOpenedTile && !isExpanded) {
        return { isExpanded: true };
      }
      return { isExpanded: false };
    }
    return null;
  }

  toggleCollapseState = () => {
    const { isExpanded } = this.state;
    const { getExpandedState, index } = this.props;
    if (getExpandedState) {
      getExpandedState({ state: !isExpanded, index });
      this.setState({ isBag: true });
    } else {
      this.setState({ isExpanded: !isExpanded });
    }
  };

  render() {
    const { header, body, height } = this.props;
    const { isExpanded } = this.state;
    return (
      <StyledWrapper>
        <StyledTouchableOpacity
          aria-expanded={!!isExpanded}
          onPress={this.toggleCollapseState}
          accessibilityRole="button"
          height={height}
        >
          <StyledImageWrapper>
            <Image source={isExpanded ? upIcon : downIcon} height={6} width={10} />
          </StyledImageWrapper>
          <View>{header}</View>
        </StyledTouchableOpacity>
        {isExpanded && <View>{body}</View>}
      </StyledWrapper>
    );
  }
}

export default CollapsibleContainer;
