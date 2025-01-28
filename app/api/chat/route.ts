import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: body.messages,
        temperature: 1.0,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // ใช้ Environment Variable
        }
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error connecting to OpenAI API:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from OpenAI API" },
      { status: 500 }
    );
  }
}
