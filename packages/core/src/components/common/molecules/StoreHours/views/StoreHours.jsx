import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CollapsibleContainer from '@tcp/core/src/components/common/molecules/CollapsibleContainer/views/CollapsibleContainer.view';
import style, { collapsibleOverrideStyles } from '../styles/StoreHours.style';

// Override collapsible container
const StoreCollapsible = withStyles(CollapsibleContainer, collapsibleOverrideStyles);

class StoreHours extends PureComponent {
  static getListItems(data) {
    return data.map(item => (
      <li key={item.id}>
        <div className="text-left">{item.label}</div>
        {Array.isArray(item.value) &&
          item.value.length > 0 &&
          item.value.map(timeArr => (
            <div className="text-right" key={`${item.id}-${timeArr}`}>
              {timeArr}
            </div>
          ))}
        {!Array.isArray(item.value) ? <div className="text-right">{item.value}</div> : null}
      </li>
    ));
  }

  static getCollapsibleTitle(title) {
    return <span className="collapsible-header-text">{title}</span>;
  }

  static getListData(data) {
    return (
      <div className="data-list-wrapper">
        <ul className="data-list">{this.getListItems(data)}</ul>
      </div>
    );
  }

  render() {
    const { className, children, title, storeTiming, storeMeta, ...rest } = this.props;
    return (
      <div className={className}>
        {storeTiming.length > 0 && (
          <StoreCollapsible
            {...rest}
            header={this.constructor.getCollapsibleTitle(title)}
            body={this.constructor.getListData(storeTiming)}
          />
        )}
        {storeMeta.length > 0 && (
          <div className="meta">{this.constructor.getListData(storeMeta)}</div>
        )}
        {children}
      </div>
    );
  }
}

StoreHours.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string.isRequired,
  storeMeta: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  storeTiming: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape([])]),
    })
  ),
};

StoreHours.defaultProps = {
  children: null,
  storeMeta: [],
  storeTiming: [],
};

export default withStyles(StoreHours, style);
