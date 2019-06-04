import styled from 'styled-components';
/* The component send styles in form of an object
e.g. withStyles(WrappedComponent, {
  <desktop styles>
});

Note: Keys are defined in constants

If the component doesn't want to send 2 styles, it can send styles directly and not as keyed object.
*/
export default (WrappedComponent, styles) => styled(WrappedComponent)`
  ${props => (styles ? styles[props.theme] || styles : '')};
  ${props => {
    if (!props.inheritedStyles) return '';
    if (props.inheritedStyles instanceof Array) return props.inheritedStyles;
    return props.inheritedStyles[props.theme] || '';
  }};
`;
