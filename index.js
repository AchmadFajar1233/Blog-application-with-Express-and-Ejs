import express from 'express'
import bodyParser from 'body-parser'

const port = 5000
const app = express()

let arr = []

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.render('index.ejs', {data: arr})
})
app.post('/', (req, res) => {
    let { title, body } = req.body
    const date = new Date().toDateString()
    const id = Date.now()
    const data = {
        title: title,
        body: body,
        date: date,
        id: id
    }
    arr.push(data)
    res.redirect('/')
    console.log(arr)
})
app.get('/article', (req, res) => {
    res.render('article.ejs')
})
app.get('/edit/:id', (req, res) => {
    const data = arr.find((p) => p.id === parseInt(req.params.id))
    data ? res.render('edit.ejs', {data: data}) : res.redirect('/')
})
app.post('/edit/:id', (req, res) => {
    const { title, body } = req.body
    const postIndex = arr.findIndex((p) => p.id === parseInt(req.params.id))
    if (postIndex !== -1 && title && body){
        arr[postIndex] = { ...arr[postIndex], title, body }
    }
    res.redirect('/')
})
app.post('/delete/:id', (req, res) => {
    arr = arr.filter((p) => p.id !== parseInt(req.params.id))
    res.redirect('/')
})
app.get('/article/:id', (req, res) => {
    const article = arr.find((p) => p.id === parseInt(req.params.id))
    article ? res.render('post.ejs', { data: article }) : res.redirect('/')
})
app.listen(port, () => {
    console.log('server dijalankan pada port ' + port)
})

