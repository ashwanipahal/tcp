// @flow
import React from 'react';
import AccordionItem from '../../AccordionItem';

type Props = {
  accordionItems: Object[],
  className: string,
  children: Object[],
  defaultOpenIndex: number,
};

type State = {
  elementClicked: number,
  isExpanded: boolean,
};

/**
 * @function AccordionList The accordion component will provide a list of accordion
 * that is constructed from the children passed to the accordion list.
 * @param {string} className The class name for the component
 * @param {string} accordionItems The list of items in the accordion as config object
 * @param {node} children The children node for accordionList will
 * contain all the children that needs to be individual accordion items.
 */
export default class AccordionList extends React.Component<Props, State> {
  /**
   * Constructor of the class is defined which handles binding of the events to the elements, the
   * props to the super class and defining the state of the component.
   * @param    {[Object]} props [Props that are passed to the component].
   * @return   {Void} constructor does not return anything.
   */

  constructor(props: Props) {
    super(props);
    (this: any).changeAccordianState = this.changeAccordianState.bind(this);
    this.state = {
      elementClicked: props.defaultOpenIndex ? props.defaultOpenIndex : -1,
      isExpanded: false,
    };
  }

  /**
   * @function changeAccordianState function changes the state of the accordian. It detects the clicked element
   * and send the same to the child elements so that they can expand or collapse accordingly.
   * @param {[Object]} e [Event object of click].
   * @return {Void} function does not return anything.
   */

  changeAccordianState(e: SyntheticKeyboardEvent<*>) {
    // Checking if the click event has happend or a space bar or enter has been pressed.
    if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
      const clickedIndex = e.currentTarget.dataset.index;
      this.setState({
        elementClicked: clickedIndex,
        isExpanded: !!e.currentTarget.closest('.list-item').getElementsByTagName('a').length,
      });
    }
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { elementClicked, isExpanded } = this.state;
    const { accordionItems, className, children } = this.props;

    return (
      <div className={`${className} container-accordion`}>
        {children.map((item, index) => (
          <div className="list-item">
            {index.toString() === elementClicked.toString() && !isExpanded ? (
              <AccordionItem
                titleText={accordionItems[index].header.text || accordionItems[index].header.title}
                updateAccordionState={this.changeAccordianState}
                index={index}
                activeClass="inactive"
              >
                {item}
              </AccordionItem>
            ) : (
              <AccordionItem
                titleText={accordionItems[index].header.text || accordionItems[index].header.title}
                updateAccordionState={this.changeAccordianState}
                index={index}
                activeClass="active"
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}
