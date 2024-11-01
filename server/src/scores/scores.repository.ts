import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './scores.schema';
import { Model } from 'mongoose';
import { Blocks } from 'src/utils';

@Injectable()
export class ScoreRepository {
    constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

    async findBySbd(sbd: string): Promise<Score[]> {
        try {
            const result = await this.scoreModel.aggregate([
                { $match: { sbd } },
                { $project: { _id: 0, sbd: 0, __v: 0 } },
            ]);
            if (result.length === 0) {
                throw new Error('Không tìm thấy số báo danh');
            }
            return result;
        } catch (error) {
            if (error.message === 'Không tìm thấy số báo danh') {
                throw new Error(error.message);
            }
            throw new Error('Lỗi khi tìm kiếm');
        }
    }

    async sortBySubject(subject: string): Promise<{ id: string; count: number }[]> {
        try {
            const results = await this.scoreModel.aggregate([
                { $match: { [subject]: { $exists: true } } },
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $gte: [`$${subject}`, 8] },
                                '>=8',
                                {
                                    $cond: [
                                        { $gte: [`$${subject}`, 6] },
                                        '6-8',
                                        {
                                            $cond: [{ $gte: [`$${subject}`, 4] }, '4-6', '<4'],
                                        },
                                    ],
                                },
                            ],
                        },
                        count: { $sum: 1 },
                    },
                },
            ]);

            const counts = {
                '<4': 0,
                '4-6': 0,
                '6-8': 0,
                '>=8': 0,
            };

            results.forEach((result) => {
                counts[result._id] = result.count;
            });

            return [
                { id: '<4', count: counts['<4'] },
                { id: '4-6', count: counts['4-6'] },
                { id: '6-8', count: counts['6-8'] },
                { id: '>=8', count: counts['>=8'] },
            ];
        } catch (error) {
            console.log('Error in sortBySubject:', error);
            throw new Error('Lỗi khi sắp xếp');
        }
    }

    async findAllScoresByBlock(block: string[]): Promise<{ sbd: string; score: number }[]> {
        try {
            await this.scoreModel.createIndexes(
                block.reduce((indexes, subject) => {
                    indexes[subject] = 1;
                    return indexes;
                }, {}),
            );

            const scores = await this.scoreModel
                .aggregate([
                    {
                        $match: {
                            $and: block.map((subject) => ({
                                [subject]: { $exists: true },
                            })),
                        },
                    },
                    {
                        $project: {
                            sbd: 1,
                            score: {
                                $add: block.map((subject) => ({
                                    $ifNull: [`$${subject}`, 0],
                                })),
                            },
                        },
                    },
                    {
                        $sort: { score: -1 },
                    },
                    {
                        $limit: 10,
                    },
                ])
                .exec();

            return scores;
        } catch (error) {
            console.error('Error in findAllScoresByBlock:', error);
            throw new Error('Could not fetch scores by block');
        }
    }

    async sortByBlock(block: string): Promise<{ sbd: string; score: number }[]> {
        try {
            const realBlock = Blocks[block].split(' ');
            return await this.findAllScoresByBlock(realBlock);
        } catch (error) {
            console.error('Error in sortByBlock:', error);
            throw new Error('Lỗi khi sắp xếp theo khối');
        }
    }
}
