import axios from "../api/axios";
import { useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "../MovieModal";

const Row = (props) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(props.fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{props.title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(props.id).scrollLeft -=
                window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={props.id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${
                props.isLargeRow && "row__posterLarge"
              }`}
              src={`https://image.tmdb.org/t/p/original/${
                props.isLargeRow ? movie.poster_path : movie.backdrop_path
              } `}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(props.id).scrollLeft +=
                window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default Row;
