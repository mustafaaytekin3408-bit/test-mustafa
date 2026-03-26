import { ConfigProvider, theme } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PortalLayout } from './layout/PortalLayout';
import { TrainingFeedbackPage } from './pages/TrainingFeedbackPage';

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          colorBgLayout: '#f5f7fb',
          borderRadius: 10
        }
      }}
    >
      <Routes>
        <Route element={<PortalLayout />}>
          <Route path="/yonetici/egitim-geri-bildirimleri" element={<TrainingFeedbackPage />} />
          <Route path="*" element={<Navigate to="/yonetici/egitim-geri-bildirimleri" replace />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
