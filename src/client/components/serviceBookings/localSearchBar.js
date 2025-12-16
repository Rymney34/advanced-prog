const LocalSearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search bookings..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: 8,
        borderRadius: 8,
        width: 250
      }}
    />
  );
};

export default LocalSearchBar;