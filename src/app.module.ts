import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
// import { ProductModule } from './product/product.module';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';
import { ConfigModule } from '@nestjs/config';
import mainConfiguration from './config/mainConfiguration';
import { FileModule } from './file/file.module';
import {graphqlUploadExpress} from 'graphql-upload'
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      context: ({ req }) => ({ ...req }),
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 5000,
        path: '/subscriptions',
      },
      uploads: false,
      bodyParserConfig: {},
      introspection: false
    }),
    ConfigModule.forRoot({
      load: [mainConfiguration]
    }),
    PrismaModule,
    AuthModule,
    ProductModule,
    ReviewModule,
    TopPageModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

