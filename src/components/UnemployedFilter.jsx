import { useUnemployed } from '../store/unemployedStore';

const UnemployedFilter = () => {
  const { isUnemployed, toggleUnemployed } = useUnemployed();

  return (
    <label>
      <input
      type="checkbox"
      checked={isUnemployed}
      onChange={toggleUnemployed}
      />
      Unemployed Only
    </label>
  );
};

export default UnemployedFilter;
