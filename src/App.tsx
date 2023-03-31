import React, {FC} from 'react';
import LoginPage from "./pages/LoginPage";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import TablePage from './pages/TablePage';
import {routes} from './routes';
import './styles/app.scss';


const App: FC = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path={routes.login} element={<LoginPage />}/>
                <Route path={routes.table} element={<TablePage />}/>
                <Route path='*' element={<Navigate to={routes.table} />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
