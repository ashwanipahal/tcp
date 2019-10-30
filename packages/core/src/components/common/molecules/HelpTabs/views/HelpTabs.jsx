import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import HelpTabsStyle, { TabButton } from '../HelpTabs.style';

const HelpTabs = props => {
  const { className, tabs } = props;

  return (
    <div className={className}>
      {tabs.map((item, index) => (
        <div className="button-wrapper" key={index.toString()}>
          <TabButton>{item.text}</TabButton>
        </div>
      ))}
    </div>
  );
};

HelpTabs.defaultProps = {
  className: '',
};

HelpTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
};

export default withStyles(HelpTabs, HelpTabsStyle);
export { HelpTabs as VanillaLinkText };
