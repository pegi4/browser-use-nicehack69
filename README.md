# Browser Use Demo

A Next.js application that demonstrates the power of Browser Use SDK for AI-powered browser automation. This project provides a complete web interface for creating, managing, and monitoring browser automation tasks.

## Features

- 🤖 **AI Browser Automation**: Create tasks that use AI to navigate and interact with websites
- 📊 **Real-time Monitoring**: Watch tasks execute in real-time with live updates
- 🔧 **Custom Configuration**: Full control over LLM models, task parameters, and browser settings
- 📱 **Responsive UI**: Modern, mobile-friendly interface built with Tailwind CSS
- 🔒 **Type Safety**: Full TypeScript support with Zod validation

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
BROWSER_USE_API_KEY=bu_your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get your API key from [Browser Use Cloud](https://cloud.browser-use.com).

### 3. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── bu-task/           # Task management API routes
│   │   │   ├── route.ts       # Create tasks
│   │   │   └── [taskId]/
│   │   │       ├── route.ts   # Get/update specific task
│   │   │       ├── complete/  # Complete task endpoint
│   │   │       └── stream/    # Real-time task streaming
│   │   └── bu-session/        # Session management API routes
│   ├── page.tsx               # Main application page
│   └── layout.tsx
├── components/
│   ├── TaskForm.tsx           # Task creation form
│   └── TaskList.tsx           # Task management interface
├── lib/
│   └── browser-use-client.ts  # Client-side SDK wrapper
└── types/
    └── browser-use.ts         # TypeScript types and Zod schemas
```

## API Endpoints

### Tasks

- `POST /api/bu-task` - Create a new task
- `GET /api/bu-task/[taskId]` - Get task details
- `PATCH /api/bu-task/[taskId]` - Update task (stop, pause, resume)
- `POST /api/bu-task/[taskId]/complete` - Complete a task
- `GET /api/bu-task/[taskId]/stream` - Stream task updates (SSE)

### Sessions

- `POST /api/bu-session` - Create a new session
- `GET /api/bu-session` - List sessions

## Usage Examples

### Basic Task Creation

```typescript
import { browserUseClient } from '@/lib/browser-use-client';

// Create a simple task
const { id } = await browserUseClient.createTask({
  task: "Search for the latest AI news on Google",
  startUrl: "https://google.com",
  maxSteps: 10,
  flashMode: true
});
```

### Structured Output

```typescript
// Get structured data from a website
const { id } = await browserUseClient.createTask({
  task: "Search for the top 10 Hacker News posts and return the title and url.",
  structuredOutput: JSON.stringify({
    type: "object",
    properties: {
      posts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            url: { type: "string" }
          },
          required: ["title", "url"]
        }
      }
    },
    required: ["posts"]
  })
});

const result = await browserUseClient.completeTask(id);
console.log(result.parsed); // Structured data
```

### Real-time Monitoring

```typescript
// Stream task updates
const response = await fetch(`/api/bu-task/${taskId}/stream`);
const reader = response.body?.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = new TextDecoder().decode(value);
  const data = JSON.parse(chunk.replace('data: ', ''));
  console.log('Task update:', data);
}
```

## Configuration Options

### Task Parameters

- **task**: Description of what the browser should do
- **llm**: AI model to use (gpt-4o, gpt-4.1, gemini-2.5-flash, etc.)
- **startUrl**: Initial URL to navigate to
- **maxSteps**: Maximum number of actions (1-200)
- **flashMode**: Enable fast execution mode
- **thinking**: Enable AI thinking mode
- **vision**: Enable visual understanding
- **highlightElements**: Highlight clickable elements
- **structuredOutput**: JSON schema for structured data extraction

### Session Options

- **proxyCountryCode**: Set proxy location (us, uk, de, etc.)

## Task Examples

Here are some common task patterns you can use:

1. **Web Search**: "Search Google for 'latest AI news' and return the first 5 results"
2. **Data Extraction**: "Navigate to news.ycombinator.com and extract the top 10 story titles"
3. **Form Filling**: "Go to example.com and fill out the contact form with test data"
4. **E-commerce**: "Search for 'laptop' on Amazon and return the top 3 products with prices"

## Development

### Adding New Features

1. **New API Routes**: Add to `src/app/api/`
2. **UI Components**: Add to `src/components/`
3. **Types**: Update `src/types/browser-use.ts`
4. **Client Utils**: Extend `src/lib/browser-use-client.ts`

### Type Safety

The project uses Zod for runtime validation and TypeScript for compile-time safety. All API endpoints validate input data using Zod schemas.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `BROWSER_USE_API_KEY` environment variable
4. Deploy!

### Other Platforms

The application is a standard Next.js app and can be deployed to any platform that supports Node.js.

## Troubleshooting

### Common Issues

1. **API Key Not Set**: Make sure `BROWSER_USE_API_KEY` is in your `.env.local` file
2. **CORS Errors**: Ensure your API routes are properly configured
3. **Task Timeouts**: Increase `maxSteps` for complex tasks
4. **Rate Limits**: Check your Browser Use API usage limits

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` and check the browser console and server logs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- [Browser Use Documentation](https://docs.browser-use.com)
- [Browser Use Cloud](https://cloud.browser-use.com)
- [GitHub Issues](https://github.com/browser-use/browser-use/issues)
