import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
): TSelected => {
  return useSelector(selector);
};
