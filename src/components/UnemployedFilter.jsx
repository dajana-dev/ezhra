import { useUnemployed } from '../store/unemployedStore';
import '../styles/UnemployedFilter.scss';

const UnemployedFilter = () => {
  const { isUnemployed, toggleUnemployed } = useUnemployed();

  return (
    <label className='unemployed-filter'>
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
