import getModalHeight from '../modalHelper';

test(`getModalHeight to height of moal when in checkout flow and having bag items`, async () => {
  const response = await getModalHeight(true, true);
  expect(response).toBe('560px');
});

test(`getModalHeight to height of moal when in checkout flow and not having bag items`, async () => {
  const response = await getModalHeight(false, true);
  expect(response).toBe('500px');
});

test(`getModalHeight to height of moal when not in checkout flow and having bag items`, async () => {
  const response = await getModalHeight(true, false);
  expect(response).toBe('512px');
});

test(`getModalHeight to height of moal when not in checkout flow and not having bag items`, async () => {
  const response = await getModalHeight(false, false);
  expect(response).toBe('458px');
});
