import postgres from 'postgres';

const connectionString = process.env['DATABASE_URL']!;

// Enhanced configuration for Supabase Session Pooler
const sql = postgres(connectionString, {
  // SSL configuration for Supabase pooler
  ssl: {
    rejectUnauthorized: false
  },
  max: 10, // Maximum number of connections
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 30, // Connection timeout of 30 seconds
  max_lifetime: 60 * 30, // Close connections after 30 minutes
  onnotice: () => {}, // Suppress notice messages
  onparameter: () => {}, // Suppress parameter messages
});

export default sql; 