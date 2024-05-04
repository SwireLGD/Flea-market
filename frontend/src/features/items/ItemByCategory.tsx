import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemsByCategory } from './itemsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchLoading, selectItems } from './itemsSlice';
import { CircularProgress, Grid, Typography } from '@mui/material';
import ItemsItem from './components/ItemsItem';


const CategoryItems = () => {
    const { categoryId } = useParams<{ categoryId?: string }>();;
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const isLoading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchItemsByCategory( categoryId ));
        }
    }, [dispatch, categoryId]);

    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (items.length === 0) {
        return (
            <Typography variant="h5" textAlign="center">
                No items yet
            </Typography>
        );
    }

    return (
        <Grid container direction="column" gap={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                <Typography variant="h4">Items</Typography>
                </Grid>
            </Grid>

            <Grid item container gap={2}>
                {items.map(item => (
                    <ItemsItem
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default CategoryItems;
