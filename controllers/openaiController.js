import dotenv from "dotenv";
import OpenAI from "openai"; // Adjusted import

// Load environment variables
dotenv.config();

// Create OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Specify the model as GPT-4
      messages: [{ role: "user", content: `Summarize this: ${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });
    const summary = response.data.choices[0].message.content;
    return res.status(200).json(summary);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini", // Specify the model as GPT-4
      messages: [{ role: "user", content: `Write a detailed paragraph about: ${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });
    const paragraph = response.data.choices[0].message.content;
    return res.status(200).json(paragraph);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini", // Specify the model as GPT-4
      messages: [
        { role: "user", content: `Answer the question similar to how Yoda from Star Wars would.\nMe: 'What is your name?'\nYoda: 'Yoda is my name'\nMe: ${text}` },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
    const answer = response.data.choices[0].message.content;
    return res.status(200).json(answer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini", // Specify the model as GPT-4
      messages: [{ role: "user", content: `/* Convert these instructions into JavaScript code: ${text}` }],
      max_tokens: 400,
      temperature: 0.25,
    });
    const jsCode = response.data.choices[0].message.content;
    return res.status(200).json(jsCode);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.createImage({
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    const imageUrl = response.data.data[0].url;
    return res.status(200).json(imageUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
