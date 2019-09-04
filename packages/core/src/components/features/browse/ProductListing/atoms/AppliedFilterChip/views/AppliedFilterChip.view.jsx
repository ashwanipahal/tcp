import React from 'react';
import { PropTypes } from 'prop-types';

class AppliedFilterChip extends React.Component {
  static propTypes = {
    /** Id of the applied filter option. */
    id: PropTypes.string.isRequired,

    /** the containing form field name used to manipulate the filter that this chip corresponds to  */
    fieldName: PropTypes.string.isRequired,

    /** Name describing the applied filter option. */
    displayName: PropTypes.string.isRequired,

    /** Callback for clicks on the remove button. Accepts the id,fieldName of this chip. */
    onRemoveClick: PropTypes.func.isRequired,

    /** Classname for this component */
    className: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const { onRemoveClick, fieldName, id } = this.props;
    this.handleRemoveClick = () => onRemoveClick(fieldName, id);
  }

  render() {
    const { displayName, className } = this.props;

    return (
      <div className={`${className} applied-filter-item`}>
        <button
          className="applied-filter-remove-button"
          onClick={this.handleRemoveClick}
          data-locator={`plp_filter_applied_filter_${displayName}_cancel`}
        >
          Clear
        </button>
        <span className="applied-filter-title">{displayName}</span>
      </div>
    );
  }
}

export default AppliedFilterChip;
