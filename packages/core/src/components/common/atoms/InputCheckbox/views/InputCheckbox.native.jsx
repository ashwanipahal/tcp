import React from 'React';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';
import { StyledCheckBox, StyledImage } from '../InputCheckbox.style.native';

const uncheckedIcon = require('../../../../../assets/store-locator-check.png');
const checkedIcon = require('../../../../../assets/store-locator-checked.png');

class InputCheckBox extends React.Component {
  static propTypes = {
    rightText: PropTypes.string,
    isChecked: PropTypes.bool,
    onClick: PropTypes.func,
    id: PropTypes.string,
    input: PropTypes.shape({}),
  };

  static defaultProps = {
    rightText: 'checkbox',
    isChecked: false,
    onClick: null,
    id: 'checkbox',
    input: { val: '' },
  };

  constructor(props) {
    super(props);
    const { isChecked } = props;
    this.state = {
      isChecked,
    };
  }

  onClick = () => {
    const { isChecked } = this.state;
    const { onClick, id } = this.props;
    const checkboxState = !isChecked;
    this.setState({
      isChecked: checkboxState,
    });
    onClick(checkboxState, id);
  };

  genCheckedIcon() {
    const { isChecked } = this.state;
    const source = isChecked ? checkedIcon : uncheckedIcon;
    return <StyledImage source={source} />;
  }

  renderRight() {
    const { rightText } = this.props;
    return <BodyCopy mobileFontFamily="secondary" fontSize="fs12" text={rightText} />;
  }

  render() {
    const { input, ...otherProps } = this.props;
    return (
      <StyledCheckBox onStartShouldSetResponder={this.onClick} {...input} {...otherProps}>
        {this.genCheckedIcon()}
        {this.renderRight()}
      </StyledCheckBox>
    );
  }
}

export default InputCheckBox;
