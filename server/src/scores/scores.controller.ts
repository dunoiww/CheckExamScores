import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
    constructor(private readonly scoresService: ScoresService) {}

    @Get(':sbd')
    async findBySbd(@Param('sbd') sbd: string) {
        try {
            return await this.scoresService.findBySbd(sbd);
        } catch (error) {
            if (error.message === 'Không tìm thấy số báo danh') {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('subject/:subject/sort')
    async sortBySubject(@Param('subject') subject: string) {
        try {
            return await this.scoresService.sortBySubject(subject);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('block/:block')
    async findAllScoresByBlock(@Param('block') block: string) {
        try {
            return await this.scoresService.findAllScoresByBlock(block.split(','));
        } catch (error) {
            console.error('Error in ScoresController.findAllScoresByBlock:', error);
            throw new HttpException('Could not fetch scores by block', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('block/:block/sort')
    async sortByBlock(@Param('block') block: string) {
        try {
            return await this.scoresService.sortByBlock(block);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
