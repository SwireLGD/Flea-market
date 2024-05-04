import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectItems } from "./itemsSlice";
import { fetchItems } from "./itemsThunks";
import { Grid, Typography } from "@mui/material";

import ItemsItem from "./components/ItemsItem";

const Items = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

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

export default Items;