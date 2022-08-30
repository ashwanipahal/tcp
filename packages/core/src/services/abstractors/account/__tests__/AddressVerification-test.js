import { getResultType } from '../AddressVerification';
// TODO - Include more test cases
describe('#getResultType', () => {
  it('should return AS01 for valid address', () => {
    const resultType = getResultType({
      Records: [
        {
          Results: 'AS01',
        },
      ],
    });

    expect(resultType).toEqual('AS01');
  });

  it('should return AE09 if its at the first position', () => {
    const resultType = getResultType({
      Records: [
        {
          Results: 'AE09,AE11,AE12',
        },
      ],
    });

    expect(resultType).toEqual('AE09');
  });

  it('should return AE10 if its the only resultType', () => {
    const resultType = getResultType({
      Records: [
        {
          Results: 'AE10',
        },
      ],
    });

    expect(resultType).toEqual('AE10');
  });

  it('should return AE11 if its presnt in the result type', () => {
    const resultType = getResultType({
      Records: [
        {
          Results: 'AE11',
        },
      ],
    });

    expect(resultType).toEqual('AE11');
  });

  it('should return AE12 if its presnt in the result type', () => {
    const resultType = getResultType({
      Records: [
        {
          Results: 'AE12',
        },
      ],
    });

    expect(resultType).toEqual('AE12');
  });

  it('should return default for all other cases', () => {
    const resultType = getResultType({
      Records: [
        {
          Results: '',
        },
      ],
    });

    expect(resultType).toEqual('DEFAULT');
  });
});
