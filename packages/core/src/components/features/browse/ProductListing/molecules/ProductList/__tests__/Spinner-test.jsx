import { Spinner, CustomSpinnerIcon, SpinnerIcon, FullPageLoaderSpinner } from '../views/Spinner';

describe('Spinner component', () => {
  it('Spinner called correctly', () => {
    const props = {
      className: '',
    };
    expect(Spinner(props)).toMatchSnapshot();
  });

  it('CustomSpinnerIcon called correctly', () => {
    const props = {
      className: '',
    };
    expect(CustomSpinnerIcon(props)).toMatchSnapshot();
  });

  it('SpinnerIcon called correctly', () => {
    const props = {
      className: '',
    };
    expect(SpinnerIcon(props)).toMatchSnapshot();
  });
  it('FullPageLoaderSpinner render Spinner', () => {
    const props = {
      loading: true,
      isBagPage: false,
    };
    expect(FullPageLoaderSpinner(props)).toMatchSnapshot();
  });

  it('FullPageLoaderSpinner render CustomSpinnerIcon', () => {
    const props = {
      loading: true,
      isBagPage: true,
    };
    expect(FullPageLoaderSpinner(props)).toMatchSnapshot();
  });

  it('FullPageLoaderSpinner render null', () => {
    const props = {
      loading: false,
      isBagPage: true,
    };
    expect(FullPageLoaderSpinner(props)).toMatchSnapshot();
  });
});
