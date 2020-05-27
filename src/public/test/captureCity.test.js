import { captureCity } from '../js/details';

test('should return London', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id="city">' + 'London' + '</div>';
  });
  afterEach(() => {
    const city = getCity();
    expect(city).toEqual('London');
  });
})
