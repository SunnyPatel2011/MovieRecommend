import React from 'react';
import '../css/Stars.css';

const MovieOverview = ({ overview, rating }) => {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<span key={i} className="star filled">★</span>);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                const fractionalPart = rating % 1;
                stars.push(
                    <span
                        key={i}
                        className="star"
                        style={{
                            background: `linear-gradient(90deg, #f5c518 ${fractionalPart * 100}%, #ccc ${fractionalPart * 100}%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        ★
                    </span>
                );
            } else {
                stars.push(<span key={i} className="star">★</span>);
            }
        }
        return stars;
    };

    return (
        < div className="movie-overview">
            <h3>Rating</h3>
           {renderStars(rating / 2)}
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rating}          
            <h3 className='movie-synopsis'>Synopsis</h3>
            <p>{overview}</p>
        </div>
    );
};

export default MovieOverview;
