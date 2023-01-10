import { AppLayout, AppLayoutHeader, AppLayoutMain } from './AppLayout';
import AppRoutes from './AppRoutes';
import TopBar from './TopBar';

export function App() {
  return (
    <AppLayout>
      <AppLayoutHeader>
        <TopBar />
      </AppLayoutHeader>
      <AppLayoutMain>
        <AppRoutes />
      </AppLayoutMain>
    </AppLayout>
  );
}

export default App;
