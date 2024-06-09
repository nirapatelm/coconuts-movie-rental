import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Mapping from "./components/MappingPage";
import Movies from "./components/Movies";
import Rentals from "./components/Rentals";
import Genres from "./components/Genre";
import Customers from "./components/Customers";
import People from "./components/People";

const drawerWidth = 240;

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/customers" onClick={handleDrawerToggle}>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button component={Link} to="/movies" onClick={handleDrawerToggle}>
          <ListItemText primary="Movies" />
        </ListItem>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
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
      </List>
    </div>
  );

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <CssBaseline />
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
              Movie Rentals
            </Typography>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <main style={{ flexGrow: 1, padding: "20px", marginLeft: 'auto' }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Rentals />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/people" element={<People />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/mapping" element={<Mapping />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
