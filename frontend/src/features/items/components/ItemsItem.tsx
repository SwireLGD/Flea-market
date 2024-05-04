import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from "@mui/material";
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import { apiURL } from "../../../constants";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    title: string;
    price: number;
    image: string | null;
};

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%'
});

const ItemsItem: React.FC<Props> = ({id, title, price, image}) => {
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/' + image;
    }

    return (
        <Grid item xs md={4} lg={3}>
            <Card>
                <CardHeader title={title} />
                <ImageCardMedia image={cardImage} title={title} />
                <CardContent>
                <strong>{price} KGS</strong>
                </CardContent>
                <CardActions>
                <IconButton component={Link} to={`/items/${id}`}>
                    <ArrowForwardIcon/>
                </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ItemsItem;