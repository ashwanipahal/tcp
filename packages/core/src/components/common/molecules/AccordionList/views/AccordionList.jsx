// @flow
import React from 'react';
import Accordion from '../../Accordion';

type Props = {
  accordionItems: Object[],
  className: string,
};

type State = {
  elementClicked: number,
  isExpanded: boolean,
};

export default class AccordionList extends React.Component<Props, State> {
  /**
   * Constructor of the class is defined which handles binding of the events to the elements, the
   * props to the super class and defining the state of the component.
   * @param    {[Object]} props [Props that are passed to the component].
   * @return   {Void} constructor does not return anything.
   */

  constructor(props: Props) {
    super(props);
    this.changeAccordianState = this.changeAccordianState.bind(this);
    this.state = {
      elementClicked: 0,
      isExpanded: false,
    };
  }

  /**
   * changeAccordianState function changes the state of the accordian. It detects the clicked element
   * and send the same to the child elements so that they can expand or collapse accordingly.
   * @param {[Object]} e [Event object of click].
   * @return {Void} function does not return anything.
   */

  changeAccordianState(e: SyntheticEvent) {
    // Checking if the click event has happend or a space bar or enter has been pressed.
    if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
      const clickedIndex = e.target.dataset.index;
      this.setState({
        elementClicked: clickedIndex,
        isExpanded: !!e.target.closest('.list-item').getElementsByTagName('a').length,
      });
    }
  }

  /**
   * render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { elementClicked, isExpanded } = this.state;
    const { accordionItems, className } = this.props;

    return (
      <div className={`${className} container-accordion`}>
        {accordionItems.map((item, index) => (
          <div className="list-item">
            {index.toString() === elementClicked.toString() && !isExpanded ? (
              <Accordion
                titleText={item.header.text}
                listArray={item.links}
                updateAccordionState={this.changeAccordianState}
                index={index}
              />
            ) : (
              <Accordion
                titleText={item.header.text}
                listArray={[]}
                updateAccordionState={this.changeAccordianState}
                index={index}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}
