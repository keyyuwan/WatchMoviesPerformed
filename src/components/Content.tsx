import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import { Header } from "./Header";

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    try {
      api
        .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
        .then((response) => {
          setMovies(response.data);
        });
    } catch (err) {
      console.log(err);
    }

    try {
      api
        .get<GenreResponseProps>(`genres/${selectedGenreId}`)
        .then((response) => {
          setSelectedGenre(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header selectedGenreTitle={selectedGenre.title} />

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
