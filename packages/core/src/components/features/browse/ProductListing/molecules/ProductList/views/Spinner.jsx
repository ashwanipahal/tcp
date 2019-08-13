import React from 'react'; // eslint-disable-line no-unused-vars
import cssClassName from '../utils/cssClassName';

export function Spinner(props) {
  // eslint-disable-next-line
  const { children, className } = props;
  const spinnerClassName = cssClassName('general-loading ', className);

  return (
    <div className={spinnerClassName}>
      <div className="general-loading-content">
        <CustomSpinnerIcon />
        {children || 'Loading...'}
      </div>
    </div>
  );
}

export function CustomSpinnerIcon(props) {
  // eslint-disable-next-line
  const { className } = props;
  const iconClassName = cssClassName('custom-loading-icon ', className);
  return <i className={iconClassName}>Spinner</i>;
}

export function SpinnerIcon(props) {
  // eslint-disable-next-line
  const { className } = props;
  const iconClassName = cssClassName('loading-icon ', className);
  return <i className={iconClassName}>Loading...</i>;
}

export function FullPageLoaderSpinner(props) {
  // eslint-disable-next-line
  const { loading, isBagPage } = props;
  if (!loading) {
    return null;
  }

  if (isBagPage) {
    return <CustomSpinnerIcon className="venmo-button-spinner" />;
  }

  return <Spinner className="general-loading--fullpage" />;
}
