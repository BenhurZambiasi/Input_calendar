import { useState } from "react";
import logo from "./logo.svg";
import DateComponent from "./component/InputData";
import { isValid } from "date-fns";
import "./App.css";

function App() {
  const [date, setDate] = useState<Date>(new Date());
  const handleDate = (date: Date, value: string) => {
    if (isValid(date)) {
      setDate(date);
    }
  };
  console.log(date, "Date");
  return (
    <div className="App">
      <DateComponent
        value={date.toLocaleDateString("pt-br")}
        onChange={(date, dateString) => handleDate(date, dateString)}
      />
    </div>
  );
}

export default App;
