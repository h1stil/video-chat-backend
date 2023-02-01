import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pgAdmin',
      database: 'video-chat',
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
