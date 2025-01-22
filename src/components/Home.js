import "./style.css";
import logo from './imgs/image2.png';
import nextpage from './imgs/nextpage.png';
import backpage from './imgs/backpage.png';
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home() {
  const location = useLocation();

  // Obtém o número da página atual
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // Total de páginas
  const totalPages = 7;

  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
  	setFilmes([]);
    // Fazer a requisição GET para o backend
    fetch(`http://192.168.122.250:3001/api/filmes/${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        return response.json();
      })
      .then((data) => setFilmes(data))
      .catch((error) => console.error("Erro ao carregar filmes:", error));
  }, [currentPage]);  // O efeito será executado quando currentPage mudar

  return (
    <>
      <header>
        <div className="center">
          <div className="logo">
            <Link to="/"><img src={logo} alt="logo" title="Topflix" /></Link>
          </div>
          <div className="search">
            <form>
              <input type="text" name="search" placeholder="Pesquise por títulos" />
              <input type="submit" name="submit" value="Pesquisar" />
            </form>
          </div>
        </div>
      </header>

      <section>
        <div className="center">
          {filmes.map((filme) => (
            <div className="single" key={filme.id}>
              <Link to={`/movie/${filme.id}`}>
                <img
                  src={filme.capa || "default-image.jpg"} // Mostra imagem padrão se `capa` for nula
                  alt={`Capa de ${filme.titulo}`}
                />
              </Link>
              <p>{filme.titulo}</p>
            </div>
          ))}
        </div>
      </section>

      <nav>
        <div className="center">
          <div className="page-num">
            <ul>
              <li><Link to={`/?page=${Math.max(currentPage - 1, 1)}`}><img src={backpage} alt="Previous" /></Link></li>
              {/* Para as páginas 1 até 7 */}
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <Link to={`/?page=${index + 1}`}>{index + 1}</Link>
                </li>
              ))}
              <li><Link to={`/?page=${Math.min(currentPage + 1, totalPages)}`}><img src={nextpage} alt="Next" /></Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <footer>
        <div className="center">
          <div className="logo2">
            <Link to="/"><img src={logo} alt="logo" title="Topflix" /></Link>
          </div>
          <div className="paginas">
            <ul>
              <li><a href="#" id="desc">Navegue</a></li>
              <li><a href="#">Filmes</a></li>
              <li><a href="#">Séries</a></li>
            </ul>
          </div>
          <div className="incricoes">
            <p>Inscreva-se para atualizações</p>
            <form>
              <input type="email" name="cont" placeholder="Insira seu e-mail" />
              <input type="submit" name="sub" value="Registrar" />
            </form>
          </div>
        </div>
        <div className="text">
          <p>Todos os direitos reservados</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
