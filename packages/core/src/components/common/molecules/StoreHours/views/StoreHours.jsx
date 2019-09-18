import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CollapsibleContainer from '@tcp/core/src/components/common/molecules/CollapsibleContainer/views/CollapsibleContainer.view';
import style, { collapsibleOverrideStyles } from '../styles/StoreHours.style';

// Override collapsible container
const StoreCollapsible = withStyles(CollapsibleContainer, collapsibleOverrideStyles);

const getListItems = data => {
  if (data.length) {
    return data.map(item => (
      <li key={item.id}>
        <div className="text-left">{item.label}</div>
        <div className="text-right">{item.value}</div>
      </li>
    ));
  }
  return null;
};

const getCollapsibleTitle = title => {
  return <span className="collapsible-header-text">{title}</span>;
};

const getListData = data => {
  if (data.length) {
    return (
      <div className="data-list-wrapper">
        <ul className="data-list">{getListItems(data)}</ul>
      </div>
    );
  }
  return null;
};
const StoreHours = props => {
  const { className, children, title, storeTiming, storeMeta, ...rest } = props;
  return (
    <div className={className}>
      {storeTiming.length > 0 && (
        <StoreCollapsible
          {...rest}
          header={getCollapsibleTitle(title)}
          body={getListData(storeTiming)}
        />
      )}
      {storeMeta.length > 0 && <div className="meta">{getListData(storeMeta)}</div>}
      {children}
    </div>
  );
};

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
      value: PropTypes.string,
    })
  ),
  noDataMsg: PropTypes.string.isRequired,
};

StoreHours.defaultProps = {
  children: null,
  storeMeta: [],
  storeTiming: [],
};

export default withStyles(StoreHours, style);
