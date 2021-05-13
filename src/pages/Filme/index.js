import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./filme-info.css";
import "../../services/api";
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams("id");
  const history = useHistory();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilme = async () => {
      const response = await api.get(`r-api/?api=filmes/${id}`);
      if (response.data.length === 0) {
        history.replace("/");
        return;
      }
      setFilme(response.data);
      setLoading(false);
    };
    loadFilme();
  }, [id, history]);

  function salvaFilme() {
    const minhaLista = localStorage.getItem("filmes");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.info("Esse filme já esta salvo")
      return;
    } else {
      filmesSalvos.push(filme);
      localStorage.setItem("filmes", JSON.stringify(filmesSalvos));
      toast.success("Filme Salvo Com sucesso");
    }
  }

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome} />
      <h3>Sinopse</h3>
      {filme.sinopse}
      <div className="botoes">
        <button onClick={() => salvaFilme()}>Salvar</button>
        <button>
          <a
            target="blank"
            href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
