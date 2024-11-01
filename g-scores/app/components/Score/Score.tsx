import { Subject } from '@/app/utils'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

interface ScoreProps {
    title: keyof typeof Subject;
    score: string;
}

export default function Score({ title, score }: ScoreProps) {
    return (
        <Grid size={{ xs: 12, md: 4, lg: 2 }}>
            <Card
                className="rounded-md shadow-md"
                sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
            >
                <CardHeader title={Subject[title]} sx={{ color: 'red', p: 1, textAlign: 'center' }} />
                <CardContent sx={{ pb: 0, textAlign: 'center' }}>
                    <Typography variant="body2" fontSize={20}>
                        {score || 0}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
