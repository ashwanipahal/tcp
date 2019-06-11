// @flow
import type { Node } from 'react';
import React, { Component } from 'react';
import styles from './Accordion.style';
import withStyles from '../../hoc/withStyles';
import Anchor from '../../atoms/Anchor';

type Props = {
  className: string,
  children: Node,
  title: string,
};

type State = {
  clicked: boolean,
};

class Accordion extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  componentWillMount() {}

  itemDetailClick = () => {
    this.setState(prevstate => ({
      clicked: !prevstate.clicked,
    }));
  };

  render() {
    const { className = '', children, title } = this.props;
    const { clicked } = this.state;
    return (
      <div className={`${className} accordion`} aria-label="accordion">
        <Anchor onClick={this.itemDetailClick} noLink>
          <p className={clicked ? 'inactive head' : 'active head'}>{title}</p>
        </Anchor>
        <div className="accordionContents">{clicked ? children : ''}</div>
      </div>
    );
  }
}

Accordion.displayName = 'Accordion';

export default withStyles(Accordion, styles);

export { Accordion as AccordionVanilla };
