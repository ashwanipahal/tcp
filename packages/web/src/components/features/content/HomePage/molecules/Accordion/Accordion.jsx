// any molecule will come here
import React, { Fragment } from 'react';
// import {Link, Image, Text} from '../atoms/index';
import AccordionStyle from './Accordion.style';
import DataFooterMiddle from './Accordion.fixture';
import AccordionSectionA from './AccordionSectionA';
import AccordionSectionB from './AccordionSectionB';

class Accordion extends React.Component {
  state = {
    footer: {},
  };

  componentDidMount() {
    const footerMiddle = DataFooterMiddle.data.val.filter(item => item.sub === 'footerMiddle');
    this.setState({
      footer: footerMiddle,
    });
  }

  render() {
    const {footer} = this.state;
    return (
      <Fragment>
        <AccordionStyle />
        {footer &&
          footer[0] &&
          footer[0].val &&
          footer[0].val.map((item) =>
            item.sub === 'mprWrapper' ? (
              <AccordionSectionA item={item} />
            ) : (
              <AccordionSectionB item={item} />
            )
          )}
      </Fragment>
    );
  }
}

export default Accordion;
