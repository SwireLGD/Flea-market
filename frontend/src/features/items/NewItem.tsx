import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks"
import { ItemMutation } from "../../types";
import { createItem } from "./itemsThunks";
import { Typography } from "@mui/material";
import ItemForm from "./components/ItemForm";

const NewItem = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFormSubmit = async (itemMutation: ItemMutation) => {
        try {
            await dispatch(createItem(itemMutation)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4">New item</Typography>
            <ItemForm onSubmit={onFormSubmit} />
        </>
    );
};

export default NewItem;