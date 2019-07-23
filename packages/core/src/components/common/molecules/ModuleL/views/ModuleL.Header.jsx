// @flow
import React, { Fragment } from 'react';
import { Anchor, Heading } from '../../../atoms';
import { getLocator } from '../../../../../utils';

type Props = {
  headerText: Object,
};

/**
 * @function ModuleLHeader This function renders header of Module L
 * @param {headerText} headerText Header text lines and link data
 */
const ModuleLHeader = ({ headerText: { textItems, link } }: Props) => (
  <Fragment>
    {textItems.map((textLine, index) => {
      return link ? (
        <Anchor key={index.toString()} to={link.url} target={link.target}>
          <Heading
            variant="h2"
            data-locator={getLocator('moduleL_header_text')}
            textAlign="center"
            color="text.primary"
          >
            {textLine.text}
          </Heading>
        </Anchor>
      ) : (
        <Heading
          variant="h2"
          data-locator={getLocator('moduleL_header_text')}
          textAlign="center"
          color="text.primary"
        >
          {textLine.text}
        </Heading>
      );
    })}
  </Fragment>
);

export default ModuleLHeader;
