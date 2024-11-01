'use client';
import { Numbers } from '@mui/icons-material';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Score from './components/Score/Score';
import Toast from './components/Toast/Toast';
import useGetScore from './hooks/useGetScore';
import { Subject } from './utils';

export default function Home() {
    const [sbd, setSbd] = useState('')
    const [data, setData] = useState<[string, unknown][]>([])
    const { score, error, refetch } = useGetScore(sbd)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSbd(event.target.value)
    }

    const handleSubmit = () => {
        refetch()

        if (error) {
            Toast(error.message)
        }

        if (score && score.length > 0) {
            setData(Object.entries(score[0]))
        }
    }

    return (
        <Container>
            <div className="p-5">
                <h1 className="text-4xl font-bold text-center mt-8">Tra cứu điểm thi THPT 2024</h1>
            </div>

            <Box
                component="section"
                sx={{ p: 2, borderRadius: 4, background: 'white' }}
                className="shadow-lg items-end p-10 space-y-5"
            >
                <div>
                    <p className="font-semibold text-lg">Nhập số báo danh của thí sinh</p>
                </div>

                <div className="flex space-x-10">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Numbers sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-with-sx" label="Số báo danh" variant="standard" value={sbd} onChange={handleInputChange}/>
                    </Box>

                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                        Tra cứu
                    </Button>
                </div>
            </Box>

            <Box sx={{mt: 5}}>
                <Typography variant="h5" gutterBottom>
                    Kết quả của thí sinh
                </Typography>

                <Grid container spacing={3}>
                    {
                        data.map(([title, score]) => (
                            <Score key={title} title={title as keyof typeof Subject} score={score as string} />
                        ))
                    }
                </Grid>
            </Box>
            <ToastContainer />
        </Container>
    )
}
