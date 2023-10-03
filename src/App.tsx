import { Navbar } from './components/Navbar';
import { InventoryTable } from './components/InventoryTable';

function App() {
  return (
    <div className="app flex w-full h-full">
      <Navbar />
      <div>
        <h1>App inventory</h1>
        <InventoryTable />
      </div>
    </div>
  );
}

export default App;
