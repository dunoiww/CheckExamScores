'use client'
import useGetTopScores from '@/app/hooks/useGetTopScores'
import { HighScore } from '@/app/types/score'
import { Block } from '@/app/utils'
import styled from '@emotion/styled'
import {
    Box,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default function Score() {
    const [currentBlock, setCurrentBlock] = useState<keyof typeof Block>('A')
    const { score, isLoading, error } = useGetTopScores(currentBlock)
    const [containerWidth, setContainerWidth] = useState(400)
    const boxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (boxRef.current) {
                setContainerWidth(boxRef.current.offsetWidth)
            }
        }

        const resizeObserver = new ResizeObserver(handleResize)
        if (boxRef.current) {
            resizeObserver.observe(boxRef.current)
        }

        handleResize()

        return () => {
            if (boxRef.current) {
                resizeObserver.unobserve(boxRef.current)
            }
        }
    }, [])

    const handleOnClick = (block: keyof typeof Block) => {
        setCurrentBlock(block)
    }

    return (
        <Container>
            <div>
                <Typography variant="h1" className="text-4xl font-bold text-center mt-8">
                    Top 10 học sinh có điểm cao nhất
                </Typography>
            </div>

            <Box
                ref={boxRef}
                component="section"
                sx={{ p: 2, borderRadius: 4, background: 'white', mt: 5, width: '100%' }}
                className="shadow-lg p-10 space-y-5 space-x-10 items-center flex justify-center"
            >
                <Stack spacing={2} width={containerWidth * 0.2}>
                    {Object.keys(Block).map((key) => (
                        <Paper
                            onClick={() => handleOnClick(key as keyof typeof Block)}
                            elevation={4}
                            key={key}
                            className={`px-5 py-3 cursor-pointer text-center`}
                        >
                            {Block[key as keyof typeof Block]}
                        </Paper>
                    ))}
                </Stack>
                <div className="flex-1 justify-center items-center">
                    <Typography variant="h5" textAlign={'center'} gutterBottom>
                        Khối {Block[currentBlock]}
                    </Typography>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>Số báo danh</StyledTableCell>
                                        <StyledTableCell align='center'>Tổng điểm</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {score.map((row: HighScore) => (
                                        <StyledTableRow key={row.sbd}>
                                            <StyledTableCell align='center'>{row.sbd}</StyledTableCell>
                                            <StyledTableCell align='center'>{row.score}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </Box>
        </Container>
    )
}