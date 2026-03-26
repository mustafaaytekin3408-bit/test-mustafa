import { FeedbackRecord } from '../types/feedback';

export const feedbackKpis = [
  { key: 'pending', title: 'Bekleyen Geri Bildirim', value: '12' },
  { key: 'completed', title: 'Tamamlanan', value: '48' },
  { key: 'impact', title: 'Ortalama Etki Skoru', value: '%76' },
  { key: 'weekly', title: 'Bu Hafta', value: '+8 Yeni' }
] as const;

export const feedbackRows: FeedbackRecord[] = [
  {
    id: '1',
    userName: 'Ahmet Yılmaz',
    userAvatarColor: '#1677ff',
    trainingName: 'Satış Teknikleri Eğitimi',
    completionDate: '01 Mar 2026',
    feedbackDate: '21 Mar 2026',
    status: 'Bekliyor'
  },
  {
    id: '2',
    userName: 'Ayşe Demir',
    userAvatarColor: '#52c41a',
    trainingName: 'İletişim Eğitimi',
    completionDate: '05 Mar 2026',
    feedbackDate: '25 Mar 2026',
    status: 'Tamamlandı'
  },
  {
    id: '3',
    userName: 'Mehmet Kaya',
    userAvatarColor: '#722ed1',
    trainingName: 'Liderlik Temelleri',
    completionDate: '10 Mar 2026',
    feedbackDate: '30 Mar 2026',
    status: 'Bekliyor'
  }
];
