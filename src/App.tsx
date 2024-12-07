import styled from "@emotion/styled";
import { useState } from "react";
import AddInvestmentForm from "./components/AddInvestmentForm";
import InvestmentTable from "./components/InvestmentTable";
import { useAppSelector } from "./hooks/useAppSelector";
import { Modal } from "@mui/material";

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
  const { investments } = useAppSelector((state) => state.investments);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppWrapper>
        <AppContent>
          <HeaderWrapper>
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
