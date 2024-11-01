import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './scores.schema';
import { ScoreRepository } from './scores.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }])],
    providers: [ScoresService, ScoreRepository],
    controllers: [ScoresController],
})
export class ScoresModule {}
