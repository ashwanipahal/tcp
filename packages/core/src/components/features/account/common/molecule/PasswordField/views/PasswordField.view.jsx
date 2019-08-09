import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import TextBox from '../../../../../../common/atoms/TextBox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import Image from '../../../../../../common/atoms/Image';
import { getIconPath } from '../../../../../../../utils';
import styles from '../styles/PasswordField.style';

export class PasswordField extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    hideText: PropTypes.string,
    showText: PropTypes.string,
    tooltipContent: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    hideText: 'hide',
    showText: 'show',
    tooltipContent: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
    };
  }

  changeType = e => {
    e.preventDefault();
    const { type } = this.state;
    this.setState({
      type: type === 'password' ? 'text' : 'password',
    });
  };

  render() {
    const { className, showText, hideText, tooltipContent, ...otherProps } = this.props;
    const { type } = this.state;
    return (
      <BodyCopy component="div" className={className}>
        <TextBox {...otherProps} type={type} />
        {tooltipContent && (
          <ReactTooltip message={tooltipContent} className="tooltip">
            <Image className="tcp_carousel__play" src={getIconPath('info-icon')} />
          </ReactTooltip>
        )}
        <Anchor
          anchorVariation="primary"
          fontSizeVariation="medium"
          noLink
          handleLinkClick={this.changeType}
          underline
          data-locator={type === 'password' ? 'login-showlnk' : 'login-hidelnk'}
        >
          {type === 'password' ? showText : hideText}
        </Anchor>
      </BodyCopy>
    );
  }
}

export default withStyles(PasswordField, styles);
