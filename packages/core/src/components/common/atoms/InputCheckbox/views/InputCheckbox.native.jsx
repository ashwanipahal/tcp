import React from 'React';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';
import { StyledCheckBox, StyledImage } from '../InputCheckbox.style.native';
import Image from '../../Image';

const uncheckedIcon = require('../../../../../assets/store-locator-check.png');
const checkedIcon = require('../../../../../assets/store-locator-checked.png');

class InputCheckBox extends React.Component {
  static propTypes = {
    rightText: PropTypes.string,
    isChecked: PropTypes.bool,
    onClick: PropTypes.func,
    id: PropTypes.string,
    input: PropTypes.shape({}),
    hideCheckboxIcon: PropTypes.bool,
    meta: PropTypes.func,
  };

  static defaultProps = {
    rightText: 'checkbox',
    isChecked: false,
    onClick: () => {},
    id: 'checkbox',
    input: { val: '' },
    hideCheckboxIcon: false,
    meta: {},
  };

  constructor(props) {
    super(props);
    const { isChecked, input } = props;
    input.onChange(isChecked);
    this.state = {
      isChecked,
    };
  }

  onClick = () => {
    const { isChecked } = this.state;
    const { onClick, id, input } = this.props;
    const checkboxState = !isChecked;
    input.onChange(checkboxState);
    this.setState({
      isChecked: checkboxState,
    });
    onClick(checkboxState, id);
  };

  genCheckedIcon() {
    const { isChecked } = this.state;
    const source = isChecked ? checkedIcon : uncheckedIcon;
    return (
      <StyledImage>
        <Image source={source} height="25px" width="25px" />
      </StyledImage>
    );
  }

  renderRight() {
    const { rightText } = this.props;
    return <BodyCopy mobileFontFamily="secondary" fontSize="fs12" text={rightText} />;
  }

  render() {
    const { input, hideCheckboxIcon, meta, ...otherProps } = this.props;
    const { value } = input;
    const { touched, error } = meta;
    const isError = touched && error;
    return (
      <StyledCheckBox
        onStartShouldSetResponder={this.onClick}
        {...input}
        {...otherProps}
        value={value}
      >
        {!hideCheckboxIcon && this.genCheckedIcon()}
        {this.renderRight()}
        <BodyCopy
          className="Checkbox__error"
          color="error"
          component="div"
          fontSize="fs12"
          fontFamily="secondary"
          role="alert"
          aria-live="assertive"
          data-locator="errorDataLocator"
          text={isError ? error : ''}
        />
      </StyledCheckBox>
    );
  }
}

export default InputCheckBox;
