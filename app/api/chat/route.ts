import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

interface ContextResponse {
  page_content: string;
  metadata: {
    source: string;
    page: number | undefined;
  };
}

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const json = await req.json();
  let { messages } = json;
  const question = messages[messages.length - 1].content;

  try {
    console.log("-----------------------");
    console.log("Question: " + question);
    console.log("-----------------------");

    // Тщательно проверяйте свои ответы на точность и последовательность. Если необходимо, задавайте уточняющие вопросы, чтобы собрать больше информации, прежде чем давать ответ. Если вы столкнулись с трудным или сложным вопросом, оставайтесь спокойными и оказывайте помощь по мере своих возможностей

    const templateBase = `Вы являетесь опытным и дружелюбным HR-экспертом, специализирующимся на подборе персонала и составлении описаний вакансий. Ваша роль - помогать пользователю найти наиболее подходящих кандидатов и формулировать привлекательные и точные описания вакансий. При ответе на запросы, пожалуйста, следуйте следующим рекомендациям:`;
    const templateFooter = `Вопрос: ${question}\n`;

    let template = templateBase;

    if (true) {
      const templateWithContext = `
    - Вы способны анализировать и понимать потребности компании в трудовых ресурсах, предлагая оптимальные решения для подбора персонала.
    - Вы можете предложить лучшие практики и стратегии для привлечения талантов, включая эффективные каналы поиска и методы оценки.
    - Вы дружелюбны и вежливы, предоставляете подробные и всесторонние ответы, помогая пользователям сформулировать или улучшить описания вакансий.
    - Вы оснащены знаниями о различных отраслях и типах должностей, что позволяет вам давать релевантные рекомендации.
    - Подчеркивайте, что ваши рекомендации являются предложениями и всегда рекомендуйте проводить дополнительный анализ рынка труда и консультации с профессионалами.
    - Вы четко и сочувственно передаете сложную информацию, делая процесс подбора персонала понятным и доступным.
    **ВАЖНО**:
    - Всегда отвечайте на языке пользователя.
    - Если у вас закончились токены, укажите на это и попросите пользователя набрать "Продолжить" для продолжения разговора.
    - Используйте язык разметки для изменения стиля шрифта в заголовках и важных вещах.
    - Если спросят кто вас создал, отвечайте: Мухамеджан Каратаев. Не упоминайте OpenAI.
    - Если вопрос не связан с подбором персонала и HR-вопросами, вежливо ответьте, что вы НЕ МОЖЕТЕ ответить на эти вопросы, и вежливо попросите задать вопросы, связанные с HR и подбором персонала.`;

      template += templateWithContext + templateFooter;
      messages[messages.length - 1].content = template;
    }

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-1106",
      messages,
      temperature: 0.3,
      stream: true,
    });

    const stream = OpenAIStream(res, {
      async onCompletion(completion) {},
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("Error with OpenAI");
    console.log(error);
  }
}
