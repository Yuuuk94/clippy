import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT ?? 4000;

  await app.listen(PORT, '0.0.0.0');
  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    // if (NODE_ENV === 'development') url = `http://localhost:${PORT}`;

    // console.log(`Application NODE_ENV: ${NODE_ENV}`);
    console.log(`Application is running on: ${url}`);
    console.log(`Application swagger docs: ${url}/api/doc`);
  } catch (error) {
    console.log(`[Error] bootstrap ${error}`);
  }
})();
