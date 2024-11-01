import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://21522361:WrMNPZZJcWeLn1Iw@scores.dmdl7.mongodb.net/?retryWrites=true&w=majority&appName=scores',
        ),
        ScoresModule,
    ],
})
export class AppModule {}
