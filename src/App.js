import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Importing components for different routes
import Mapping from "./components/MappingPage";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Rentals from "./components/Rentals";
import Genres from "./components/Genre";
import Customers from "./components/Customers";
import People from "./components/People";
import MoviePeople from "./components/MoviePeople";

// Width of the drawer
const drawerWidth = 240;

const App = () => {
  const theme = useTheme(); // Access theme properties
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the viewport is mobile
  const [mobileOpen, setMobileOpen] = useState(false); // State to manage mobile drawer open/close

  // Toggle the drawer on mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer content with navigation links
  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/customers" onClick={handleDrawerToggle}>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button component={Link} to="/movies" onClick={handleDrawerToggle}>
          <ListItemText primary="Movies" />
        </ListItem>
        <ListItem button component={Link} to="/rentals" onClick={handleDrawerToggle}>
          <ListItemText primary="Rentals" />
        </ListItem>
        <ListItem button component={Link} to="/people" onClick={handleDrawerToggle}>
          <ListItemText primary="People" />
        </ListItem>
        <ListItem button component={Link} to="/genres" onClick={handleDrawerToggle}>
          <ListItemText primary="Genres" />
        </ListItem>
        <ListItem button component={Link} to="/mapping" onClick={handleDrawerToggle}>
          <ListItemText primary="Mapping" />
        </ListItem>
        <ListItem button component={Link} to="/moviepeople" onClick={handleDrawerToggle}>
          <ListItemText primary="Movie People" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <CssBaseline /> {/* Ensures consistent baseline CSS */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              Coconuts Movie Rental
            </Typography>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            variant={isMobile ? "temporary" : "permanent"} // Use temporary drawer for mobile, permanent for desktop
            open={isMobile ? mobileOpen : true} // Control drawer open state
            onClose={handleDrawerToggle} // Handle drawer close event
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            ModalProps={{
              keepMounted: true, // Keep mounted for performance
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <main style={{ flexGrow: 1, padding: "20px", marginLeft: 'auto' }}>
          <Toolbar /> {/* Toolbar for spacing */}
          <Routes>
            {/* Define routes for different components */}
            <Route path="/" element={<Home />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/people" element={<People />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/mapping" element={<Mapping />} />
            <Route path="/moviepeople" element={<MoviePeople />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
