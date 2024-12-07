import styled from "@emotion/styled";
import React, { useState } from "react";
import { useSearchCoin } from "../hooks/useSearchCoin";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addInvestment } from "../store/features/investmentSlice";
import { Investment } from "../data/interface";

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  color: #444;
  font-size: 26px;
  margin-bottom: 25px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #666;
  font-size: 15px;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  background-color: #f9f9f9;
  color: #333;

  &:focus {
    border-color: #00aaff;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 170, 255, 0.3);
  }
`;

const SearchResult = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  top: 105%;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const ResultItem = styled.li`
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f0f8ff;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ResultText = styled.p`
  margin: 0;
  color: #555;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 14px;
  background: linear-gradient(90deg, #28a745, #218838);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(90deg, #218838, #1e7e34);
    transform: translateY(-2px);
  }

  &:active {
    background: #1c7430;
    transform: translateY(0);
  }
`;

interface AddInvestmentFormProps {
  onClose: () => void;
}

const AddInvestmentForm = ({ onClose }: AddInvestmentFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, setSearchResults } = useSearchCoin(searchQuery);
  const dispatch = useAppDispatch();
  const [investment, setInvestment] = useState<Investment>({
    id: "",
    cryptocurrency: "",
    amount: 0,
    purchasePrice: 0,
    totalCost: 0,
    purchaseDate: "",
  });

  const handleSelectCoin = (coin: any) => {
    setInvestment((prev) => ({
      ...prev,
      cryptocurrency: `${coin.name} (${coin.symbol})`,
      id: coin.id,
    }));
    setSearchResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInvestment((prev) => ({
      ...prev,
      [name]: name === "amount" || name === "purchasePrice" ? +value : value,
      totalCost:
        name === "amount"
          ? +value * prev.purchasePrice
          : name === "purchasePrice"
          ? +value * prev.amount
          : prev.totalCost,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investment.cryptocurrency) {
      alert("Выберите криптовалюту из списка!");
      return;
    }

    console.log("Сохраненная инвестиция:", investment);

    dispatch(addInvestment(investment));

    // Очистить форму
    setSearchQuery("");
    setInvestment({
      id: "",
      cryptocurrency: "",
      amount: 0,
      purchasePrice: 0,
      totalCost: 0,
      purchaseDate: "",
    });

    onClose();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container>
      <Title>Добавить криптовалюту</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="cryptocurrency">Название криптовалюты</Label>
        <SearchContainer>
          <Input
            type="text"
            id="cryptocurrency"
            name="cryptocurrency"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            required
          />

          {searchQuery && searchResults.length > 0 && (
            <SearchResult>
              {searchResults.slice(0, 5).map((coin: any) => (
                <ResultItem
                  key={coin.id}
                  onClick={() => handleSelectCoin(coin)}
                >
                  <ResultText>
                    {coin.name} ({coin.symbol})
                  </ResultText>
                </ResultItem>
              ))}
            </SearchResult>
          )}
        </SearchContainer>

        <Label htmlFor="amount">Количество</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          step={0.01}
          value={investment.amount}
          onChange={handleInputChange}
          required
        />

        <Label htmlFor="purchasePrice">Цена покупки</Label>
        <Input
          type="number"
          id="purchasePrice"
          name="purchasePrice"
          step={0.01}
          value={investment.purchasePrice}
          onChange={handleInputChange}
          required
        />

        <Label htmlFor="purchaseDate">Дата покупки</Label>
        <Input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={investment.purchaseDate}
          onChange={handleInputChange}
          required
        />

        <SubmitButton type="submit">Сохранить</SubmitButton>
      </Form>
    </Container>
  );
};

export default AddInvestmentForm;
