import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Image from '../../../atoms/Image';
import {
  StyledTouchableOpacity,
  StyledImageWrapper,
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
    className: PropTypes.string,
    defaultOpen: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    defaultOpen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.defaultOpen || false,
    };
  }

  toggleCollapseState = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  render() {
    const { header, body, className } = this.props;

    const { isExpanded } = this.state;
    return (
      <View className={className}>
        <StyledTouchableOpacity
          aria-expanded={!!isExpanded}
          onPress={this.toggleCollapseState}
          accessibilityRole="button"
        >
          <StyledImageWrapper>
            <Image source={isExpanded ? upIcon : downIcon} height={6} width={10} />
          </StyledImageWrapper>
          <View>{header}</View>
        </StyledTouchableOpacity>
        {isExpanded && <View>{body}</View>}
      </View>
    );
  }
}

export default CollapsibleContainer;
