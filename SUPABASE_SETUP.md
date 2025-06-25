# Supabase Database Setup Guide

This guide will walk you through setting up a PostgreSQL database on Supabase and seeding it with initial data for the Military Asset Management System.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Node.js installed on your local machine

## Step 1: Create Supabase Project

1. **Go to Supabase**
   - Visit [https://supabase.com](https://supabase.com)
   - Sign up or log in to your account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - **Name**: `military-assets-db` (or your preferred name)
     - **Database Password**: Create a strong password (save this!)
     - **Region**: Choose closest to your deployment region
   - Click "Create new project"

3. **Wait for Setup**
   - Supabase will provision your database (takes 1-2 minutes)
   - You'll be redirected to the project dashboard

## Step 2: Get Database Connection String

1. **Go to Project Settings**
   - In your Supabase dashboard, click the gear icon (Settings) in the left sidebar
   - Click "Database"

2. **Copy Connection String**
   - Scroll down to "Connection string"
   - Select "URI" format
   - Copy the connection string that looks like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
     ```
   - Replace `[YOUR-PASSWORD]` with your database password

## Step 3: Run Database Schema

1. **Go to SQL Editor**
   - In your Supabase dashboard, click "SQL Editor" in the left sidebar

2. **Create New Query**
   - Click "New query"
   - Copy and paste the entire schema from `backend/src/database/schema.sql`

3. **Run the Schema**
   - Click "Run" to execute the SQL
   - This will create all the tables and indexes
   - You should see a success message

## Step 4: Seed the Database

### Option A: Using the Seeding Script (Recommended)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Update Connection String**
   - Open `seed-database.js`
   - Replace `YOUR_SUPABASE_CONNECTION_STRING_HERE` with your actual connection string

3. **Run the Seeding Script**
   ```bash
   npm run seed
   ```

4. **Verify Success**
   - You should see output like:
     ```
     🚀 Starting database seeding...
     ✅ Database connection successful
     ✅ Admin user created/updated
     ✅ Base created: Task Force 141 Base
     ✅ Base created: Shadow Company HQ
     ✅ Base created: Los Vaqueros Compound
     ✅ Base created: KorTac Facility
     ✅ User created: price (base_commander)
     ✅ User created: graves (base_commander)
     ✅ User created: vargas (base_commander)
     ✅ User created: woods (base_commander)
     ✅ User created: laswell (logistics_officer)
     ✅ User created: keller (logistics_officer)
     ✅ User created: santiago (logistics_officer)
     ✅ User created: mason (logistics_officer)
     ✅ Base commanders assigned
     ✅ 20 personnel created
     ✅ 80 assets created across all bases
     
     🎉 Database seeding completed successfully!
     
     📋 Login Credentials:
     Admin: admin@military.gov / admin123
     Base Commanders: price@tf141.gov, graves@shadow.gov, vargas@vaqueros.gov, woods@kortac.gov / password123
     Logistics Officers: laswell@tf141.gov, keller@shadow.gov, santiago@vaqueros.gov, mason@kortac.gov / password123
     ```

### Option B: Manual Seeding via SQL Editor

If you prefer to seed manually through the SQL Editor:

1. **Go to SQL Editor**
2. **Create New Query**
3. **Copy and paste the seed data** (you can extract the SQL from the seeding script)
4. **Run the queries**

## Step 5: Verify Database Setup

1. **Check Tables**
   - Go to "Table Editor" in your Supabase dashboard
   - You should see the following tables:
     - `bases`
     - `users`
     - `personnel`
     - `assets`
     - `purchases`
     - `transfers`
     - `assignments`
     - `expenditures`
     - `audit_logs`

2. **Check Data**
   - Click on each table to verify data was inserted
   - You should see:
     - 4 bases
     - 9 users (1 admin + 4 commanders + 4 logistics officers)
     - 20 personnel
     - 80 assets (20 per base)

## Step 6: Configure for Vercel Deployment

1. **Copy Connection String**
   - Go to Project Settings > Database
   - Copy the connection string
   - This will be used as the `DATABASE_URL` environment variable in Vercel

2. **Test Connection**
   - You can test the connection using the seeding script
   - Or use a database client like pgAdmin or DBeaver

## Database Structure Overview

### Tables Created:

1. **bases** - Military bases/locations
2. **users** - System users (admin, commanders, logistics officers)
3. **personnel** - Military personnel at each base
4. **assets** - Equipment and supplies at each base
5. **purchases** - Purchase requests and approvals
6. **transfers** - Asset transfers between bases
7. **assignments** - Asset assignments to personnel
8. **expenditures** - Asset consumption tracking
9. **audit_logs** - System activity logging

### Sample Data:

- **4 Military Bases**: Task Force 141 Base, Shadow Company HQ, Los Vaqueros Compound, KorTac Facility
- **20 Asset Types**: Weapons, ammunition, vehicles, equipment, supplies
- **20 Personnel**: 5 per base across different departments
- **9 Users**: 1 admin + 4 base commanders + 4 logistics officers

## Login Credentials

After seeding, you can use these credentials to test the application:

### Admin User
- **Email**: `admin@military.gov`
- **Password**: `admin123`

### Base Commanders
- **Task Force 141 Base**: `price@tf141.gov` / `password123`
- **Shadow Company HQ**: `graves@shadow.gov` / `password123`
- **Los Vaqueros Compound**: `vargas@vaqueros.gov` / `password123`
- **KorTac Facility**: `woods@kortac.gov` / `password123`

### Logistics Officers
- **Task Force 141 Base**: `laswell@tf141.gov` / `password123`
- **Shadow Company HQ**: `keller@shadow.gov` / `password123`
- **Los Vaqueros Compound**: `santiago@vaqueros.gov` / `password123`
- **KorTac Facility**: `mason@kortac.gov` / `password123`

## Troubleshooting

### Common Issues:

1. **Connection Failed**
   - Verify your connection string is correct
   - Check that your database password is correct
   - Ensure SSL is enabled (handled automatically by the script)

2. **Schema Errors**
   - Make sure you ran the schema SQL first
   - Check for any syntax errors in the schema
   - Verify the UUID extension is enabled

3. **Seeding Errors**
   - Check that all tables exist
   - Verify foreign key relationships
   - Look for constraint violations

4. **Permission Issues**
   - Ensure your Supabase project is active
   - Check that you have the correct permissions
   - Verify the database is not in maintenance mode

### Getting Help:

- Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Review the error messages in the seeding script output
- Check the Supabase dashboard for any error logs

## Next Steps

Once your database is set up and seeded:

1. **Deploy to Vercel** following the `DEPLOYMENT_GUIDE.md`
2. **Set Environment Variables** in Vercel with your database connection string
3. **Test the Application** using the provided login credentials
4. **Monitor Performance** through the Supabase dashboard

Your database is now ready for production use! 🎉 