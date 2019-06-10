import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from './Accordion.style';
import withStyles from '../../hoc/withStyles';
import Anchor from '../../atoms/Anchor';

class Accordion extends Component {
  state = {
    clicked: false,
  };

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

Accordion.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  title: PropTypes.string,
};

Accordion.defaultProps = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  className: 'accordion',
  title: 'accordion',
};

export default withStyles(Accordion, styles);

export { Accordion as AccordionVanilla };
