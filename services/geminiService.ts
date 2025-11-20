import { GoogleGenAI, Type } from "@google/genai";
import { GenerateParams, CopyResult, ToneType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCrazyThursdayCopy = async (params: GenerateParams): Promise<CopyResult> => {
  const { tone, keywords } = params;

  const tonePromptMap: Record<ToneType, string> = {
    [ToneType.HEROIC]: "笔触硬朗，如刀劈斧凿。重在侠义与决绝。",
    [ToneType.MELANCHOLIC]: "笔触苍凉，如晚秋冷雨。重在孤独与漂泊。",
    [ToneType.MYSTERIOUS]: "笔触隐晦，如雾里看花。重在未知的恐惧与寒意。",
    [ToneType.HUMOROUS]: "笔触如市井泼皮，看似正经实则荒诞。",
  };

  const prompt = `
    你是一位浪迹于五代十国乱世的无名刀客，见惯了《燕云十六声》背景下家国破碎、烽火连天的惨状。
    
    请创作一篇“肯德基疯狂星期四”的文案。
    
    核心要求：
    1. **沉浸式剧情**：
       - **严禁**出现“点穴”、“奇术”、“开放世界”、“机制”等任何游戏功能性词汇。这是大忌！
       - 必须深入剧情氛围：描写残阳、断刃、废墟、雨夜、不知名的尸骨、沉重的呼吸。
       - 强调“刀”的意象，强调江湖的身不由己。
       - 文风要狠、要冷、要简练。
    2. **字数限制**：全文字数严格控制在50-100字之间。
    3. **内容禁忌**：正文中**绝不出现**“燕云十六声”游戏名。
    4. **极度反转**：
       - 前90%是极度压抑、肃杀的武侠氛围，让人感受到生存的艰难。
       - 最后一句突然转折，因为太饿了，需要钱去吃肯德基疯狂星期四。
    5. **关键词融入**：${keywords || '残刀, 骤雨, 宿命'}。
    6. **风格设定**：${tonePromptMap[tone]}
    
    输出格式要求：
    请返回JSON格式，包含两个字段：
    - title: 文案的简短古风标题 (例如：断刀行)
    - content: 文案的正文内容
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
          },
          required: ["title", "content"],
        },
        temperature: 0.9, // Keep high for creativity
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated.");
    }

    return JSON.parse(text) as CopyResult;
  } catch (error) {
    console.error("Error generating copy:", error);
    throw new Error("文案生成失败，请稍后重试。或许是江湖风浪太大，信号不好。");
  }
};