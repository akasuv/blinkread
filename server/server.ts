import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import { Configuration, OpenAIApi } from "npm:openai";

const configuration = new Configuration({
  organization: config().OPENAI_ORGANIZATION,
  apiKey: config().OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (request: Request): Promise<Response> => {
  const text = await request.text();

  console.log(" ----------- Request Text ----------- ");
  console.log(text);
  console.log(" ----------- Request Text ----------- ");

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
	Generate an abstract from what the content say:
	1. content: ${text.slice(0, 3000)}
	2. Body length must be: 30 words 
	3. Language: same as the content
	4. Only show the abstract content part, don't start with words like 'abstract', 'summary', etc.
	`,
    max_tokens: 3000,
    temperature: 0.3,
  });

  const res = response.data.choices[0].text;

  console.log(response);

  console.log(" ----------- Response Text ----------- ");
  console.log(res);
  console.log(" ----------- Response Text ----------- ");

  return new Response(res, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

serve(handler);
