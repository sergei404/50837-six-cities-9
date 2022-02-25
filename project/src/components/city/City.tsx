type CityProps = {
  name: string,
  isActive: boolean
}

function City({name, isActive}: CityProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#s">
        <span>{name}</span>
      </a>
    </li>
  );
}

export default City;
