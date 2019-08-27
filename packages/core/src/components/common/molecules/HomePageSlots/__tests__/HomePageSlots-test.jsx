import React from 'react';
import { mount } from 'enzyme';

import HomePageSlot from '..';

const slotsCmsDataMock = {
  slot_2: {
    name: 'moduleB',
  },
  slot_3: {
    name: 'moduleC',
  },
  slot_1: {
    name: 'moduleA',
  },
};

const ModuleA = () => <div>Module A</div>;
const ModuleB = () => <div>Module B</div>;
const ModuleC = () => <div>Module C</div>;
const ModuleX = () => <div>Module X</div>;

const modulesDataMock = [
  {
    name: 'moduleB',
    component: ModuleB,
  },
  {
    name: 'moduleC',
    component: ModuleC,
  },
  {
    name: 'moduleA',
    component: ModuleA,
  },
];

const snapshot = `
      Array [
        <ModuleA
          key="moduleA"
          name="moduleA"
        >
          <div>
            Module A
          </div>
        </ModuleA>,
        <ModuleB
          key="moduleB"
          name="moduleB"
        >
          <div>
            Module B
          </div>
        </ModuleB>,
        <ModuleC
          key="moduleC"
          name="moduleC"
        >
          <div>
            Module C
          </div>
        </ModuleC>,
      ]
    `;

describe('HomePageSlots component', () => {
  it('Should renders slots according to the CMS Data', () => {
    const component = mount(<HomePageSlot {...slotsCmsDataMock} modules={modulesDataMock} />);

    expect(component.children()).toMatchInlineSnapshot(snapshot);
  });

  it('Should render slots even if the component is not available', () => {
    const component = mount(
      <HomePageSlot
        {...slotsCmsDataMock}
        modules={[{ name: 'moduleX', component: ModuleX }, { name: 'moduleA', component: ModuleA }]}
      />
    );

    expect(component.children()).toMatchInlineSnapshot(`
        <ModuleA
          key="moduleA"
          name="moduleA"
        >
          <div>
            Module A
          </div>
        </ModuleA>
        `);
  });

  it('Should render slots even if CMS does not send required slot', () => {
    const component = mount(
      <HomePageSlot
        slot_2={{
          name: 'moduleB',
        }}
        modules={modulesDataMock}
      />
    );

    expect(component.children()).toMatchInlineSnapshot(`
      <ModuleB
        key="moduleB"
        name="moduleB"
      >
        <div>
          Module B
        </div>
      </ModuleB>
      `);
  });

  it('Should render null if no slot match', () => {
    const component = mount(
      <HomePageSlot
        slot_2={{
          name: 'moduleX',
        }}
        modules={modulesDataMock}
      />
    );

    expect(component.children()).toMatchInlineSnapshot(`null`);
  });
});
