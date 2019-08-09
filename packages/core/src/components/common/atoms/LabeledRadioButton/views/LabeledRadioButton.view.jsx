import React from 'react';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/LabeledRadioButton.style';

// @flow

type Props = {
  children: Node,
  className: string,
  title: string,
  name: string,
  checked: boolean,
  disabled: boolean,
};

class LabeledRadioButton extends React.Component<Props> {
  static labeledRadioButtonCounter = 0;

  constructor(props) {
    super(props);
    LabeledRadioButton.labeledRadioButtonCounter += 1;
    this.labeledRadioButtonCounter = LabeledRadioButton.labeledRadioButtonCounter;
  }

  render() {
    const { title, className, children, name, checked, disabled, ...otherProps } = this.props;
    const id = `${name}_${this.labeledRadioButtonCounter}`;

    return (
      <label htmlFor={id} className={className}>
        <input {...otherProps} id={id} type="radio" checked={checked} disabled={disabled} />
        <span className="checkmark" />
        {children && <div>{children}</div>}
        {title && <span>{title}</span>}
      </label>
    );
  }
}

export default withStyles(LabeledRadioButton, styles);
export { LabeledRadioButton as LabeledRadioButtonVanilla };
