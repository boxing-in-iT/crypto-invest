import styled from "@emotion/styled";
import { useState } from "react";
import { Investment } from "../data/interface";
import InvestmentTableRow from "./InvestmentTableRow";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { removeInvestment } from "../store/features/investmentSlice";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  button {
    cursor: pointer;
    padding: 6px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;

    &:hover {
      background-color: #0056b3;
    }
  }

  button[style*="red"] {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #b02a37;
    }
  }
`;

interface InvestmentTableProps {
  investments: Investment[];
}

const InvestmentTable = (props: InvestmentTableProps) => {
  const { investments } = props;
  const [profit, setProfit] = useState([]);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(removeInvestment(id));
  };

  // Рассчитать общую сумму инвестиций
  const totalInvested = investments.reduce(
    (sum, investment) => sum + investment.totalCost,
    0
  );

  const totalProfit = profit.reduce((sum, profit) => sum + profit, 0);

  console.log("Profits/Loss: ", profit);

  return (
    <div>
      <h2>Мои инвестиции</h2>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Криптовалюта</th>
            <th>Количество</th>
            <th>Цена покупки (за единицу)</th>
            <th>Общая стоимость</th>
            <th>Дата покупки</th>
            <th>Текущая стоимость</th>
            <th>Прибыль/убыток</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment, index) => (
            <InvestmentTableRow
              key={investment.id}
              investment={investment}
              index={index}
              onDelete={handleDelete}
              setProfits={setProfit}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ textAlign: "right", fontWeight: "bold" }}>
              Общая сумма инвестиций:
            </td>
            <td colSpan={5} style={{ fontWeight: "bold" }}>
              ${totalInvested.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{ textAlign: "right", fontWeight: "bold" }}>
              Общая сумма прибыли:
            </td>
            <td colSpan={5} style={{ fontWeight: "bold" }}>
              ${totalProfit.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{ textAlign: "right", fontWeight: "bold" }}>
              Итого:
            </td>
            <td colSpan={5} style={{ fontWeight: "bold" }}>
              ${totalProfit + totalInvested}
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default InvestmentTable;
