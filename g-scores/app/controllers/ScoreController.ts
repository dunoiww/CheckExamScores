import axios from 'axios';

const url = 'http://localhost:3001';

const getScores = async (sbd: string) => {
    try {
        const response = await axios.get(`${url}/scores/${sbd}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

const getScoresBySubject = async (subject: string) => {
    try {
        const response = await axios.get(`${url}/scores/subject/${subject}/sort`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

const getTop10Scores = async (block: string) => {
    try {
        const response = await axios.get(`${url}/scores/block/${block}/sort`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

export {
    getScores, getScoresBySubject, getTop10Scores
}