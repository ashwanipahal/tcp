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
    labels: PropTypes.shape([]),
    tooltipAriaLabel: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    hideText: 'Hide',
    showText: 'Show',
    tooltipContent: '',
    labels: {},
    tooltipAriaLabel: ''
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
    const {
      className,
      showText,
      hideText,
      tooltipContent,
      labels,
      tooltipAriaLabel,
      ...otherProps
    } = this.props;
    const { type } = this.state;
    return (
      <BodyCopy component="div" className={className}>
        <TextBox {...otherProps} type={type} />
        <BodyCopy
          component="div"
          className="rightAlignedContent show-hide-password"
          textAlign="center"
        >
          {tooltipContent && (
            <ReactTooltip
              message={tooltipContent}
              className="reset-tooltip"
              aligned="right"
              minWidth="330px"
            >
              <Image className="tooltip" src={getIconPath('info-icon')} alt={tooltipAriaLabel} />
            </ReactTooltip>
          )}
          <Anchor
            anchorVariation="primary"
            fontSizeVariation="medium"
            noLink
            handleLinkClick={this.changeType}
            underline
            dataLocator={type === 'password' ? 'login-showlnk' : 'login-hidelnk'}
          >
            {type === 'password' ? showText : hideText}
          </Anchor>
        </BodyCopy>
      </BodyCopy>
    );
  }
}

export default withStyles(PasswordField, styles);
