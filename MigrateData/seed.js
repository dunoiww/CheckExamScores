const fs = require('fs')
const csv = require('csv-parser')
const connectDB = require('./config/db')
const scoreSchema = require('./models/Score')

async function seedData() {
    await connectDB()

    const scores = []

    fs.createReadStream('diem_thi_thpt_2024.csv')
    .pipe(csv())
    .on('data', (row) => {
        scores.push(row)
    })
    .on('end', async () => {
        console.log(scores)
        try {
            await scoreSchema.deleteMany({});
            
            await scoreSchema.insertMany(scores)
            console.log('Data import success')
        } catch (error) {
            console.log(error)
        } finally {
            process.exit();
        }
    })
}

seedData().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});