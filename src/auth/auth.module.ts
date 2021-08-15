import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {getJWTConfig} from 'src/config/jwt.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import {AuthResolver} from './auth.resolver';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UserEntity} from './user.entity';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}