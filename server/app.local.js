const app = require('./auth.app')
const port = process.env.PORT ?? 8000


app.get('/', (req, res) => res.send('Hello!'))

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
