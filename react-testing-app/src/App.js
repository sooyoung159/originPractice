import "./App.css";
import OrderPage from "./pages/OrderPage";

function App() {
  // const [step, setStep] = useState(0);
  return (
    <div style={{ padding: "4rem" }}>
      <OrderPage />
      {/* <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <CompletePage setStep={setStep} />}
      </OrderContextProvider> */}
    </div>
  );
}

export default App;
