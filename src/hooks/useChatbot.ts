import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (message: string) => {
    const newMessages = [
      ...messages,
      { text: message, sender: "user" as "user" }
    ];
    setMessages(newMessages);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: message }] }],
      });

      setMessages([
        ...newMessages,
        { text: response.text ?? "", sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error from Gemini:", error);
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;
