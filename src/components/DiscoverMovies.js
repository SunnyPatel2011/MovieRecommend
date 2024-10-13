
import React from 'react';
import { useParams } from 'react-router-dom';
import PaginatedMovies from '../components/PaginatedMovies';
import { Helmet } from 'react-helmet';

const DiscoverMovies = () => {
  const { type } = useParams();
  const titleMap = {
    popular: 'POPULAR',
    top_rated: 'TOP RATED',
    upcoming: 'UPCOMING',
  };
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  

  return (<>
   <Helmet>
        <title>{toTitleCase(titleMap[type]) } Movies</title>
        <meta name="description" content="This is my React application" />
        <meta property="og:title" content="Movie Clone" />
        <meta property="og:description" content="This is my React application" />
      </Helmet>
      <PaginatedMovies
        fetchUrl={`https://api.themoviedb.org/3/movie/${type}`}
        title={titleMap[type] }
      />
  </>
  );
};

export default DiscoverMovies;
