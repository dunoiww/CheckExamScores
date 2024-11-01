import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Score extends Document {
    @Prop({ required: false })
    toan: number;

    @Prop({ required: false })
    ngu_van: number;

    @Prop({ required: false })
    ngoai_ngu: number;

    @Prop({ required: false })
    vat_li: number;

    @Prop({ required: false })
    hoa_hoc: number;

    @Prop({ required: false })
    sinh_hoc: number;

    @Prop({ required: false })
    lich_su: number;

    @Prop({ required: false })
    dia_li: number;

    @Prop({ required: false })
    gdcd: number;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
