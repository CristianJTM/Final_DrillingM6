Rutas
1. Rutas Principales
GET /
Devuelve un mensaje indicando que el servidor está funcionando.
Respuesta:

json
Copiar código
"¡Servidor funcionando correctamente!"
GET /animes
Devuelve la lista completa de animes.

GET /animes/:idOrName
Busca un anime por ID o nombre.

POST /animes
Crea un nuevo anime.
Formato del cuerpo (JSON):

json
Copiar código
{
  "nombre": "Nombre del anime",
  "género": "Género",
  "año": 2000
}
PUT /animes/:id
Actualiza un anime por ID.

DELETE /animes/:id
Elimina un anime por ID.
