import React from 'react';
import '../index.css';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const MoviesPage = () => {

    
      return (
        <div>
          <Link to="/create-movie"><button>Add Movie</button></Link>
          <Link to="/create-movie"><button>Update Movie</button></Link>
          <Link to="/"><button>Delete Movie</button></Link>
        </div>
  );
};

export default MoviesPage;
