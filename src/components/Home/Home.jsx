// src/components/Home/Home.jsx
import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Box
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import useStyles from "./styles";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;
  const searchQuery = searchParams.get("searchQuery");
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}`
      );
    } else {
      navigate("/");
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      // Prevent form submit if inside a form element
      e.preventDefault();
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
          sx={(theme) => ({
            [theme.breakpoints.down('xs')]: {
              flexDirection: 'column-reverse',
            },
          })}
        >
          <Grid size={{ xs: 12, sm: 6, md: 9 }}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
              elevation={0}
            >
              <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  onKeyDown={handleOnKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </Box>
            </AppBar>

            <Form currentId={currentId} setCurrentId={setCurrentId} />

            {!searchQuery && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
