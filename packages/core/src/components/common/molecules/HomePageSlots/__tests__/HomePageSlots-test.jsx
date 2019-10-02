import React from 'react';
import { mount } from 'enzyme';

import HomePageSlots from '..';

const slotsCmsDataMock = [
  {
    contentId: 'id-3',
    data: { slotData: 'slot C Data' },
    moduleName: 'moduleC',
    name: 'slot_3',
  },
  {
    contentId: 'id-1',
    data: { slotData: 'slot A Data' },
    moduleName: 'moduleA',
    name: 'slot_1',
  },
  {
    contentId: 'id-2',
    data: { slotData: 'slotB Data' },
    moduleName: 'moduleB',
    name: 'slot_2',
  },
];

const ModuleA = () => <div>Module A</div>;
const ModuleB = () => <div>Module B</div>;
const ModuleC = () => <div>Module C</div>;
const ModuleX = () => <div>Module X</div>;

const modulesDataMock = {
  moduleA: ModuleA,
  moduleB: ModuleB,
  moduleC: ModuleC,
};

const snapshot = `
      Array [
        <ModuleC
          key="id-3"
          slotData="slot C Data"
        >
          <div>
            Module C
          </div>
        </ModuleC>,
        <ModuleA
          key="id-1"
          slotData="slot A Data"
        >
          <div>
            Module A
          </div>
        </ModuleA>,
        <ModuleB
          key="id-2"
          slotData="slotB Data"
        >
          <div>
            Module B
          </div>
        </ModuleB>,
      ]
    `;

describe('HomePageSlots component', () => {
  it('Should renders slots according to the data', () => {
    const component = mount(<HomePageSlots slots={slotsCmsDataMock} modules={modulesDataMock} />);

    expect(component.children()).toMatchInlineSnapshot(snapshot);
  });

  it('Should render slots even if the component is not available', () => {
    const component = mount(
      <HomePageSlots slots={slotsCmsDataMock} modules={{ moduleX: ModuleX, moduleA: ModuleA }} />
    );

    expect(component.children()).toMatchInlineSnapshot(`
              <ModuleA
                key="id-1"
                slotData="slot A Data"
              >
                <div>
                  Module A
                </div>
              </ModuleA>
            `);
  });

  it('Should render slots even if data does not send required slot', () => {
    const component = mount(
      <HomePageSlots
        slots={[
          {
            contentId: 'id-1',
            data: { slotData: 'slot B Data' },
            moduleName: 'moduleB',
            name: 'slot_1',
          },
        ]}
        modules={modulesDataMock}
      />
    );

    expect(component.children()).toMatchInlineSnapshot(`
            <ModuleB
              key="id-1"
              slotData="slot B Data"
            >
              <div>
                Module B
              </div>
            </ModuleB>
          `);
  });

  it('Should render null if no slot match', () => {
    const component = mount(
      <HomePageSlots
        slots={[
          {
            contentId: 'id-1',
            data: { slotData: 'slot X Data' },
            moduleName: 'moduleX',
            name: 'slot_1',
          },
        ]}
        modules={modulesDataMock}
      />
    );

    expect(component.children()).toMatchInlineSnapshot(`null`);
  });

  it('Should render not render component if data is null or undefined', () => {
    //  data prop is undefined in slots
    const component = mount(
      <HomePageSlots
        slots={[
          {
            contentId: 'id-1',
            moduleName: 'moduleA',
            name: 'slot_1',
          },
        ]}
        modules={modulesDataMock}
      />
    );

    expect(component.children()).toMatchInlineSnapshot(`null`);
  });

  it('Should render null if there is blank slots data', () => {
    const component = mount(<HomePageSlots slots={[]} modules={modulesDataMock} />);

    expect(component.children()).toMatchInlineSnapshot(`null`);
  });

  it('Should verify if other props getting render in component', () => {
    const component = mount(
      <HomePageSlots
        extraProp="extraProp"
        slots={[
          {
            contentId: 'id-1',
            data: { slotData: 'slot B Data' },
            moduleName: 'moduleA',
            name: 'slot_1',
          },
          {
            contentId: 'id-2',
            data: { slotData: 'slot A Data' },
            moduleName: 'moduleB',
            name: 'slot_2',
          },
        ]}
        modules={modulesDataMock}
      />
    );

    expect(component.children()).toMatchInlineSnapshot(`
            Array [
              <ModuleA
                extraProp="extraProp"
                key="id-1"
                slotData="slot B Data"
              >
                <div>
                  Module A
                </div>
              </ModuleA>,
              <ModuleB
                extraProp="extraProp"
                key="id-2"
                slotData="slot A Data"
              >
                <div>
                  Module B
                </div>
              </ModuleB>,
            ]
          `);
  });
});
