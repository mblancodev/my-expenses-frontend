import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomCardItem,
  setCustomCardsList,
} from "src/app/slices/custom-cards.slice";
import { RootState } from "src/app/store";
import { BaseInput } from "src/components/atoms/Inputs/BaseInput";
import { FormItem } from "src/components/molecules/FormItem";

export const CustomCardForm = () => {
  const dispatch = useDispatch();
  const customCardsList = useSelector(
    (state: RootState) => state.customCards.list
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      note: "",
      total: 0,
    } as CustomCardItem,
    onSubmit: (values) => {
      dispatch(setCustomCardsList([...customCardsList, values]));
    },
  });
  return (
    <div className="w-full border rounded-md border-gray-200 bg-white">
      <header>Crear una nueva tarjeta</header>
      <form onSubmit={formik.submitForm}>
        <FormItem label="Name">
          <BaseInput
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormItem>
        <FormItem label="Name">
          <p>
            Select input for selecting the column from with withdraw the amount
          </p>
        </FormItem>
        <FormItem label="Note">
          <BaseInput
            id="note"
            value={formik.values.note}
            onChange={formik.handleChange}
          />
        </FormItem>
        <footer>
          <button type="submit">Submit</button>
        </footer>
      </form>
    </div>
  );
};
