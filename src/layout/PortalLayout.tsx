import { BarChartOutlined, CommentOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const PortalLayout = () => {
  const { pathname } = useLocation();

  const selectedKey = useMemo(() => {
    if (pathname.startsWith('/yonetici/egitim-geri-bildirimleri')) {
      return 'feedback';
    }

    return 'dashboard';
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" width={240} theme="light" className="app-sider">
        <div className="logo-area">
          <Typography.Title level={5} style={{ margin: 0 }}>
            Yönetici Portalı
          </Typography.Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: 'dashboard',
              icon: <BarChartOutlined />,
              label: 'Genel Bakış'
            },
            {
              key: 'team',
              icon: <TeamOutlined />,
              label: 'Ekip Yönetimi'
            },
            {
              key: 'feedback',
              icon: <CommentOutlined />,
              label: <Link to="/yonetici/egitim-geri-bildirimleri">Eğitim Geri Bildirimleri</Link>
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header className="app-header">
          <Typography.Text type="secondary">Kurumsal Öğrenme Yönetim Paneli</Typography.Text>
        </Header>
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
