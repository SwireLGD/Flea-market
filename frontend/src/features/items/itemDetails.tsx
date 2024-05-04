import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchItemDetails, deleteItem } from './itemsThunks';
import { selectCurrentItem, selectFetchLoading } from './itemsSlice';
import { selectUser } from '../users/usersSlice';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import imageNotAvailable from '../../../assets/imageNotAvailable.png';
import { apiURL } from '../../constants';

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%', 
});

const ItemDetailsPage: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const dispatch = useAppDispatch();
    const itemDetails = useAppSelector(selectCurrentItem);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const isLoading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        if (itemId) {
            dispatch(fetchItemDetails(itemId));
        }
    }, [dispatch, itemId]);

    const handleDelete = () => {
        if (itemId) {
            dispatch(deleteItem(itemId));
            navigate('/');
        }
    };

    let cardImage = itemDetails && itemDetails.image ? `${apiURL}/${itemDetails.image}` : imageNotAvailable;

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    return (
        <Card>
            {itemDetails ? (
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {itemDetails.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {itemDetails.description}
                    </Typography>
                    <ImageCardMedia image={cardImage} />
                    <Typography variant="body1" color="textPrimary" component="p">
                        Price: {itemDetails.price}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {user?.displayName}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        Телефон: {user?.phoneNumber}
                    </Typography>
                    {user && (
                        <CardActions>
                            <IconButton color="error" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    )}
                </CardContent>
            ) : (
                <CardContent>
                    <Typography>No item details available.</Typography>
                </CardContent>
            )}
        </Card>
    );
};

export default ItemDetailsPage;