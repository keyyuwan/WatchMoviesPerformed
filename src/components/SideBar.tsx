import { useEffect, useState } from "react";
import { GenreResponseProps } from "./Content";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  selectedGenreId: number;
  buttonClickCallback: (id: number) => void;
}

export function SideBar({
  selectedGenreId,
  buttonClickCallback,
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    try {
      api.get<GenreResponseProps[]>("genres").then((response) => {
        setGenres(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
