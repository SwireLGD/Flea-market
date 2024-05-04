import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategories, selectFetchLoading } from './categoriesSlice';
import { useAppDispatch } from '../../app/hooks';
import { fetchCategories } from './categoriesThunks';
import { List, ListItem, ListItemText, CircularProgress, Container, Typography, Link as MuiLink } from '@mui/material';

const CategoriesList = () => {
    const dispatch = useAppDispatch();
    const categories = useSelector(selectCategories);
    const loading = useSelector(selectFetchLoading);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <List component="nav">
                <ListItem button component={Link} to="/">
                    <ListItemText primary="All categories" />
                </ListItem>
                {categories.map(category => (
                    <ListItem button key={category._id} component={Link} to={`/categories/${category._id}`}>
                        <ListItemText primary={category.title} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default CategoriesList;
