# Booknotes
A CRUD app created using Node.js and PostgreSQL.
It lets the user create notes for a book they have read, update the notes, read and delete them. This is just a practice project.

## Prerequisites
Before you begin, ensure you have met the following requirements:

+ Node.js installed on your local machine. You can download it from [here](https://nodejs.org/en).
+ PostgreSQL database server installed and running. You can download it from [here](https://www.postgresql.org/).

## Setting Up the PostgreSQL Database

1. **Install PostgreSQL:** Install PostgreSQL on your remote server. Refer to the PostgreSQL documentation for instructions specific to your server's operating system.

2. **Create Database:** Create a new database named `books` for your project using the PostgreSQL workbench.

3. **Configure Access:** Configure user permissions and access control for your database to ensure security.

## Setting Environment Variables

1. Open the file `.env.example`.
2. Define the empty variables according to your database configurations. Do not change the non empty varaible.
3. After configuration, remove `.example` from filename. The filename should look like this `.env`.

## Running the Project

1.  **Clone Repository:** Clone this repository to your local machine using the following command:

``` 
git clone https://github.com/Narayan2206/Booknotes.git
```

2. **Install Dependencies:** Navigate to the project directory and install project dependencies using npm:

```
cd your-repository
npm install
```

3. **Start the Server:** Once dependencies are installed, start the server using the following command:

```
npm run dev
```
4. **Access the Application:** Once the server is running, you can access the application by navigating to http://localhost:3000 in your web browser.
