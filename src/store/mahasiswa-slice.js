import { createSlice } from "@reduxjs/toolkit";

const mahasiswaSlice = createSlice({
  name: "mahasiswa",
  initialState: {
    daftarMahasiswa: [],
    jumlahMahasiswa: 0,
    mahasiswaExist: false,
  },
  reducers: {
    replaceMahasiswa(state, action) {
      state.daftarMahasiswa = action.payload
    },
    addMahasiswa(state, action) {
      const newMahasiswa = action.payload;
      const existingMahasiswa = state.daftarMahasiswa.find(
        (mahasiswa) => mahasiswa._id === newMahasiswa._id
      );
      state.jumlahMahasiswa++;
      if (!existingMahasiswa) {
        state.daftarMahasiswa.push({
          _id: newMahasiswa._id,
          nama_depan: newMahasiswa.nama_depan,
          nama_belakang: newMahasiswa.nama_belakang,
          nim: newMahasiswa.nim,
          jurusan: newMahasiswa.jurusan
        });
      } else {
        state.mahasiswaExist = true;
      }
    },
  },
});

export const mahasiswaActions = mahasiswaSlice.actions

export default mahasiswaSlice;