import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ItemMutation } from "../../../types";
import { selectCategories } from "../../categories/categoriesSlice";
import { selectUser } from "../../users/usersSlice";
import { fetchCategories } from "../../categories/categoriesThunks";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import FileInput from "../../../components/FileInput/FileInput";

interface Props {
    onSubmit: (mutation: ItemMutation) => void;
}

const ItemForm: React.FC<Props> = ({onSubmit}) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const user = useAppSelector(selectUser);
    const [state, setState] = useState<ItemMutation>({
        category: '',
        title: '',
        description: '',
        price: '',
        image: null,
        seller: user ? `${user.displayName}, ${user.phoneNumber}` : '',
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                <TextField
                    select
                    id="category" label="Category"
                    value={state.category}
                    onChange={inputChangeHandler}
                    name="category"
                    required
                >
                    <MenuItem value="" disabled>Please select a category</MenuItem>
                    {categories.map(category => (
                        <MenuItem
                            key={category._id}
                            value={category._id}
                        >
                        {category.title}
                        </MenuItem>
                    ))}
                </TextField>
                </Grid>
                <Grid item xs>
                <TextField
                    id="title" label="Title"
                    value={state.title}
                    onChange={inputChangeHandler}
                    name="title"
                />
                </Grid>

                <Grid item xs>
                <TextField
                    id="price" label="Price"
                    value={state.price}
                    onChange={inputChangeHandler}
                    name="price"
                />
                </Grid>

                <Grid item xs>
                <TextField
                    multiline rows={3}
                    id="description" label="Description"
                    value={state.description}
                    onChange={inputChangeHandler}
                    name="description"
                />
                </Grid>

                <Grid item xs>
                <FileInput
                    onChange={fileInputChangeHandler}
                    name="image"
                    label="Image"
                />
                </Grid>

                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
}; 

export default ItemForm;