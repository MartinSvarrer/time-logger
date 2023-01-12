import { useLocation } from 'react-router-dom';

export const LOCATION_DISPLAY_TEST_ID = 'location-display';

/**
 * A test helper component that will render the current location path, intended for testing react-router.
 *
 * @example
 *
 * render(
 *  <MemoryRouter>
 *    <ComponentWithRouting />
 *    <LocationDisplay />
 *  </MemoryRouter>
 * )
 *
 * screen.getByTestId(LOCATION_DISPLAY_TEST_ID);
 */
export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid={LOCATION_DISPLAY_TEST_ID}>{location.pathname}</div>;
};
