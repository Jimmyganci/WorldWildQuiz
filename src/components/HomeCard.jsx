import PropTypes from 'prop-types';
import './homecard.css';
import '../gameType';

const HomeCard = ({ gameType }) => {
  return (
    <div className="homecard">
      <h2>{gameType.name}</h2>
      <img src={gameType.image} alt={gameType.name} />
    </div>
  );
};

HomeCard.propTypes = {
  gameType: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default HomeCard;
