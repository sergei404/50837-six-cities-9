import Main from '../main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingIn from '../sing_in/SingIn';
import Favorites from '../favorites/Favorites';
import Property from '../property/Property';
import NotFound from '../not_found/NotFound';
import PrivateRoute from '../private_route/PrivateRoute';
import Layout from '../layout/Layout';

type AppProps = {
  cityList: Array<string>;
};

function App({ cityList }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main cityList={cityList} />} />
          <Route path="favorites" element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path="offer" element={<Property />} >
            <Route path=":id" element={<Property />} />
          </Route>
        </Route>
        <Route path="login" element={<SingIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
