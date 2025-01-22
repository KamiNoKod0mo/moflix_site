const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3002;

// Configurar CORS para permitir requisições do React
app.use(cors());

// Configurar conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "teste",
  password: "1234", // Altere para a senha do seu banco
  database: "FilmesDB", // Substitua pelo nome do seu banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados!");
});

app.get("/api/filme/:id", (req, res) => {
  const filmeId = parseInt(req.params.id); // Obtém o id do filme da URL

  // Função auxiliar para realizar a consulta de forma assíncrona
  const fetchFilm = (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM filmes WHERE id = ?`; // Utilizando ? para evitar SQL injection
      db.query(query, [id], (err, result) => {
        if (err) {
          reject("Erro ao buscar filme com id " + id);
        } else {
          // Verifica se o filme foi encontrado
          if (result.length === 0) {
            reject("Filme não encontrado"); // Caso não encontre, rejeita com erro
          } else {
            resolve(result[0]); // Retorna o único filme encontrado
          }
        }
      });
    });
  };

  // Chama a função para pegar os dados do filme e retorna a resposta
  fetchFilm(filmeId)
    .then((film) => {
      res.json(film); // Retorna o filme encontrado
    })
    .catch((error) => {
      console.error(error);
      res.status(404).json({ error: "Filme não encontrado" }); // Retorna erro 404 se não encontrar o filme
    });
});




// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
