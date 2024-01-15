import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const theme = createTheme({
  palette: {
    background: {
      default: '#d4c4b9', // 여기에 전체 배경 색상을 설정합니다.
    },
  },
});

const Login = ({ onLoginSuccess }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [id, setID] = useState('');
  const [loginAttemptCount, setLoginAttemptCount] = useState(0);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredID = e.target.id.value;
    setID(enteredID);
    const enteredPassword = e.target.pw.value;

    try {
      const response = await fetch(
        `http://localhost:3001/api/login?id=${encodeURIComponent(
          enteredID
        )}&password=${encodeURIComponent(enteredPassword)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.responseData);
      setIsSuccess(parsedData);
      setID(id);
      setLoginAttemptCount((prevCount) => prevCount + 1);

      if (parsedData) {
        onLoginSuccess(enteredID);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'sandybrown' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pw"
              label="Password"
              type="password"
              id="pw"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'saddlebrown',}}>
              로그인
            </Button>
          </Box>
          {isSuccess ? (
            <Typography variant="body2" color="success.main">
              로그인에 성공했습니다.
            </Typography>
          ) : (
            <Typography variant="body2" color="error.main">
              {loginAttemptCount === 0 ? '' : '로그인에 실패했습니다.'}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;