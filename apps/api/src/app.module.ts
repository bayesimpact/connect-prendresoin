import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrendresoinModule } from './prendresoin/prendresoin.module';

@Module({
  imports: [ConfigModule.forRoot(), PrendresoinModule],
})
export class AppModule {}
