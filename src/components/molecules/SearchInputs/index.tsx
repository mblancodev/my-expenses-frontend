import { useDispatch, useSelector } from "react-redux";
import { setColumnName, setSearchTerm } from "src/app/slices/filter.slice";
import { RootState } from "src/app/store";
import { BaseInput } from "src/components/atoms/Inputs/BaseInput";
import SingleSelect from "src/components/atoms/Inputs/SingleSelect";

export const SearchInputs = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.columnName);
  const headers = useSelector((state: RootState) => state.fileHeaders.list);
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

  return (
    <>
      <div>
        <label className="font-semibold text-sm text-gray-600 inline-block mb-1">
          Filtrar por:
        </label>
        <SingleSelect
          value={filter}
          onChange={(v: string) => {
            dispatch(setColumnName(v));
          }}
          options={headers.map((t) => ({ label: t, value: t }))}
        />
      </div>
      <div>
        <label>Que incluya:</label>
        <BaseInput
          id="search-term"
          value={searchTerm}
          disabled={Boolean(filter === "")}
          onChange={(e) => {
            dispatch(setSearchTerm(e.target.value));
          }}
        />
      </div>
    </>
  );
};
