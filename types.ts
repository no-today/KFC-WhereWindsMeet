export enum ToneType {
  HEROIC = 'HEROIC', // 豪侠
  MELANCHOLIC = 'MELANCHOLIC', // 悲凉
  MYSTERIOUS = 'MYSTERIOUS', // 诡谲
  HUMOROUS = 'HUMOROUS', // 诙谐
}

export interface CopyResult {
  title: string;
  content: string;
}

export interface GenerateParams {
  tone: ToneType;
  keywords?: string;
}