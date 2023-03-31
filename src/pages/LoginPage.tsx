import React, { FC, useState } from 'react';
import {Alert, AlertProps, Snackbar, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setToken, setUserName } from '../services/localStorageService';
import { requestToken } from '../services/AuthService';
import { routes } from '../routes';
import styles from '../styles/LoginPage.module.scss'
import Button from '@mui/material/Button';


const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [snackbar, setSnackbar] = useState<Pick<AlertProps,
    'children' | 'severity'> | null>(null);

  const navigate = useNavigate();
  const showLoaderSnackbar = () => setSnackbar({children:"Loading....", severity:"info"})
  const handleCloseSnackbar = () => setSnackbar(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showLoaderSnackbar();
    const token = await requestToken(username, password);

    if (token) {
      setToken(token);
      setUserName(username);
      navigate(routes.table);
    } else {
      setSnackbar({ children: 'Неверный логин или пароль', severity: 'error' });
    }
  };

  return (
    <div className={styles.wrapper}>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.subtitle}>Для работы с таблицей войдите в свою учетную запись</h2>
        <TextField
          required
          id="outlined-required"
          label="введите имя"
          onChange={e => setUsername(e.target.value)}
          value={username}
          autoFocus={true}
          autoComplete='off'
        />
        <TextField
          required
          id="outlined-password-input"
          label="введите пароль"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          autoComplete='off'
        />
        <Button variant="outlined" type="submit" size="large">
          Войти
        </Button>
      </form>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}
                  sx={{ height: '100%' }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}>
          <Alert {...snackbar} onClose={handleCloseSnackbar}/>
        </Snackbar>
      )}
    </div>

  );
};

export default LoginPage;
