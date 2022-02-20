import Main from '../main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingIn from '../sing_in/SingIn';
import Favorites from '../favorites/Favorites';
import Property from '../property/Property';
import NotFound from '../not_found/NotFound';
import PrivateRoute from '../private_route/PrivateRoute';

type AppProps = {
  cityList: Array<string>;
};

function App({ cityList }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main cityList={cityList} />} />
        <Route path="/login" element={<SingIn />} />
        <Route path="/favorites" element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route path="/offer/:id" element={<Property />} >
          <Route path=":id" element={<Property />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
