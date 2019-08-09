import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../../atoms/Image';
import { getIconPath } from '../../../../../utils';
import styles from '../styles/CollapsibleContainer.style';
import withStyles from '../../../hoc/withStyles';

class CollapsibleContainer extends React.Component {
  static propTypes = {
    header: PropTypes.node.isRequired,
    body: PropTypes.node.isRequired,
    iconOpen: PropTypes.string,
    iconClose: PropTypes.string,
    className: PropTypes.string,
    defaultOpen: PropTypes.bool,
  };

  static defaultProps = {
    iconOpen: 'up_arrow_icon',
    iconClose: 'down_arrow_icon',
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
    const { header, body, iconOpen, iconClose, className } = this.props;
    const IconOpen = (iconOpen && getIconPath(iconOpen)) || getIconPath('up_arrow_icon');
    const IconClose = (iconClose && getIconPath(iconClose)) || getIconPath('down_arrow_icon');
    const { isExpanded } = this.state;
    return (
      <div className={className}>
        <button
          aria-expanded={!!isExpanded}
          onClick={this.toggleCollapseState}
          onKeyPress={this.toggleCollapseState}
          className="collapsible-header"
        >
          <Image src={isExpanded ? IconOpen : IconClose} className="collapsible-icon" />
          <div>{header}</div>
        </button>
        <div className={isExpanded ? 'item-opened' : 'item-closed'}>{body}</div>
      </div>
    );
  }
}

export default withStyles(CollapsibleContainer, styles);
export { CollapsibleContainer as CollapsibleContainerVanilla };
