import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Chip, TextField, styled } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../app/store";
import { IBenefitParams } from "../../../../../types/employee";
import { getBenefits, getGrades } from "../../../redux/employeeSlice";
import ExpandLessIcon from "@mui/icons-material/ExpandMore";

// eslint-disable-next-line react-refresh/only-export-components
export const autocompleteStyles = {
  width: "326px",
  maxHeight: "300px",
  backgroundColor: "rgb(241, 243, 245)",
  borderRadius: "6px",
  fontSize: "0.8125rem",
  marginBottom: "6px",

  "& .MuiAutocomplete-inputRoot": {
    padding: "8px 12px 8px 12px",
    "& input": {
      fontSize: "16px",
      lineHeight: "16px",
    },
  },
  "& .MuiAutocomplete-listbox": {
    backgroundColor: "red",
    "& .MuiAutocomplete-option": {
      backgroundColor: "red",
    },
  },
  "& .MuiAutocomplete-tag": {
    color: "rgb(0, 145, 255)",
    backgroundColor: "#fff",
    borderRadius: "6px",
    fontSize: "14px",
    lineHeight: "16px",
    margin: "2px",
    padding: "4px",
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiFormControl-root-MuiTextField-root": {
    marginTop: "0",
  },
};

const TextAreaStyle = styled("textarea")(() => ({
  width: "314px",
  flexGrow: 1,
  boxSizing: "border-box",
  height: "96px",
  borderRadius: 8,
  minWidth: 314,
  maxWidth: 326,
  backgroundColor: "#f1f3f5",
  resize: "none",
  marginBottom: "4px",
  padding: 16,
  "&:hover": {
    border: `#f1f3f5`,
  },
  "&:focus": {
    border: `none`,
    outline: "none",
  },
}));

export interface IEmployeeOthersProps {
  formOthersEmployee: {
    remark: string;
    grade_id: number;
    benefits: IBenefitParams[];
  };

  handleFormChangeOthers: (
    selectedGradeId: number,
    selectedOption: IBenefitParams[],
    remark: string
  ) => void;
}

export function EmployeeOthers({
  handleFormChangeOthers,
  formOthersEmployee,
}: IEmployeeOthersProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedGradeIndex, setSelectedGradeIndex] = useState(-1);
  const [selectedGradeId, setSelectedGradeId] = useState(
    formOthersEmployee.grade_id
  );
  const [remark, setRemark] = useState(formOthersEmployee.remark);
  const [selectedOption, setSelectedOption] = useState<IBenefitParams[]>(
    formOthersEmployee.benefits
  );

  const handleOptionChange = (_event: unknown, newValue: IBenefitParams[]) => {
    setSelectedOption(newValue);
  };

  const handleDeleteOption = (option: IBenefitParams) => {
    const updatedOptions = selectedOption.filter((item) => item !== option);
    setSelectedOption(updatedOptions);
  };

  const { gradeList, benefitsList } = useSelector(
    (state: RootState) => state.employee
  );
  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(getGrades()), dispatch(getBenefits())]).then(
        ([resultActionDepartment, resultActionPosition]) => {
          unwrapResult(resultActionDepartment);
          unwrapResult(resultActionPosition);
        }
      );
    })();
  }, [dispatch]);

  useEffect(() => {
    // const idSelected = selectedOption.map((item) => item.id);

    handleFormChangeOthers(selectedGradeId, selectedOption, remark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remark, selectedGradeId, selectedOption]);

  const hanleChangeRemark = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRemark(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-18 font-medium text-textPrimary">Others</h3>
        <p className="text-14 font-normal text-textSecondary">
          Required (<span className="text-red3">*</span>)
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#DFE3E6] my-[10px]"></div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span className="font-normal text-16 text-textPrimary min-w-[162px]">
            Grade
          </span>
          <div>
            <Autocomplete
              className="autocomplete-select"
              disablePortal
              options={gradeList}
              sx={autocompleteStyles}
              clearIcon={<ClearIcon />}
              popupIcon={<ExpandLessIcon />}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} />}
              defaultValue={
                gradeList.find(
                  (item) => item.id === formOthersEmployee.grade_id
                ) || null
              }
              onChange={(_event, newValue) => {
                if (newValue) {
                  const selectedIndex = gradeList.findIndex((item) => {
                    setSelectedGradeId(item.id);

                    return item.name === newValue.name;
                  });
                  setSelectedGradeIndex(selectedIndex);
                } else {
                  setSelectedGradeIndex(-1);
                }
              }}
              renderOption={(props, option, { selected }) => (
                <li
                  {...props}
                  style={{
                    backgroundColor: selected ? "#e9f9ee" : "inherit",
                    color: selected ? "#30a46c" : "inherit",
                    padding: "6px 16px",
                    fontSize: "14px",
                  }}
                >
                  {option.name}
                </li>
              )}
            />

            <div className="flex items-center max-w-[300px] h-auto">
              <div className="font-normal min-w-175 flex"></div>
              <div className="flex w-308 flex-wrap text-sm">
                {selectedGradeIndex > -1 &&
                  gradeList[selectedGradeIndex].benefits.map((benefits) => (
                    <div className="bg-[#e6e8eb] text-xs font-normal text-gray mx-1 px-2 rounded-md mb-1 h-6 flex items-center">
                      {benefits.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-normal text-16 text-textPrimary min-w-[162px]">
            Benefit
          </span>
          <Autocomplete
            multiple
            id="tags-standard"
            options={benefitsList}
            getOptionLabel={(option) => option.name}
            value={selectedOption ?? undefined}
            sx={autocompleteStyles}
            onChange={handleOptionChange}
            disableCloseOnSelect
            clearIcon={<ClearIcon />}
            popupIcon={<ExpandLessIcon />}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  marginTop: "5px",
                }}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li
                {...props}
                style={{
                  backgroundColor: selected ? "#e9f9ee" : "inherit",
                  color: selected ? "#30a46c" : "inherit",
                  padding: "6px 16px",
                  fontSize: "14px",
                }}
              >
                {option.name}
              </li>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  onDelete={() => handleDeleteOption(option)}
                  deleteIcon={
                    <ClearIcon
                      onClick={() => handleDeleteOption(option)}
                      style={{ fontSize: 16 }}
                    />
                  }
                />
              ))
            }
          />
        </div>
        <div className="flex items-center">
          <span className="font-normal text-16 text-textPrimary  min-w-[162px]">
            Remark
          </span>
          <TextAreaStyle
            value={remark}
            name="remark"
            onChange={hanleChangeRemark}
          />
        </div>

        <div className="flex items-center">
          <span className="font-normal text-16 text-textPrimary  min-w-[162px]">
            HRM User Account
          </span>
          <Autocomplete
            disabled
            disablePortal
            options={gradeList}
            sx={autocompleteStyles}
            getOptionLabel={(option) => option.name}
            popupIcon={<ExpandLessIcon />}
            renderInput={(params) => <TextField {...params} />}
            onChange={(_event, newValue) => {
              if (newValue) {
                const selectedIndex = gradeList.findIndex(
                  (item) => item.name === newValue.name
                );
                setSelectedGradeIndex(selectedIndex);
              } else {
                setSelectedGradeIndex(-1);
              }
            }}
          />
        </div>
      </div>

      {/* <div className="mt-3">
        <OtherUpload />
      </div> */}
    </div>
  );
}
