import { useState } from 'react';

/**
 * This hook guarantees the class instance is only created once, for the component between renders.
 *
 * Typically use this hook in a higher level component, like App or a routed page component when you need to configure a Context provider.
 *
 * @example
 * // newClient is preferred in this example,
 * // because query cache isn't accidentally messing with our tests.
 * const oldClient = new QueryClient();
 *
 * function MyApp() {
 *   const newClient = useInstance(() => new QueryClient());
 *
 *   return <QueryClientProvider client={newClient} />
 * }
 *
 */
export function useInstance<T>(factory: () => T): T {
  const [instance] = useState(factory);

  return instance;
}
