import { calendarYearsMap, calendarDaysMap } from '../DateOfBirthHelper';

test(`calendarYearsMap to return some value`, async () => {
  const response = await calendarYearsMap();
  expect(response).not.toBe(null);
});

test(`calendarDaysMap to return some value`, async () => {
  const response = await calendarDaysMap();
  expect(response).not.toBe(null);
});
