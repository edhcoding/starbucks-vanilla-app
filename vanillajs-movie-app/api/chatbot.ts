import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const { OPENAI_APIKEY } = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_APIKEY,
});

// 위에서 생성자 함수를 통해서 생성된 결과 openai의 instance는 실제로 사용할 수 있는 여러 명렁어들을 가지고있는데 그 명령어를 사용할 함수를 아래에 만들어서 사용하겠음
async function sendMessages(messages: OpenAI.ChatCompletionMessageParam[]) {
  const chatCompletion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });

  console.log("chatCompletion", chatCompletion);
  return chatCompletion.choices[0].message;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { messages } = JSON.parse(request.body);
  const message = await sendMessages(messages);

  response.status(200).json(message);
}
