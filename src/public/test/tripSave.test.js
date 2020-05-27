import request from '../selectionMocks/tripSaving.js';

const travelling = {
  city: 'London',
  countryCode: 'UK',
  country: 'United-Kingdom'
};

const travellingDetails = async () => {
  const response = await request(travelling);
  return response;
}

it('return an array with trip object', async function () {
  const response = await travellingDetails();
  expect(response[0].country).toEqual('United-Kingdom');
})