import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  IDocumentFormDataParams,
  IDocumentParams,
} from "../../../types/employee";
import employeeApi from "../../../api/employeeApi";

interface contractUploadState {
  dataDocument: IDocumentParams[];
  dataFormDocument: IDocumentFormDataParams;
  newDocs: File[];
}

const initialState: contractUploadState = {
  dataDocument: [],

  dataFormDocument: {
    employee_id: "",
    documents: [],
    deleted_ids: [],
  },

  newDocs: [],
};

export const addDataDocument = createAsyncThunk(
  "others/addDocument",
  async ({ formData }: { formData: IDocumentFormDataParams }, { getState }) => {
    const { employee } = getState() as RootState;
    const newFormdata = new FormData();

    newFormdata.append("employee_id", String(employee.employee.id));

    formData.documents &&
      formData.documents.forEach((doc) =>
        newFormdata.append("documents[]", doc, doc.name)
      );

    formData.deleted_ids &&
      formData.deleted_ids.forEach((id) =>
        newFormdata.append("deleted_ids[]", String(id))
      );

    const {
      data: { data },
    } = await employeeApi.addEmployeeOthersUpload(newFormdata);

    return data;
  }
);

const othersEmployeeSlice = createSlice({
  name: "othersEmployeeSlice",
  initialState,

  reducers: {
    addDataToDocument: (
      state,
      action: PayloadAction<IDocumentFormDataParams>
    ) => {
      const { employee_id, documents, deleted_ids } = action.payload;

      state.dataFormDocument.employee_id = employee_id;

      state.dataFormDocument.documents &&
        documents &&
        state.newDocs.push(...documents);

      state.dataFormDocument.deleted_ids &&
        deleted_ids &&
        state.dataFormDocument.deleted_ids.push(...deleted_ids);
    },

    removeDataFormDocument: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.dataFormDocument.documents &&
        state.dataFormDocument.documents.splice(id, 1);
    },

    removeDataDocument: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.dataDocument = state.dataDocument.filter((post) => post.id !== id);
    },

    removeAllDataFromDocument: (state) => {
      console.log(initialState.dataFormDocument);

      state.dataFormDocument = initialState.dataFormDocument;
    },

    removeAllDataDocument: (state) => {
      state.dataDocument = [];
    },

    removeNewDocs: (state) => {
      state.newDocs = [];
    },

    mountDataDocument: (state, action: PayloadAction<IDocumentParams[]>) => {
      state.dataDocument = action.payload;
    },

    addDataTableDocument: (state, action) => {
      state.dataDocument.push(action.payload);
    },
  },
});

const { actions, reducer } = othersEmployeeSlice;

export const {
  addDataToDocument,
  addDataTableDocument,
  mountDataDocument,
  removeDataDocument,
  removeAllDataDocument,
  removeAllDataFromDocument,
  removeDataFormDocument,
  removeNewDocs,
} = actions;

export default reducer;
