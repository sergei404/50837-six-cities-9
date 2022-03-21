type CityProps = {
  name: string,
  index: number
  isActive: boolean,
  getName: (name: string) => void
  getActive: (index: number) => void
}

function City({name, index, isActive, getName, getActive}: CityProps): JSX.Element {

  const getActivAndName = () => {
    getName(name);
    getActive(index);
  };

  return (
    <li onClick={getActivAndName} className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#s">
        <span>{name}</span>
      </a>
    </li>
  );
}

export default City;
