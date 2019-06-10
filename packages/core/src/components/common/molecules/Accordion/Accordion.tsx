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

class Accordion extends Component<Props> {
  state = {
    clicked: false,
  };
  componentWillMount() {}

  itemDetailClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    const { className = '', children, title } = this.props;
    return (
      <div className={`${className} accordion`} aria-label="accordion">
        <Anchor onClick={this.itemDetailClick} noLink>
          <p className={this.state.clicked ? 'inactive head' : 'active head'}>{title}</p>
        </Anchor>
        <div className="accordionContents">{this.state.clicked ? children : ''}</div>
      </div>
    );
  }
}
Accordion.displayName = 'Accordion';

export default withStyles(Accordion, styles);

export { Accordion as AccordionVanilla };
