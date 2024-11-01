import { useQuery } from "@tanstack/react-query"
import { getScores } from "../controllers/ScoreController"

const useGetScore = (sbd: string) => {
    const { data: score, isLoading, error, refetch } = useQuery({
        queryKey: ["score", sbd],
        queryFn: () => getScores(sbd),
        retry: 2
    })

    return { score: score || [], isLoading, error, refetch }
}

export default useGetScore