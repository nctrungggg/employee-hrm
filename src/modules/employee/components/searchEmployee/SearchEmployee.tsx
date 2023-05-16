import { useState } from "react";
import searchIcon from "../../../../assets/search.svg";

export interface ISearchEmployeeProps {
  onSearchEmployee: (value: string) => void;
  search: string | null;
}

export function SearchEmployee({
  onSearchEmployee,
  search,
}: ISearchEmployeeProps) {
  const [value, setValue] = useState<string>(search || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);

    onSearchEmployee(value);
  };

  return (
    <div className="w-[200px] flex items-center border border-[#DFE3E6] border-solid h-[40px] rounded-lg bg-bgrGray2">
      <div className="px-3">
        <img src={searchIcon} alt=" search-icon" />
      </div>
      <input
        type="text"
        value={value}
        placeholder="Search..."
        className="font-normal text-14 text-textPrimary !bg-inherit py-[8.5px]"
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}
