'use client'
import useGetScoreBySubject from '@/app/hooks/useGetScoreBySubject'
import { Subject, SubjectColor } from '@/app/utils'
import { Box, Container, Typography, Stack, Paper } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { useEffect, useRef, useState } from 'react'

export default function Score() {
    const [currentSubject, setCurrentSubject] = useState<keyof typeof Subject>('toan');
    const { score, isLoading, error } = useGetScoreBySubject(currentSubject);
    const [containerWidth, setContainerWidth] = useState(400);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (boxRef.current) {
                setContainerWidth(boxRef.current.offsetWidth);
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (boxRef.current) {
            resizeObserver.observe(boxRef.current);
        }

        handleResize();

        return () => {
            if (boxRef.current) {
                resizeObserver.unobserve(boxRef.current);
            }
        };
    }, []);

    const handleOnClick = (subject: keyof typeof Subject) => {
        setCurrentSubject(subject);
    };

    return (
        <Container>
            <div>
                <Typography variant="h1" className="text-4xl font-bold text-center mt-8">
                    Thống kê điểm thi THPT 2024
                </Typography>
            </div>

            <Box
                ref={boxRef}
                component="section"
                sx={{ p: 2, borderRadius: 4, background: 'white', mt: 5, width: '100%' }}
                className="shadow-lg p-10 space-y-5 space-x-10 items-center flex justify-center"
            >
                <Stack spacing={2} width={containerWidth * 0.2}>
                    {
                        Object.keys(Subject).slice(0, -1).map((key) => (
                            <Paper
                                onClick={() => handleOnClick(key as keyof typeof Subject)}
                                elevation={4}
                                key={key}
                                className={`px-5 py-3 cursor-pointer text-center ${SubjectColor[key as keyof typeof SubjectColor]}`}
                            >
                                {Subject[key as keyof typeof Subject]}
                            </Paper>
                        ))
                    }
                </Stack>
                <div className='flex-1 justify-center items-center'>
                    <Typography variant="h5" textAlign={'center'} gutterBottom>Môn {Subject[currentSubject]}</Typography>
                    <BarChart
                        dataset={score}
                        xAxis={[{ scaleType: 'band', dataKey: 'id' }]}
                        series={[
                            { dataKey: 'count' },
                        ]}
                        width={containerWidth * 0.6}
                        height={containerWidth * 0.5}
                        borderRadius={10}
                        sx={{ p: 2 }}
                        loading={isLoading}
                    />
                </div>
            </Box>
        </Container>
    );
}