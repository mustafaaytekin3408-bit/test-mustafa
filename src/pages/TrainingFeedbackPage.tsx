import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Empty, Input, Row, Select, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { FeedbackDrawer } from '../components/FeedbackDrawer';
import { feedbackKpis, feedbackRows } from '../data/feedbackData';
import { FeedbackRecord } from '../types/feedback';

const statusColorMap: Record<string, string> = {
  Bekliyor: 'gold',
  Tamamlandı: 'green'
};

export const TrainingFeedbackPage = () => {
  const [query, setQuery] = useState('');
  const [trainingFilter, setTrainingFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [dateFilter, setDateFilter] = useState<string | undefined>();
  const [selectedRecord, setSelectedRecord] = useState<FeedbackRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const trainingOptions = useMemo(
    () => [...new Set(feedbackRows.map((item) => item.trainingName))].map((value) => ({ label: value, value })),
    []
  );

  const filteredRows = useMemo(() => {
    return feedbackRows.filter((row) => {
      const matchesQuery = row.userName.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'));
      const matchesTraining = trainingFilter ? row.trainingName === trainingFilter : true;
      const matchesStatus = statusFilter ? row.status === statusFilter : true;
      const matchesDate = dateFilter ? row.feedbackDate.includes(dateFilter) : true;

      return matchesQuery && matchesTraining && matchesStatus && matchesDate;
    });
  }, [query, trainingFilter, statusFilter, dateFilter]);

  const columns: ColumnsType<FeedbackRecord> = [
    {
      title: 'Kullanıcı',
      dataIndex: 'userName',
      key: 'userName',
      render: (_value, record) => (
        <Space>
          <Avatar style={{ backgroundColor: record.userAvatarColor }}>{record.userName.charAt(0)}</Avatar>
          <Typography.Text>{record.userName}</Typography.Text>
        </Space>
      )
    },
    {
      title: 'Eğitim',
      dataIndex: 'trainingName',
      key: 'trainingName'
    },
    {
      title: 'Tamamlanma Tarihi',
      dataIndex: 'completionDate',
      key: 'completionDate'
    },
    {
      title: 'Geri Bildirim Tarihi',
      dataIndex: 'feedbackDate',
      key: 'feedbackDate'
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColorMap[status]}>{status}</Tag>
    },
    {
      title: 'Aksiyon',
      key: 'action',
      render: (_value, record) => (
        <Button
          type={record.status === 'Bekliyor' ? 'primary' : 'default'}
          onClick={(event) => {
            event.stopPropagation();
            setSelectedRecord(record);
            setDrawerOpen(true);
          }}
        >
          {record.status === 'Bekliyor' ? 'Değerlendir' : 'Görüntüle'}
        </Button>
      )
    }
  ];

  const clearFilters = () => {
    setQuery('');
    setTrainingFilter(undefined);
    setStatusFilter(undefined);
    setDateFilter(undefined);
  };

  const handleSave = (closeAfterSave: boolean) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      if (closeAfterSave) {
        setDrawerOpen(false);
      }
    }, 700);
  };

  return (
    <Space direction="vertical" size={20} style={{ display: 'flex' }}>
      <div>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          Eğitim Geri Bildirimleri
        </Typography.Title>
        <Typography.Text type="secondary">
          Ekip üyelerinizin tamamladığı eğitimlerin iş performansına etkisini değerlendirin.
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        {feedbackKpis.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.key}>
            <Card className="kpi-card" bordered>
              <Typography.Text type="secondary">{item.title}</Typography.Text>
              <Typography.Title level={3} style={{ marginTop: 8, marginBottom: 0 }}>
                {item.value}
              </Typography.Title>
            </Card>
          </Col>
        ))}
      </Row>

      <Card>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} md={8} xl={7}>
            <Input
              allowClear
              value={query}
              placeholder="Kullanıcı ara"
              onChange={(event) => setQuery(event.target.value)}
            />
          </Col>
          <Col xs={24} md={8} xl={5}>
            <Select
              allowClear
              value={trainingFilter}
              options={trainingOptions}
              placeholder="Eğitim seç"
              style={{ width: '100%' }}
              onChange={(value) => setTrainingFilter(value)}
            />
          </Col>
          <Col xs={24} md={8} xl={4}>
            <Select
              allowClear
              value={statusFilter}
              options={[
                { label: 'Bekliyor', value: 'Bekliyor' },
                { label: 'Tamamlandı', value: 'Tamamlandı' }
              ]}
              placeholder="Durum"
              style={{ width: '100%' }}
              onChange={(value) => setStatusFilter(value)}
            />
          </Col>
          <Col xs={24} md={12} xl={4}>
            <Select
              allowClear
              value={dateFilter}
              options={[
                { label: 'Mar 2026', value: 'Mar 2026' },
                { label: 'Nis 2026', value: 'Apr 2026' }
              ]}
              placeholder="Tarih"
              style={{ width: '100%' }}
              onChange={(value) => setDateFilter(value)}
            />
          </Col>
          <Col xs={24} md={12} xl={4}>
            <Button block icon={<ReloadOutlined />} onClick={clearFilters}>
              Filtreyi Temizle
            </Button>
          </Col>
        </Row>
      </Card>

      <Card title={<Space><FilterOutlined />Geri bildirim listesi</Space>}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredRows}
          locale={{ emptyText: <Empty description="Filtreye uygun geri bildirim bulunamadı" /> }}
          pagination={{ pageSize: 6, showSizeChanger: false }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedRecord(record);
              setDrawerOpen(true);
            }
          })}
        />
      </Card>

      <FeedbackDrawer
        open={drawerOpen}
        loading={saving}
        selected={selectedRecord}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
      />
    </Space>
  );
};
