import express from 'express';
import fs from 'fs/promises';

const app = express();
const PORT = 3000;
const FILE_PATH = './anime.json';

// Middleware para manejar JSON
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Obtener todos los animes
app.get('/animes', async (req, res) => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el archivo' });
  }
});

// Obtener un anime por ID o nombre
app.get('/animes/:idOrName', async (req, res) => {
  const { idOrName } = req.params;
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, 'utf-8'));
    const anime = data[idOrName] || Object.values(data).find(a => a.nombre.toLowerCase() === idOrName.toLowerCase());
    if (anime) {
      res.json(anime);
    } else {
      res.status(404).json({ error: 'Anime no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el archivo' });
  }
});

// Crear un nuevo anime
app.post('/animes', async (req, res) => {
  const newAnime = req.body;
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, 'utf-8'));
    const newId = (Object.keys(data).length + 1).toString();
    data[newId] = newAnime;
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
    res.status(201).json({ id: newId, ...newAnime });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el anime' });
  }
});

// Actualizar un anime por ID
app.put('/animes/:id', async (req, res) => {
  const { id } = req.params;
  const updatedAnime = req.body;
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, 'utf-8'));
    if (data[id]) {
      data[id] = { ...data[id], ...updatedAnime };
      await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
      res.json(data[id]);
    } else {
      res.status(404).json({ error: 'Anime no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el anime' });
  }
});

// Eliminar un anime por ID
app.delete('/animes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, 'utf-8'));
    if (data[id]) {
      delete data[id];
      await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
      res.json({ message: 'Anime eliminado' });
    } else {
      res.status(404).json({ error: 'Anime no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el anime' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;