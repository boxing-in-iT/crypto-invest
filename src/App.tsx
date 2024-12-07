import styled from "@emotion/styled";
import { useState } from "react";
import AddInvestmentForm from "./components/AddInvestmentForm";
import InvestmentTable from "./components/InvestmentTable";
import { useAppSelector } from "./hooks/useAppSelector";
import { Button, Modal } from "@mui/material";
import { exportToExcel, importFromExcel } from "./utils/forExcel";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { setInvestments } from "./store/features/investmentSlice";

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 50px;
`;

const AppContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const AddInvestButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #000;
`;

function App() {
  const dispatch = useAppDispatch();
  const { investments } = useAppSelector((state) => state.investments);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleExport = () => {
    exportToExcel(investments);
  };

  const handleImport = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const importedData = await importFromExcel(file);
      dispatch(setInvestments(importedData));
    }
  };

  return (
    <>
      <AppWrapper>
        <AppContent>
          <HeaderWrapper>
            <div>
              <Button onClick={handleExport}>Export to Excel</Button>
              <Button>
                <label htmlFor="import-file" style={{ cursor: "pointer" }}>
                  Import from Excel
                </label>
                <input
                  id="import-file"
                  type="file"
                  accept=".xlsx, .xls"
                  style={{ display: "none" }}
                  onChange={handleImport}
                />
              </Button>
            </div>
            <AddInvestButton onClick={handleOpen}>
              Add Investment
            </AddInvestButton>
          </HeaderWrapper>

          {/* <AddInvestmentForm /> */}
          <InvestmentTable investments={investments} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddInvestmentForm onClose={handleClose} />
          </Modal>
        </AppContent>
      </AppWrapper>
    </>
  );
}

export default App;
