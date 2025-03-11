import express from 'express'
import cors from 'cors'
import exec from 'youtube-dl-exec'
import dotenv from 'dotenv' 

dotenv.config()


const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res) =>
{
    res.send("O servidor está rodando")
})

app.post("/download", async (req,res) => {
    const { url } = req.body

    if (!url) return res.status(400).json({error: "URL é obrigatória!"})

    try {
        const info = await exec(url, {
            dumpJson: true,
        })

        res.json({
            title: info.title,
            formats: info.formats.map((format) => ({
                quality: format.format_note,
                url: format.url,
            }))
        })
    } catch (error) {
        res.status(500).json({error: "Erro ao processar o video"})
    }   
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Servidor Ligado!"))