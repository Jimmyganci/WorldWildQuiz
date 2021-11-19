import PropTypes from 'prop-types';
import MemoryCard from './MemoryCard';
import './memoryGrid.css';

const MemoryGrid = ({
  flagArray2,
  visibleItems,
  finishedItems,
  setVisibleItems,
  checkItems,
  setStartTimer,
}) => {
  return (
    <div>
      <div
        className={`flagsCardsContainer ${
          flagArray2.length <= 12 ? 'gridEasy' : 'gridMedium'
        }`}
      >
        {flagArray2.map((country, index) => (
          <MemoryCard
            country={country}
            className={`containerImagesMemory ${
              visibleItems.includes(index) ? 'activeFlagCard' : ''
            } ${finishedItems.includes(index) ? 'activeFlagCard' : ''}`}
            onClick={() => {
              setStartTimer(true);
              if (!finishedItems.includes(index)) {
                switch (visibleItems.length) {
                  case 0:
                    setVisibleItems([index]);
                    break;
                  case 1:
                    if (visibleItems[0] !== index) {
                      setVisibleItems(visibleItems.concat(index));
                      checkItems(visibleItems[0], index);
                    }
                    break;
                  case 2:
                    setVisibleItems([index]);
                    break;
                  default:
                    setVisibleItems([]);
                }
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

MemoryGrid.propTypes = {
  flagArray2: PropTypes.arrayOf(PropTypes.object).isRequired,
  visibleItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  finishedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setVisibleItems: PropTypes.func.isRequired,
  setStartTimer: PropTypes.func.isRequired,
  checkItems: PropTypes.func.isRequired,
};

export default MemoryGrid;
