import { Link } from 'react-router-dom';

type CityProps = {
  name: string
  isActive: boolean,
  getName: (name: string) => void
}

function City({name, isActive, getName}: CityProps): JSX.Element {

  const getActivAndName = () => {
    getName(name);
  };

  return (
    <li onClick={getActivAndName} className="locations__item">
      <Link className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} to={'/'}>
        <span>{name}</span>
      </Link>
    </li>
  );
}

export default City;
