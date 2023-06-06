import ClearIcon from "@mui/icons-material/Clear";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../app/store";
import downloadIcon from "../../../../../assets/download.svg";
import InputDatePicker from "../../../../../components/formControl/inputDatePicker/InputDatePicker";
import { InputField } from "../../../../../components/formControl/inputField/InputField";
import { IContractParams } from "../../../../../types/employee";
import {
  addDataTableContract,
  addDataToForm,
  getIdEmployeeContract,
  removeDataContractById,
  removeDataFormConTract,
} from "../../../redux/contractEmployeeSlice";
import { Link, useParams } from "react-router-dom";

interface Column {
  id: "No" | "Contract Name" | "Sign Date" | "Action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "No", label: "No", minWidth: 50 },
  { id: "Contract Name", label: "Contract Name", minWidth: 140 },
  { id: "Sign Date", label: "Sign Date", minWidth: 140 },
  { id: "Action", label: "Action", minWidth: 250 },
];

const ContractUpload = () => {
  // eslint-disable-next-line no-empty-pattern
  const TableCellCustom = styled(TableCell)(({}) => ({
    border: "1px solid white",
    color: "rgb(104, 112, 118)",
    fontSize: "12px",
    padding: "0 10px",
  }));

  const CustomTableRow = styled(TableRow)(({ theme, selected }) => ({
    cursor: "pointer",
    height: "36px",
    backgroundColor: selected
      ? "rgb(237 246 255) !important"
      : "rgb(248, 249, 250)",

    "&:hover": {
      backgroundColor: "rgb(237, 246, 255) !important",
    },
    "&.MuiTableCell-root": {
      color: "transparent",
    },
  }));

  const dispatch = useDispatch<AppDispatch>();
  const contractList = useSelector(
    (state: RootState) => state.contract.contractList
  );

  const { id } = useParams();
  const idEmployee = Number(id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [formContract, setFormContract] = useState({ date: "", name: "" });
  const [idContract, setIdContract] = useState<number | null>(null);

  // handle open/close modal
  const handleOpenFirstModal = (idContract: number) => {
    setIdContract(idContract);
    setOpenFirstModal(true);
  };

  const handleCloseFirstModal = () => {
    setOpenFirstModal(false);
    setIdContract(null);
  };

  // delete contract upload
  const handleDeleteContractInfo = (
    document: string,
    index: number,
    rowId: number
  ) => {
    dispatch(removeDataFormConTract(index));
    dispatch(removeDataContractById(rowId));
    setIdContract(null);
    setOpenFirstModal(false);
  };

  // Change when selected file
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setSelectedFile(selectedFile || null);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  // Change value form
  const changeContractName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormContract((prevValues) => ({ ...prevValues, name: e.target.value }));
  };

  const handleDateChangeUploadContract = (date: string | null) => {
    setFormContract((prevValues) => ({ ...prevValues, date: String(date) }));
  };

  const handleDataContract = () => {
    if (selectedFile != null) {
      dispatch(
        addDataToForm({
          employee_id: id ?? "0",
          documents: [selectedFile],
          names: [formContract.name],
          contract_dates: [
            moment(formContract.date).format("YYYY-MM-DD"),
            // file.date
          ],
          modified_contracts: [],
        })
      );

      dispatch(
        addDataTableContract({
          id: selectedFile.lastModified,
          employee_id: -1,
          contract_date: formContract.date,
          name: formContract.name,
          document: "",
          created_at: "",
          updated_at: "",
          deleted_at: "",
        })
      );
    }

    setFormContract({ date: "", name: "" });
    setSelectedFile(null);
  };

  useEffect(() => {
    if (idEmployee) {
      dispatch(getIdEmployeeContract(idEmployee));
    }
  }, [idEmployee, dispatch]);

  return (
    <div className=" flex flex-col border border-solid  border-[#dfe3e6] rounded-xl">
      <h4 className="rounded-t-xl font-semibold text-xs bg-bgrGray text-textSecondary px-[18px] py-2">
        CONTRACT:
      </h4>
      <p className="px-[18px] py-3 text-textSecondary text-14">
        Please upload pdf, png, xlsx, docx file format!
      </p>
      <hr className="hr-border" />
      <div className="flex flex-wrap gap-5 py-5 px-[18px]">
        <div className="flex flex-col gap-[10px] max-w-[400px]">
          <InputDatePicker
            type="date"
            handleDateChangeUploadContract={handleDateChangeUploadContract}
            value={formContract.date}
            name="contract_date"
            label="Contract Date"
            className="!w-full"
          />
          <InputField
            type="text"
            onChange={changeContractName}
            value={formContract.name}
            name="contract_name"
            // onChange={handleAddContractInfo}
            label="Contract Name"
            upload
            className="!w-[230px]"
          />
          <div className="flex justify-between items-center mt-3">
            <div>
              <div>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    alignItems: "center",
                    color: "rgb(0, 145, 255)",
                    backgroundColor: "rgb(237, 246, 255)",
                    border: "1px dashed",
                    boxShadow: "none",
                    minWidth: "195px",
                    borderRadius: "6px",
                    height: "48px",
                    textTransform: "none",
                    "&:hover": {
                      boxShadow: "none",
                      backgroundColor: "rgba(0, 145, 255, 0.08)",
                    },
                  }}
                >
                  <FileUploadOutlinedIcon style={{ fontSize: 20 }} />
                  <span className="upload-file">Upload File</span>
                  <input
                    accept="image/*,.pdf,.csv,.xlsx,.docx"
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </div>
            </div>
            <div>
              {/* onClick={handleAddContractUpload} */}
              <Button
                disabled={
                  !selectedFile ||
                  formContract.name === "" ||
                  formContract.date === ""
                    ? true
                    : false
                }
                onClick={handleDataContract}
                className="button-upload-file"
              >
                Add
              </Button>
            </div>
          </div>
          {selectedFile && (
            <div className=" bg-bgrGray mt-[10px] px-3  rounded-md cursor-pointer relative">
              <div className="text-textPrimary py-3 text-14 max-w-[300px] break-words line-clamp-2 ">
                {selectedFile.name}
                <button
                  className=" text-textPrimary absolute right-3  top-2/4 -translate-y-2/4"
                  onClick={handleDeleteFile}
                >
                  <ClearIcon className="rounded-full font-semibold" />
                </button>
              </div>
            </div>
          )}
        </div>

        <hr className="hr-hegiht" />
        <div className="max-w-[530px]">
          <TableContainer className="h-[36vh]">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className="table-upload">
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {contractList &&
                  contractList[0]?.id !== -1 &&
                  contractList.map((row: IContractParams, index: number) => {
                    return (
                      <CustomTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <TableCellCustom>{index + 1}</TableCellCustom>
                        <TableCellCustom style={{ minWidth: `50px` }}>
                          {row.name}
                        </TableCellCustom>
                        <TableCellCustom>
                          {moment(row.contract_date).format("YYYY/MM/DD")}
                        </TableCellCustom>
                        <TableCellCustom>
                          <div className="flex justify-center items-center gap-1">
                            <span className="w-32">
                              {row.document != "" && (
                                <Link
                                  target="_blank"
                                  to={`https://api-training.hrm.div4.pgtest.co/storage/${row.document}`}
                                  className="flex gap-2 hover:bg-[#30a46c14] h-6 text-green bg-[#e9f9ee] items-center rounded-lg py-[12px] px-4"
                                >
                                  <span className="text-ellipsis overflow-hidden whitespace-nowrap w-20">
                                    {row.document.split("/").pop()}
                                  </span>
                                  <img src={downloadIcon} alt="" />
                                </Link>
                              )}
                            </span>
                            <Button
                              onClick={() => handleOpenFirstModal(row.id)}
                              className="button-contract-upload "
                            >
                              <MdDeleteOutline size={14} />
                              <span className="ml-2">Delete</span>
                            </Button>
                          </div>
                        </TableCellCustom>
                      </CustomTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {contractList.map((contract, index) => {
        if (contract.id === idContract) {
          return (
            <>
              <Dialog
                open={openFirstModal}
                onClose={handleCloseFirstModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This will delete the {contract.name} record. Are you sure to
                    continue?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleCloseFirstModal}
                  >
                    No
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                      handleDeleteContractInfo(
                        contract.document,
                        index,
                        contract.id
                      )
                    }
                  >
                    Yes
                  </Button>
                </DialogActions>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute top-6 right-6 cursor-pointer"
                  onClick={handleCloseFirstModal}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Dialog>
            </>
          );
        } else {
          return;
        }
      })}
    </div>
  );
};

export default ContractUpload;
