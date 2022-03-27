type CityProps = {
  name: string
  isActive: boolean,
  getName: (name: string) => void
}

function City({name, isActive, getName}: CityProps): JSX.Element {

  const getActivAndName = () => {
    getName(name);
    //getActive(index);
  };//onClick={getActivAndName}

  return (
    <li onClick={getActivAndName} className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#s">
        <span>{name}</span>
      </a>
    </li>
  );
}

export default City;
