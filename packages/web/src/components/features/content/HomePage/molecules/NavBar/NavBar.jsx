/* eslint-disable */
import React, { Fragment } from 'react';
import Link from 'next/link';

const NavBar = ({ links }) => (
  <Fragment>
    <ul className="navigation-bar">
      <li className="navigation-level-one">
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li className="navigation-level-one">
        <Link href="/DeltaSyncSamplePage">
          <a>Delta-Sync Sample</a>
        </Link>
      </li>
      {links &&
        links.map(link => (
          <li key={link.id} className="navigation-level-one">
            <Link href="/ProductListingPage" as="/ProductListingPage">
              <a>{link.name}</a>
            </Link>
          </li>
        ))}
    </ul>
  </Fragment>
);

export default NavBar;
