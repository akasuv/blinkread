import Router from "koa-router";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// Prefix all routes with: /books
const router = new Router({
  prefix: "/summary",
});

let books = [1, 2, 3];

router.post("/", async (ctx, next) => {
  console.log(ctx.request.body);
  const text = ctx.request.body;
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

  ctx.response.status = 200;

  ctx.body = res;
  next();
});

export default router;
