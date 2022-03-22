import {SyntheticEvent} from 'react';

type SortOptionsProps = {
  getFilter: (name: string) => void
}

function SortOptions({getFilter}: SortOptionsProps): JSX.Element {
  const getValue = (event: SyntheticEvent): void => {
    getFilter(event.target.textContent);
  };

  return (
    <form onClick={getValue} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex={0}>Popular</li>
        <li className="places__option" tabIndex={0}>Price: low to high</li>
        <li className="places__option" tabIndex={0}>Price: high to low</li>
        <li className="places__option" tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}

export default SortOptions;
