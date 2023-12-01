const express = require('express')
const fs = require('fs');

const app = express()

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const API_FILE_PATH = 'notes.json'

app.get('/api/notes', (req, res) =>{
    fs.readFile(API_FILE_PATH, (error, file)=>{
        if (error) {
            console.log("No se puede leer el archivo", error);
        }

        const notes = JSON.parse(file);  
        return res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    fs.readFile(API_FILE_PATH ,(error, file)=>{
        if (error) {
            console.log("No se puede leer el archivo", error);
        }

        const notes = JSON.parse(file);  
        const note = notes.find(note => String(note.id) === id)
        if (note) {
            return res.json(note)
        } else {
            return res.status(404).end()
        }
    })
})

app.get('/', (request, response) => {
    response.send('<h1>API</h1><ul><li><a href="/api/notes">API</a></li></ul>')
})