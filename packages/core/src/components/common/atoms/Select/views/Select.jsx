import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';
import StyledTextBox from '../Select.style';

const renderTitle = ({ value, title }) => {
  return value && title ? (
    <BodyCopy fontSize="fs12" fontFamily="secondary" className="select__label">
      {title}
    </BodyCopy>
  ) : (
    ''
  );
};

renderTitle.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
};

renderTitle.defaultProps = {
  value: '',
  title: '',
};

// eslint-disable-next-line complexity
const SelectBox = ({
  className,
  id,
  ariaLabel,
  name,
  placeholder,
  input,
  options,
  meta: { touched, error },
  dataLocator,
  disabled,
  title,
  ...otherProps
}) => {
  const elementID = id || name;
  const errorMessagea11yLbl = elementID ? `selectbox__error__${elementID}` : 'selectbox__error';
  return (
    <div className={className}>
      <select
        {...input}
        id={id}
        aria-label={ariaLabel}
        className="select__input"
        name={name}
        value={input.value || placeholder}
        data-locator={dataLocator}
        {...otherProps}
        disabled={disabled}
        aria-describedby={touched && errorMessagea11yLbl}
      >
        {!input.value && placeholder && <option value="">{placeholder}</option>}
        {options &&
          options.map(option => {
            return (
              <option
                value={option.id || option.get('id')}
                id={option.id || option.get('id')}
                key={option.id || option.get('id')}
              >
                {option.displayName || option.get('displayName')}
              </option>
            );
          })}
      </select>
      {/* the placeholder should not be used as title since different text
      is being used for placeholder and title in multiple instances */}
      {renderTitle({ value: input.value, title })}
      <div className="SelectBox__error">
        <div className={touched && error ? 'warning-icon' : ''} aria-disabled="true" />
        {touched && error && (
          <BodyCopy
            fontSize="fs12"
            fontFamily="secondary"
            component="div"
            color="error"
            fontWeight="extrabold"
            role="alert"
            aria-live="assertive"
            id={errorMessagea11yLbl}
          >
            {error}
          </BodyCopy>
        )}
      </div>
    </div>
  );
};

SelectBox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({}).isRequired,
  input: PropTypes.shape({}).isRequired,
  options: PropTypes.shape([]).isRequired,
  dataLocator: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

SelectBox.defaultProps = {
  id: '',
  ariaLabel: '',
  name: '',
  type: 'text',
  placeholder: '',
  dataLocator: '',
  disabled: false,
  title: '',
  className: '',
};

export default withStyles(SelectBox, StyledTextBox);
export { SelectBox as SelectBoxVanilla };
