import React from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../../../../../../common/molecules/CustomSelect';

const getActiveTitle = (options, value) => {
  const selectedOption = options.find(o => o.value === +value);
  return selectedOption && selectedOption.title;
};

const CreditCardDropdown = ({ options, input, selectListTitle, childrenComp }) => {
  return (
    <CustomSelect
      options={options}
      activeValue={input.value}
      activeTitle={getActiveTitle(options, input.value)}
      clickHandler={(e, value) => input.onChange(value)}
      selectListTitle={selectListTitle}
      childrenComp={childrenComp}
    />
  );
};

CreditCardDropdown.propTypes = {
  options: PropTypes.shape([]).isRequired,
  input: PropTypes.shape({}).isRequired,
  selectListTitle: PropTypes.string.isRequired,
  childrenComp: PropTypes.node,
};

CreditCardDropdown.defaultProps = {
  childrenComp: null,
};

export default CreditCardDropdown;
