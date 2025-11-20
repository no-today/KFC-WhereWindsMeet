import { ToneType } from "./types";

export const TONE_LABELS: Record<ToneType, string> = {
  [ToneType.HEROIC]: "豪侠仗义",
  [ToneType.MELANCHOLIC]: "江湖悲凉",
  [ToneType.MYSTERIOUS]: "诡谲悬疑",
  [ToneType.HUMOROUS]: "市井诙谐",
};

export const DEFAULT_KEYWORDS = "残刀, 骤雨, 宿命";

// Placeholder background emphasizing the ink wash style
export const BACKGROUND_IMAGE = "https://picsum.photos/1920/1080?grayscale&blur=2";