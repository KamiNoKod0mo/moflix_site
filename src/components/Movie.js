
import "./style.css";

import logo from './imgs/image2.png';
import teste from './capas/ointruso.jpg';

import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";


function Movie() {
	//parametro de rota
	//movie/:id
	const { id } = useParams();
	
	//query strings
	//movie?id=1
	// Extrai o ID da query string

	//const location = useLocation();
  //const searchParams = new URLSearchParams(location.search);
  //const id = searchParams.get("id");

	const [filme, setFilme] = useState([]);

  useEffect(() => {
  	setFilme([]);
    // Fazer a requisição GET para o backend
    fetch(`http://192.168.122.250:3002/api/filme/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        return response.json();
      })
      .then((data) => setFilme(data))
      .catch((error) => console.error("Erro ao carregar filme:", error));
  },[]); 

  return (
  	<>
    <header>
		<div class="center">
			<div class="logo">
				<Link to="/"><img src={logo} alt="logo" title="Topflix"/></Link>
			</div>
			<div class="search">
				<form>
					<input type="text" name="search" placeholder="Pesquise por títulos"/>
					<input type="submit" name="submit" value="Pesquisar"/>
				</form>
			</div>

		</div>
	</header>


	<section>
		<div class="center2">
			<div class="infos">
				<div class="text-info">
					<h2>{`${filme.titulo}`}</h2>
					<p>{`${filme.sinopse}`}</p>
				</div>
				
				<div class="banner">
					<img src={`/${filme.capa}`} alt={`Capa de ${filme.titulo}`}/>
				</div>
			</div>
		</div>
	</section>

	<article>
		<div class="center2">
			<div class="player">
				<iframe src={`${filme.url_filme}`} title="bla"></iframe>
			</div>
		</div>
	</article>


	<footer>
		<div class="center">
			<div class="logo2">
				<img src={logo} alt="logo" title="Topflix"/>
			</div>
			<div class="paginas">
				<ul>
					<li><a href="#" id="desc">Navegue</a></li>
					<li><a href="#">Filmes</a></li>
					<li><a href="#">Séries</a></li>
				</ul>
			</div>
			<div class="incricoes">
				<p>Increva-se para atualizações</p>
				<form>
					<input type="email" name="cont" placeholder="Insira seu e-mail"/>
					<input type="submit" name="sub" value="Registrar"/>
				</form>
			</div>
		
			
		</div>
		<div class="text">
				<p>Todos os direitos reservados</p>
		</div>	
	</footer>
	</>
  );
}

export default Movie;