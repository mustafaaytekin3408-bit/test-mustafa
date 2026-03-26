export type FeedbackStatus = 'Bekliyor' | 'Tamamlandı';

export interface FeedbackRecord {
  id: string;
  userName: string;
  userAvatarColor: string;
  trainingName: string;
  completionDate: string;
  feedbackDate: string;
  status: FeedbackStatus;
}
