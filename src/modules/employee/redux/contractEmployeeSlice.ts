/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../../../api/employeeApi";
import {
  IBenefitParams,
  IContractInfoParams,
  IContractParams,
  IDataEmployeeParams,
  IDepartmentParams,
  IEmployeeParams,
  IGradeParams,
  IMarriageStatusParams,
  IPositionParams,
} from "../../../types/employee";
import { RootState } from "../../../app/store";

interface initialState {
  dataEmployee: IDataEmployeeParams;
  loadingEmployee: boolean;
  marriageStatus: IMarriageStatusParams[];
  employee: IEmployeeParams;

  departmentList: IDepartmentParams[];
  positionList: IPositionParams[];
  benefitsList: IBenefitParams[];
  gradeList: IGradeParams[];

  errorsInputEmployee: any;
}

interface contractUploadState {
  contractList: IContractParams[];
  contractInfo: IContractInfoParams;
}

const initialState: contractUploadState = {
  contractList: [],
  contractInfo: {
    employee_id: "",
    names: [],
    contract_dates: [],
    documents: [],
    modified_contracts: [],
  },
};

export const getIdEmployeeContract = createAsyncThunk(
  "employee/uploadContract",
  async (id: number) => {
    const {
      data: { data },
    } = await employeeApi.getIdEmployeeContractUpload(id);

    return data;
  }
);

export const addDataUploadContract = createAsyncThunk(
  "employee/addContractUpload",
  async ({ formData }: { formData: IContractInfoParams }, { getState }) => {
    const { employee } = getState() as RootState;

    const newFormdata = new FormData();
    newFormdata.append("employee_id", String(employee.employee.id));

    formData.names.forEach((name) => newFormdata.append("names[]", name));
    formData.contract_dates.forEach((date) =>
      newFormdata.append("contract_dates[]", date)
    );

    formData.documents.forEach((doc) =>
      newFormdata.append("documents[]", doc, doc.name)
    );

    newFormdata.append("modified_contracts[]", "");

    console.log("HIHIHI", formData);

    const {
      data: { data },
    } = await employeeApi.addEmployeeContractUpload(newFormdata);

    return data;
  }
);

const contractUploadSlice = createSlice({
  name: "contractUpload",
  initialState,

  reducers: {
    addDataToForm: (state, action: PayloadAction<IContractInfoParams>) => {
      const { employee_id, names, contract_dates, documents } = action.payload;
      if (employee_id !== "0") {
        state.contractInfo.employee_id = employee_id;
      }
      if (names[0] != "") {
        state.contractInfo.names.push(...names);
        state.contractInfo.contract_dates.push(...contract_dates);
        state.contractInfo.documents.push(...documents);
      }
    },
    addDataTableContract: (state, action: PayloadAction<IContractParams>) => {
      state.contractList.unshift(action.payload);
    },

    getDataTableContract: (state, action: PayloadAction<number>) => {
      // state.contractList.push(action.payload);
    },

    removeDataFormConTract: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.contractInfo.names.splice(id, 1);
      state.contractInfo.contract_dates.splice(id, 1);
      state.contractInfo.documents.splice(id, 1);
    },

    removeDataContractById: (state, action: PayloadAction<number>) => {
      const idContractUpload = action.payload;
      const deletePostIndex = state.contractList.findIndex(
        (post) => post.id === idContractUpload
      );

      if (deletePostIndex !== -1) {
        state.contractList.splice(deletePostIndex, 1);
      }
    },

    removeAllDataFormConTract: (state) => {
      state.contractInfo = initialState.contractInfo;
    },

    removeAllDataContract: (state) => {
      state.contractList = initialState.contractList;
    },

    mountDataContract: (state, action: PayloadAction<IContractParams[]>) => {
      state.contractList = action.payload;
    },
  },

  extraReducers: {
    [getIdEmployeeContract.fulfilled.toString()]: (state, action) => {
      state.contractList = action.payload;
    },

    [addDataUploadContract.fulfilled.toString()]: (state) => {
      state.contractInfo = initialState.contractInfo;
      state.contractList = initialState.contractList;
    },
  },
});

const { actions, reducer } = contractUploadSlice;
export const {
  addDataToForm,
  addDataTableContract,
  getDataTableContract,
  removeDataFormConTract,
  removeDataContractById,
  removeAllDataFormConTract,
  removeAllDataContract,
  mountDataContract,
} = actions;
export default reducer;
