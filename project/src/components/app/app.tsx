/* eslint-disable react/no-unused-prop-types */
import Main from '../main/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingIn from '../sing-in/sing-in';
import Favorites from '../favorites/favorites';
import Property from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { offerType } from '../../types/offerType';

type AppProps = {
  offerList: offerType[]
};

function App(props: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main {...props} />} /> */}
          <Route index element={<Main/>} />
          <Route path="favorites" element={
            <PrivateRoute>
              <Favorites/>
              {/* <Favorites offerList={props.offerList} /> */}
            </PrivateRoute>
          }
          />
          <Route path="offer/:id" element={<Property offerList={props.offerList} />} />
          {/* <Route path=":id" element={<Property/>} />
          </Route> */}
        </Route>
        <Route path="login" element={<SingIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
