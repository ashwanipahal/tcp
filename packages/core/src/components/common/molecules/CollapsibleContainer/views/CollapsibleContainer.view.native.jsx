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
    arrowPos: PropTypes.string,
  };

  static defaultProps = {
    defaultOpen: false,
    getExpandedState: null,
    index: null,
    height: null,
    arrowPos: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.defaultOpen || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { defaultOpen } = this.props;
    if (defaultOpen !== nextProps.defaultOpen) {
      this.setState({
        isExpanded: nextProps.defaultOpen,
      });
    }
  }

  toggleCollapseState = () => {
    const { isExpanded } = this.state;
    const { getExpandedState, index } = this.props;
    this.setState({ isExpanded: !isExpanded });
    if (getExpandedState) {
      getExpandedState({ state: !isExpanded, index });
    }
  };

  render() {
    const { header, body, height, arrowPos } = this.props;
    const { isExpanded } = this.state;
    return (
      <StyledWrapper>
        <StyledTouchableOpacity
          aria-expanded={!!isExpanded}
          onPress={this.toggleCollapseState}
          accessibilityRole="button"
          height={height}
        >
          <StyledImageWrapper arrowPos={arrowPos}>
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
