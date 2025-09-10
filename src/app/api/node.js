import { BrowserUseClient } from "browser-use-sdk";
import { z } from "zod";

import dotenv from "dotenv";

dotenv.config();

const client = new BrowserUseClient({
    apiKey: process.env.BROWSER_USE_API_KEY,
});

async function main() {
    

    const TaskOutput = z.object({
        posts: z.array(
            z.object({
                title: z.string(),
                url: z.string(),
            }),
        ),
    });

    const task = await client.tasks.createTask({
        task: "Search for the top 10 Hacker News posts and return the title and url.",
        schema: TaskOutput,
    });

    for await (const step of task.stream()) {
        console.log(step);
    }

    const result = await task.complete();

    for (const post of result.parsed.posts) {
        console.log(`${post.title} - ${post.url}`);
    }
}

main().catch(console.error);
