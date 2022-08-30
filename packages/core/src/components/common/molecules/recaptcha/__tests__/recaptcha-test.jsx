import React from 'react';
import { shallow } from 'enzyme';
import Recaptcha from '../recaptcha';

describe('Recaptcha', () => {
  let grecaptchaMock = null;
  beforeEach(() => {
    grecaptchaMock = {
      render: jest.fn(),
      reset: jest.fn(),
      getResponse: jest.fn(),
      returns: jest.fn(),
    };
  });

  afterEach(() => {
    grecaptchaMock = null;
  });
  it('should render correctly', () => {
    const mockedOnLoadCallback = jest.fn();
    const mockedVerifyCallback = jest.fn();
    const mockedExpiredCallback = jest.fn();

    const tree = shallow(
      <Recaptcha
        siteKey="6LdYiRsTAAAAAHF4Yntsq8mPdWgHaTTFHsk8rax8"
        onloadCallback={mockedOnLoadCallback}
        verifyCallback={mockedVerifyCallback}
        expiredCallback={mockedExpiredCallback}
      />
    );
    window.grecaptcha = grecaptchaMock;
    tree.instance().attachToRef();
    tree.instance().handleVerify();
    tree.instance().checkReady();
    tree.setState({ ready: true, widget: '' });
    tree.instance().handleExpired();
    expect(tree).toMatchSnapshot();

    window.grecaptcha = null;
  });

  it('should call set time out for check ready', () => {
    const mockedOnLoadCallback = jest.fn();
    const tree = shallow(
      <Recaptcha
        siteKey="6LdYiRsTAAAAAHF4Yntsq8mPdWgHaTTFHsk8rax8"
        onloadCallback={mockedOnLoadCallback}
      />
    );
    tree.instance().checkReady();

    expect(tree).toMatchSnapshot();

    window.grecaptcha = null;
  });
});
