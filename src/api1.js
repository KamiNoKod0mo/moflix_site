const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3001;

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

// Endpoint para buscar todos os filmes
app.get("/api/filmes/:npage", (req, res) => {
  const results = []; // Array para armazenar todos os resultados
  const npage = parseInt(req.params.npage); // Pega o parâmetro npage e converte para número


  // Função auxiliar para realizar a consulta de forma assíncrona
  const fetchFilm = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM filmes WHERE id = ${id}`;
    db.query(query, (err, result) => {
      if (err) {
        reject("Erro ao buscar filme com id " + id);
      } else {
        // Se não encontrar nenhum filme, retorna uma linha manual com dados padrão do BD
        if (result.length === 0) {
          resolve([{
            id: 10000, // ID padrão
            titulo: "titulo", // Título padrão
            sinopse: "sinopse", // Sinopse padrão
            capa: "capas/rectangle5.png", // Capa padrão
            url_filme: "https://embed.embedplayer.site/" // URL padrão
          }]);
        } else {
          resolve(result);
        }
      }
    });
  });
};


  // Criar um array de promessas para todas as consultas
  const promises = [];
  const filmesPorPagina = 20;
  const offset = filmesPorPagina * (npage - 1); // Deslocamento para pegar os filmes da página correta

  //console.log(totalFilmes);
  for (let i = offset + 1; i <= offset + filmesPorPagina; i++) {
    console.log(i);
    promises.push(fetchFilm(i));
  } 

  // Usar Promise.all para aguardar todas as consultas
  Promise.all(promises)
    .then((allResults) => {
      // Concatenar todos os resultados em um único array
      const combinedResults = allResults.flat();
      res.json(combinedResults); // Retornar todos os resultados juntos
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar filmes" });
    });
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
