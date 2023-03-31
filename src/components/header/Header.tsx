import React, {FC} from 'react';
import {getUserName, setToken, setUserName} from '../../services/localStorageService';
import styles from '../../styles/Header.module.scss'
import {useNavigate} from 'react-router-dom';
import {routes} from '../../routes';
import Button from '@mui/material/Button';

const Header: FC = () => {

    const navigator = useNavigate();

    const handleLogout = () => {
        setUserName('');
        setToken('');
        navigator(routes.login);
    }

    const username = getUserName();

    return (
        <header className={styles.header}>
          <h2><small>Вы вошли как</small> {username}</h2>
            <Button onClick={handleLogout} variant="outlined" type="submit">
                Выйти
            </Button>
        </header>
    )
};

export default Header;
