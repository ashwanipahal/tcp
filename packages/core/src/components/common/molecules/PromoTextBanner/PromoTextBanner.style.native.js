import styled from 'styled-components';

import BodyCopy from '../../atoms/BodyCopy';

const StyledBodyCopy = styled(BodyCopy)`
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}` : '')}
`;

export { StyledBodyCopy as BodyCopy };

export default {
  StyledBodyCopy: BodyCopy,
};
