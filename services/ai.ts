import { OpenAI, PromptTemplate } from "langchain";
import { loadQAChain, loadQARefineChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.",
      ),
    subject: z.string().describe("the subject of the journal entry"),
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("quick summary of the entire entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? like does it have negative emotions?.",
      ),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe represents happiness.",
      ),
  }),
);

const getPrompt = async (content) => {
  const formattedInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions: formattedInstructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (content) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.log(e);
  }
};

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.id,
        createdAt: entry.createdAt,
      },
    });
  });

  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });

  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};
