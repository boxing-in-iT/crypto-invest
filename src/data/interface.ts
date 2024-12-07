export interface Investment {
  id: string; // Уникальный идентификатор
  cryptocurrency: string; // Название криптовалюты
  amount: number; // Количество купленной криптовалюты
  purchasePrice: number; // Цена покупки (за 1 единицу)
  totalCost: number; // Общая стоимость
  purchaseDate: string; // Дата покупки
  // currentPrice: number; // Текущая цена (из API)
}
