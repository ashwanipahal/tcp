import React from 'react';
import PropTypes from 'prop-types';
import StoreHoursRoot, {
  TimingsList,
  TimingsItem,
  TimingsText,
  StoreHoursTitle,
} from '../styles/StoreHours.style.native';

const StoreHours = ({ children, title, storeTiming }) => {
  return (
    <StoreHoursRoot>
      <StoreHoursTitle>{title}</StoreHoursTitle>
      {storeTiming.length > 0 && (
        <TimingsList>
          {storeTiming.map(item => (
            <TimingsItem key={item.id}>
              <TimingsText textAlign="left">{item.label}</TimingsText>
              {Array.isArray(item.value) &&
                item.value.map(val => (
                  <TimingsText textAlign="right" key={`${item.id}-${val}`}>
                    {val}
                  </TimingsText>
                ))}
              {!Array.isArray(item.value) && (
                <TimingsText textAlign="right">{item.value}</TimingsText>
              )}
            </TimingsItem>
          ))}
        </TimingsList>
      )}
      {children}
    </StoreHoursRoot>
  );
};

StoreHours.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string.isRequired,
  storeTiming: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

StoreHours.defaultProps = {
  children: null,
  storeTiming: [],
};

export default StoreHours;
