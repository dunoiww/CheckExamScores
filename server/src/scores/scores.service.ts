import { Injectable } from '@nestjs/common';
import { ScoreRepository } from './scores.repository';

@Injectable()
export class ScoresService {
    constructor(private readonly scoreRepository: ScoreRepository) {}

    async findBySbd(sbd: string) {
        try {
            return await this.scoreRepository.findBySbd(sbd);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async sortBySubject(subject: string) {
        try {
            return await this.scoreRepository.sortBySubject(subject);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findAllScoresByBlock(block: string[]) {
        try {
            return await this.scoreRepository.findAllScoresByBlock(block);
        } catch (error) {
            console.error('Error in ScoresService.findAllScoresByBlock:', error);
            throw new Error('Could not fetch scores by block');
        }
    }

    async sortByBlock(block: string) {
        try {
            return await this.scoreRepository.sortByBlock(block);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
