import PropTypes from "prop-types";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  return (
    <div className="location-search-panel max-h-[60vh] overflow-y-auto">
      <ul className="space-y-2">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.place_id}
            onClick={() => {
              if (activeField === "pickup") {
                setPickup(suggestion.description);
              } else {
                setDestination(suggestion.description);
              }
            }}
            className="flex gap-4 border-2 p-3 border-gray-100 hover:border-black rounded-xl items-center cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{suggestion.description}</h4>
          </div>
        ))}
      </ul>
    </div>
  );
};

LocationSearchPanel.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      place_id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPickup: PropTypes.func.isRequired,
  setDestination: PropTypes.func.isRequired,
  activeField: PropTypes.string.isRequired,
};

export default LocationSearchPanel;
