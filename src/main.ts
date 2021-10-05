import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { RenderService } from 'nest-next';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import session = require('express-session');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // somewhere in your initialization file
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const renderService = app.get(RenderService);
  renderService.setErrorHandler(async (err, req, res) => {
    console.log(err);
    res.send(err.response);
  });

  await app.listen(process.env.PORT || 80);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
