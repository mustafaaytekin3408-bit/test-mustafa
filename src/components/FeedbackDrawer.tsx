import { CheckCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Form, Radio, Rate, Space, Typography, Input } from 'antd';
import { FeedbackRecord } from '../types/feedback';

interface FeedbackDrawerProps {
  open: boolean;
  loading: boolean;
  selected: FeedbackRecord | null;
  onClose: () => void;
  onSave: (closeAfterSave: boolean) => void;
}

export const FeedbackDrawer = ({ open, loading, selected, onClose, onSave }: FeedbackDrawerProps) => {
  return (
    <Drawer
      title="Geri Bildirim Değerlendirmesi"
      placement="right"
      width={520}
      onClose={onClose}
      open={open}
      destroyOnClose
      styles={{ body: { paddingBottom: 84 } }}
    >
      {selected ? (
        <Space direction="vertical" size={16} style={{ display: 'flex' }}>
          <Card size="small">
            <Typography.Text strong>{selected.userName}</Typography.Text>
            <div className="drawer-meta">Kullanıcı adı: {selected.userName}</div>
            <div className="drawer-meta">Eğitim adı: {selected.trainingName}</div>
            <div className="drawer-meta">Tamamlanma tarihi: 01 Mart 2026</div>
            <div className="drawer-meta">Değerlendirme zamanı: 20 gün sonra</div>
          </Card>

          <Form layout="vertical" requiredMark={false}>
            <Form.Item label="Bu eğitim çalışanın performansına katkı sağladı mı?">
              <Rate allowClear={false} />
            </Form.Item>

            <Form.Item label="Davranış değişikliği gözlemlediniz mi?">
              <Radio.Group>
                <Radio value="belirgin">Belirgin</Radio>
                <Radio value="kismen">Kısmen</Radio>
                <Radio value="hayir">Hayır</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="İşine yansıma seviyesi">
              <Radio.Group>
                <Radio value="tamamen">Tamamen</Radio>
                <Radio value="kismen">Kısmen</Radio>
                <Radio value="hic">Hiç</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Bu eğitimi önerir misiniz?">
              <Radio.Group>
                <Radio value="evet">Evet</Radio>
                <Radio value="hayir">Hayır</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Eklemek istedikleriniz">
              <Input.TextArea rows={4} placeholder="Kısa notlarınızı ekleyin" />
            </Form.Item>
          </Form>
        </Space>
      ) : (
        <Card>
          <Typography.Text type="secondary">Gösterilecek geri bildirim kaydı bulunamadı.</Typography.Text>
        </Card>
      )}

      <div className="drawer-actions">
        <Space>
          <Button icon={<SaveOutlined />} loading={loading} onClick={() => onSave(false)}>
            Kaydet
          </Button>
          <Button type="primary" icon={<CheckCircleOutlined />} loading={loading} onClick={() => onSave(true)}>
            Kaydet ve Çık
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};
