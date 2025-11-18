# EZHRA - Job Tracker App

An app to track job applications and candidates. You can add jobs, add candidates to those jobs, and keep everything organized.

## What I Used

- React (for building the app)
- Vite (makes React faster)
- Appwrite (stores the data)
- SCSS (makes it look pretty)

## Appwrite Setup (if you want to run this)

Create an Appwrite project with:

**Database:** JobTracker
- **Collection 1: Jobs**
  - jobTitle (string)
  - employer (string)
  - jobDetails (string)
  - unemployed (boolean)

- **Collection 2: EmployeeData** 
  - serial (string)
  - name (string)
  - shiftID (string, relationship to Jobs)
  - phone (string)

Then add your IDs to `.env`

## What the App Does

- ✅ Add/edit/delete jobs
- ✅ Add/edit/delete candidates for each job
- ✅ Search for jobs
- ✅ Switch between light and dark mode
- ✅ Filter to show only unemployed candidates