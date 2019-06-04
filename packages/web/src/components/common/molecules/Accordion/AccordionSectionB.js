import Link from 'next/link';
import Collapsible from 'react-collapsible';
import React from 'react';

class AccordionSectionB extends React.Component {
  state = {
    item: null,
  };
  componentDidMount() {
    this.setState({
      item: this.props.item,
    });
  }
  render() {
    let item = this.state.item;

    return (
      item &&
      item.val &&
      item.val.map((column, i) => (
        <Collapsible key={i} trigger={column.val[0].val.text}>
          <p>
            {column.val[1].val.map((link, j) => (
              <Link key={j} href={link.val.url}>
                <a>{link.val.title}</a>
              </Link>
            ))}
          </p>
        </Collapsible>
      ))
    );
  }
}

export default AccordionSectionB;
