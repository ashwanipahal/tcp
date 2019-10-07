import React from 'react';
import { storiesOf } from '@storybook/react';
import StoresIntlTile from '../views/StoresIntlTile';
import stores from '../__mocks__/stores.mock';
import labels from '../../../atoms/StoreAddressIntl/__mocks__/labels.mock';

storiesOf('StoresIntlTile', module)
  .add('No Stores', () => (
    <div className="content-wrapper">
      <StoresIntlTile title="India" labels={labels.StoreLocator} />
    </div>
  ))
  .add('With Stores', () => (
    <div className="content-wrapper">
      <StoresIntlTile title="India" stores={stores} labels={labels.StoreLocator} />
    </div>
  ))
  .add('Static HTML', () => (
    <div className="content-wrapper">
      <div className="stores-intl-tile-html" data-intl-country="India">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .stores-intl-tile{
                padding-bottom: 48px;
                border-bottom: 1px solid #d8d8d8;
              }
              .stores-intl-tile__header, .INScountry h2 {
                position: relative;
                font-family: Montserrat,Arial,Helvetica,sans-serif;
                font-weight: 400;
                line-height: normal;
                font-size: 20px;
                text-transform: uppercase;
                padding-top: 12px;
                padding-bottom: 12px;
                margin-top: 32px;
                margin-bottom: 0;
              }
              .stores-intl-tile__header::after, .INScountry h2::after {
                content: ' ';
                position: absolute;
                top: 100%;
                left: 0;
                width: 61px;
                height: 1px;
                background: #439ad4;
            }
            .stores-intl-tile__list{
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-flex-wrap: wrap;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              width: 100%;
              margin-right: 0;
              margin-left: 0;
              padding: 0;
            }
            .stores-intl-tile__item-wrapper {
              display: inline-block;
              margin-left: 0%;
              margin-right: 0%;
              margin-right: 5.475504322766571%;
              width: 47.262247838616716%;
            }
            @media (min-width: 768px) {
              .stores-intl-tile__item-wrapper {
                  display: inline-block;
                  margin-left: 0%;
                  margin-right: 0%;
                  margin-right: 4.054054054054054%;
                  width: 21.891891891891895%;
              }
            }
            @media (min-width: 1200px) {
              .stores-intl-tile__item-wrapper {
                  display: inline-block;
                  margin-left: 0%;
                  margin-right: 0%;
                  margin-right: 2.2044088176352705%;
                  width: 14.829659318637272%;
              }
            }
            @media (min-width: 375px) and (max-width: 767px) {
              .stores-intl-tile__list .stores-intl-tile__item-wrapper:nth-child(2n) {
                  margin-right: 0;
              }
            }
            @media (min-width: 768px) and (max-width: 1199px) {
              .stores-intl-tile__list .stores-intl-tile__item-wrapper:nth-child(4n) {
                  margin-right: 0;
              }
            }
            @media (min-width: 1200px) {
              .stores-intl-tile__list .stores-intl-tile__item-wrapper:nth-child(6n) {
                  margin: 0;
              }
            }
            .stores-intl-tile__item, .INScol {
              padding-top: 32px;
            }
            .stores-intl-tile__name, .INScol h3{
              font-family: Nunito-Black,Arial,Helvetica,sans-serif;
              font-size: 16px;
              font-weight: 900;
              line-height: normal;
              margin-bottom: 4px;
              margin-top: 2px;
            }
            .INScol h3.shop-in-shop{
              position: relative;
              margin-bottom: 20px;
              padding-bottom: 6px;
            }
            .INScol h3.shop-in-shop:after {
              position: absolute;
              content: 'Shop-In-Shop';
              font-family: Nunito-Black,Arial,Helvetica,sans-serif;
              font-size: 10px;
              font-weight: 900;
              line-height: normal;
              padding-top: 4px;
              padding-bottom: 4px;
              padding-left: 8px;
              padding-right: 12px;
              background-color: #254f6e;
              color: #ffffff;
              text-transform: uppercase;
              border-top-right-radius: 12px;
              border-bottom-right-radius: 12px;
              top: 100%;
              left: 0;
            }
            .stores-intl-tile_shop-in-shop{
              display: inline-block;
              font-family: Nunito-Black,Arial,Helvetica,sans-serif;
              font-size: 10px;
              font-weight: 900;
              line-height: normal;
              padding-top: 4px;
              padding-bottom: 4px;
              padding-left: 8px;
              padding-right: 12px;
              background-color: #254f6e;
              color: #ffffff;
              text-transform: uppercase;
              border-top-right-radius: 12px;
              border-bottom-right-radius: 12px;
              margin-bottom: 4px;
            }
            .stores-intl-tile_location, .street-address{
              font-family: Nunito,Arial,Helvetica,sans-serif;
              font-size: 14px;
              font-weight: 400;
              line-height: normal;
            }
            .street-address{
              display: inline-block;
              margin-top: 4px;
            }
          `,
          }}
        />
        <div className="stores-intl-tile">
          <h3 className="stores-intl-tile__header">India</h3>
          <ul className="stores-intl-tile__list">
            <li className="stores-intl-tile__item-wrapper">
              <div className="stores-intl-tile__item">
                <h5 className="stores-intl-tile__name">Shoppers Stop Inorbit Cyberabad</h5>
                <div className="stores-intl-tile_shop-in-shop">shop-in-shop</div>
                <div className="stores-intl-tile_location">Hyderabad</div>
              </div>
            </li>
            <li className="stores-intl-tile__item-wrapper">
              <div className="stores-intl-tile__item">
                <h5 className="stores-intl-tile__name">Shoppers Stop Inorbit Cyberabad</h5>
                <div className="stores-intl-tile_shop-in-shop">shop-in-shop</div>
                <div className="stores-intl-tile_location">Hyderabad</div>
              </div>
            </li>
            <li className="stores-intl-tile__item-wrapper">
              <div className="stores-intl-tile__item">
                <h5 className="stores-intl-tile__name">Shoppers Stop Inorbit Cyberabad</h5>
                <div className="stores-intl-tile_shop-in-shop">shop-in-shop</div>
                <div className="stores-intl-tile_location">Hyderabad</div>
              </div>
            </li>
            <li className="stores-intl-tile__item-wrapper">
              <div className="stores-intl-tile__item">
                <h5 className="stores-intl-tile__name">Shoppers Stop Inorbit Cyberabad</h5>
                <div className="stores-intl-tile_shop-in-shop">shop-in-shop</div>
                <div className="stores-intl-tile_location">Hyderabad</div>
              </div>
            </li>
            <li className="stores-intl-tile__item-wrapper">
              <div className="stores-intl-tile__item">
                <h5 className="stores-intl-tile__name">Shoppers Stop Inorbit Cyberabad</h5>
                <div className="stores-intl-tile_shop-in-shop">shop-in-shop</div>
                <div className="stores-intl-tile_location">Hyderabad</div>
              </div>
            </li>
            <li className="stores-intl-tile__item-wrapper">
              <div className="stores-intl-tile__item">
                <h5 className="stores-intl-tile__name">Shoppers Stop Inorbit Cyberabad</h5>
                <div className="stores-intl-tile_shop-in-shop">shop-in-shop</div>
                <div className="stores-intl-tile_location">Hyderabad</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="stores-intl-tile">
        <div className="INScontainer-inner INScountry" id="India">
          <h2>India</h2>
        </div>
        <ul className="stores-intl-tile__list">
          <li className="stores-intl-tile__item-wrapper">
            <div className="INScol">
              <h3 className="shop-in-shop">Iconic Alpha One</h3>
              <span className="street-address">Ahmedabad</span>
              <br />
            </div>
          </li>
          <li className="stores-intl-tile__item-wrapper">
            <div className="INScol">
              <h3 className="shop-in-shop">Shoppers Stop Vastrapur</h3>
              <span className="street-address">Ahmedabad</span>
              <br />
            </div>
          </li>
        </ul>
      </div>
      <pre>
        Note: Inspect element here and find `div` with class 'stores-intl-tile-html'. Right-click
        and copy the outer HTML.
      </pre>
    </div>
  ));
