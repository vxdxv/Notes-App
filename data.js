import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI("AIzaSyC50FI3d9JalKmXHAP3jbbiDGHSAM3WtIw");

//AIzaSyC50FI3d9JalKmXHAP3jbbiDGHSAM3WtIw

async function run(ask) {
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = ask;

  const result = await model.generateContent(prompt);
  const response = result.response;
//   const text = response.text();
    return response;
}

export default run;