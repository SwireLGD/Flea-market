import { Box, Container, Typography } from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import NewItem from "./features/items/NewItem";
import Items from "./features/items/Items";
import ItemDetailsPage from "./features/items/itemDetails";
import CategoriesList from "./features/categories/Categories";

const app = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Box display="flex">
        <Box width={240} bgcolor="grey.200" p={2} height="calc(100vh - 64px)" overflow="auto">
          <CategoriesList />
        </Box>
        <Box flexGrow={1}>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Items />} />
              <Route path="/items/:itemId" element={<ItemDetailsPage />} />
              <Route path="/add_item" element={<NewItem />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Typography variant="h2">Not found!</Typography>} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default app;