import { useAppDispatch } from "../../../app/hooks";
import { ItemMutation } from "../../../types";

interface Props {
    onSubmit: (mutation: ItemMutation) => void;
}

const ItemForm: React.FC<Props> = ({onSubmit}) => {
    const dispatch = useAppDispatch();
}

