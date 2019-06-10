// @flow
import React, { Component, Fragment } from 'react';
import type { Node } from 'react';
import withStyles from '../../hoc/withStyles';
import styles from './Accordion.style';

type Props = {
  children: Node,
  className: string,
  title: string,
};

type State = {
  clicked: boolean,
};

class Accordion extends Component<Props, State> {
  state = {
    clicked: false,
  };

  

  render = () => {
    const { className = '', children, title } = this.props;
    const itemDetailClick = ():void => {
      console.log('aaaaaa');
      this.setState(prevstate => ({
        clicked: !prevstate.clicked,
      }));
    }
    
    return (
      <Fragment>
        <div className={`${className} accordion`} aria-label="accordion">
          <a onClick={this.itemDetailClick} nolink href="#">
            <p className={this.state.clicked ? 'inactive head' : 'active head'}>{title}</p>
          </a>
          {this.state.clicked ? <div className={'accordionContents'}>{children}</div> : ''}
        </div>
      </Fragment>
    );
  }
}

Accordion.displayName = 'Accordion';

export default withStyles(Accordion, styles);

export { Accordion as AccordionVanilla };
