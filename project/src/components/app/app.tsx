import Main from '../main/Main';

type AppProps = {
  cityList: Array<string>;
};

function App({cityList}: AppProps): JSX.Element {
  return <Main cityList={cityList} />;
}

export default App;
