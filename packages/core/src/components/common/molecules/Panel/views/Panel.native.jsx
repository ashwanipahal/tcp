import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PanelContainer, TitleContainer, TouchableHeader, PanelBody } from '../Panel.style.native';
import ImageComp from '../../../atoms/Image';

const downIcon = require('../../../../../../../mobileapp/src/assets/images/carrot-small-down-gray.png');
const upIcon = require('../../../../../../../mobileapp/src/assets/images/carrot-small-up-gray.png');

class Panel extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      expanded: false,
    };
  }

  toggleView() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  render() {
    const { title, expanded } = this.state;
    const { children } = this.props;
    const imgStyle = { alignSelf: 'center' };
    const carrotIcon = expanded ? upIcon : downIcon;

    return (
      <PanelContainer>
        <TitleContainer>
          <TouchableHeader onPress={() => this.toggleView()}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={title}
              color="gray.900"
            />
          </TouchableHeader>
          <ImageComp customStyle={imgStyle} source={carrotIcon} width={10} height={6} />
        </TitleContainer>
        {expanded && <PanelBody>{children}</PanelBody>}
      </PanelContainer>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Panel;
