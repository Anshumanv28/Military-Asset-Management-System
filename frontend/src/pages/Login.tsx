import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext.tsx';

const adminCredentials = { email: 'admin@military.gov', password: 'admin123', role: 'Admin' };
const commanderCredentials = [
  { username: 'price', email: 'price@military.gov', password: 'password123', role: 'Base Commander', base: 'Fort Bragg' },
  { username: 'soap', email: 'soap@military.gov', password: 'password123', role: 'Base Commander', base: 'Camp Pendleton' },
  { username: 'ghost', email: 'ghost@military.gov', password: 'password123', role: 'Base Commander', base: 'Fort Hood' },
  { username: 'gaz', email: 'gaz@military.gov', password: 'password123', role: 'Base Commander', base: 'Joint Base Lewis-McChord' },
];
const logisticsCredentials = [
  { username: 'laswell', email: 'laswell@military.gov', password: 'password123', role: 'Logistics Officer', base: 'Fort Bragg' },
  { username: 'farah', email: 'farah@military.gov', password: 'password123', role: 'Logistics Officer', base: 'Camp Pendleton' },
  { username: 'alex', email: 'alex@military.gov', password: 'password123', role: 'Logistics Officer', base: 'Fort Hood' },
  { username: 'nikto', email: 'nikto@military.gov', password: 'password123', role: 'Logistics Officer', base: 'Joint Base Lewis-McChord' },
];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <SecurityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                Military Assets
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Asset Management System
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading || !email || !password}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Box>

            <Box mt={4}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Demo Login Credentials</Typography>
                <Typography variant="subtitle1">Admin:</Typography>
                <ul>
                  <li><b>{adminCredentials.role}</b>: {adminCredentials.email} / {adminCredentials.password}</li>
                </ul>
                <Typography variant="subtitle1">Base Commanders:</Typography>
                <ul>
                  {commanderCredentials.map((cred, idx) => (
                    <li key={idx}><b>{cred.username}</b> ({cred.base}): {cred.email} / {cred.password}</li>
                  ))}
                </ul>
                <Typography variant="subtitle1">Logistics Officers:</Typography>
                <ul>
                  {logisticsCredentials.map((cred, idx) => (
                    <li key={idx}><b>{cred.username}</b> ({cred.base}): {cred.email} / {cred.password}</li>
                  ))}
                </ul>
              </Paper>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login; 