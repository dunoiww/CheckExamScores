import { useQuery } from "@tanstack/react-query"
import { getScoresBySubject } from "../controllers/ScoreController"

const useGetScoreBySubject = (subject: string) => {
    const { data: score, isLoading, error, refetch } = useQuery({
        queryKey: ["score-subject", subject],
        queryFn: () => getScoresBySubject(subject),
        retry: 2
    })

    return { score: score || [], isLoading, error, refetch }
}

export default useGetScoreBySubject