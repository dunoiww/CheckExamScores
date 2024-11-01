import { useQuery } from "@tanstack/react-query"
import { getTop10Scores } from "../controllers/ScoreController"

const useGetTopScores = (block: string) => {
    const { data: score, isLoading, error } = useQuery({
        queryKey: ["score-block", block],
        queryFn: () => getTop10Scores(block),
        retry: 2
    })

    return { score: score || [], isLoading, error }
}

export default useGetTopScores