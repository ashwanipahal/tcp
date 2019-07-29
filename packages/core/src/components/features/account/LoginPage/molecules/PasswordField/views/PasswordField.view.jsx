import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import TextBox from '../../../../../../common/atoms/TextBox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import styles from '../styles/PasswordField.style';

export class PasswordField extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    hideText: PropTypes.string,
    showText: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    hideText: 'hide',
    showText: 'show'
  }

  constructor(props) {
    super(props);
    this.state = {
      type: 'password'
    };
  }

  changeType = e => {
    e.preventDefault();
    const { type } = this.state;
    this.setState({
      type: type === 'password' ? 'text' : 'password'
    });
  }

  render() {
    const { className, showText, hideText, ...otherProps } = this.props;
    const { type } = this.state;
    return (
      <BodyCopy component="div" className={className}>
        <TextBox {...otherProps} type={type} />
        <Anchor anchorVariation="primary" noLink handleLinkClick={this.changeType}>{type === 'password' ? showText : hideText }</Anchor>
      </BodyCopy>
    )
  }
}

export default withStyles(PasswordField, styles);
