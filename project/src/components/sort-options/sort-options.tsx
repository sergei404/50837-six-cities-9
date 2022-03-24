import { useState } from 'react';

type SortOptionsProps = {
  getFilter: (name: string) => void
}

function SortOptions({getFilter}: SortOptionsProps): JSX.Element {
  const [sotrName, setSortName] = useState('Popular');
  const [showSelect, setShowSelect] = useState(false);

  const sortValues: string[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

  const getValue = (value: string): void => {
    getFilter(value);
    setSortName(value);
  };

  const listSortValue = sortValues.map((value) => <li key={value} onClick={() => getValue(value)} className={sotrName === value ? 'places__option places__option--active' : 'places__option'} tabIndex={0}>{value}</li>);

  function getShowSelect(): void {
    setShowSelect(!showSelect);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" onClick={getShowSelect} tabIndex={0}>
        {sotrName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {showSelect &&listSortValue}
      </ul>
    </form>
  );
}

export default SortOptions;
