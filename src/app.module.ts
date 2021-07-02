/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ProductsModule, MongooseModule.forRoot(process.env.MONGODBLINK), ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
