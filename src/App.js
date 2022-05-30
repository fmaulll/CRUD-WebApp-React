import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMahasiswa from "./components/NewMahasiswa";
import TableMahasiswa from "./components/TableMahasiswa";
import { mahasiswaActions } from "./store/mahasiswa-slice";

function App() {
  const dispatch = useDispatch()
  const showNewForm = useSelector((state) => state.ui.showNewForm);
  const daftarMahasiswa = useSelector((state) => state.mahasiswa);

  return (
    <>
      {showNewForm && <NewMahasiswa />}
      <TableMahasiswa />
    </>
  );
}

export default App;
