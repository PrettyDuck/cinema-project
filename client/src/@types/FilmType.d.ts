declare type FilmType = {
    id: number;
    name: string;
    year: number;
    filmDirector: string;
    filmDescription: string;
    averageRating: number;
    coverImage: string;
    categories: CategoryType[];
    actors: ActorType[];
  };