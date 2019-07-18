import React from 'react';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  Wrapper,
  HorizontalView,
  VerticalLeftView,
  VerticalRightView,
  Icon,
  RoundView,
} from './Header.style';

// @flow
type Props = {
  labels: object,
};

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const downIcon = require('../../../../assets/images/carrot-small-down.png');
const upIcon = require('../../../../assets/images/carrot-small-up.png');
const cartIcon = require('../../../../assets/images/empty-bag.png');

const textStyle = { position: 'absolute', marginTop: 18, paddingRight: 5 };

class Header extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isIconIn: false,
    };
  }

  validateIcon = () => {
    const { isIconIn } = this.state;
    this.setState({
      isIconIn: !isIconIn,
    });
  };

  render() {
    const { isIconIn } = this.state;
    let headerLabels = {
      storeTitle: 'Find the store',
      headerTitle: 'Welcome',
    };
    const { labels } = this.props;
    if (labels) {
      headerLabels = labels;
    }
    return (
      <Wrapper>
        <VerticalLeftView>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            color="black"
            fontWeight="semibold"
            text={headerLabels.headerTitle}
          />
          <HorizontalView onPress={this.validateIcon}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              textAlign="center"
              color="text.primary"
              fontWeight="regular"
              text={headerLabels.storeTitle}
            />
            {isIconIn ? <Icon source={upIcon} /> : <Icon source={downIcon} />}
          </HorizontalView>
        </VerticalLeftView>

        <VerticalRightView>
          <Icon source={cartIcon} width="32px" height="32px" />
          <RoundView color="white" width="22px" height="22px" borderRadius={11} />
          <RoundView color="TCP" />
          <BodyCopy text="0" color="white" style={textStyle} fontSize="fs10" />
        </VerticalRightView>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.MobileApp && state.Labels.MobileApp.Header,
  };
};

export default connect(mapStateToProps)(Header);
