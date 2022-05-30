import {
  Box,
  Button,
  CloseButton,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mahasiswaActions } from "../store/mahasiswa-slice";
import { uiActions } from "../store/ui-slice";

const NewMahasiswa = () => {
  const dispatch = useDispatch();
  const daftarMahasiswa = useSelector((state) => state.mahasiswa);
  const mahasiswaExist = useSelector((state) => state.mahasiswa.mahasiswaExist);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const postData = async (data) => {
    const response = fetch("http://localhost:8000/mahasiswa", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_depan: fname,
        nama_belakang: lname,
        nim: nim,
        jurusan: jurusan,
      }),
    });
  };

  const addNewMahasiswaHandler = () => {
    const dataMahasiswa = {
      nama_depan: fname,
      nama_belakang: lname,
      nim: nim,
      jurusan: jurusan,
    };
    if (fname === "" || lname === "" || nim === "" || jurusan === "") {
      setIsEmpty(true);
    } else {
      console.log(daftarMahasiswa);
      if (!mahasiswaExist) {
        postData(dataMahasiswa);
        dispatch(mahasiswaActions.addMahasiswa(dataMahasiswa));
        dispatch(uiActions.openNewForm());
      }
    }
  };
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="rgba(0,0,0,0.2)"
      h="100vh"
      maxW="100%"
      position="absolute"
      zIndex="1"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        bg="white"
        w="50%"
        p="4"
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
      >
        <Box
          w="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="2xl">Tambah Mahasiswa Baru</Text>
          <CloseButton
            onClick={() => {
              dispatch(uiActions.openNewForm());
            }}
          />
        </Box>
        {mahasiswaExist && (
          <Text mt="1" textColor="red" fontSize="smaller">
            Mahasiswa dengan NIM tersebut sudah ada!
          </Text>
        )}
        <FormControl isRequired>
          <FormLabel mt="4">Nama depan</FormLabel>
          <Input
            borderColor={isEmpty && fname === "" ? "red" : "gray.200"}
            type="text"
            placeholder="Masukkan nama depan mahasiswa"
            onChange={(e) => {
              setFname(e.target.value);
            }}
            onClick={() => {
              setIsEmpty(false);
            }}
          />
          {isEmpty && fname === "" ? (
            <Text mt="1" textColor="red" fontSize="smaller">
              Nama depan tidak boleh kosong!
            </Text>
          ) : (
            <Text mt="1" textColor="white" fontSize="smaller">
              Hehe
            </Text>
          )}
          <FormLabel>Nama Belakang</FormLabel>
          <Input
            borderColor={isEmpty && lname === "" ? "red" : "gray.200"}
            type="text"
            placeholder="Masukkan nama belakang mahasiswa"
            onChange={(e) => {
              setLname(e.target.value);
            }}
            onClick={() => {
              setIsEmpty(false);
            }}
          />
          {isEmpty && lname === "" ? (
            <Text mt="1" textColor="red" fontSize="smaller">
              Nama belakang tidak boleh kosong!
            </Text>
          ) : (
            <Text mt="1" textColor="white" fontSize="smaller">
              Hehe
            </Text>
          )}
          <FormLabel>NIM</FormLabel>
          <Input
            borderColor={isEmpty && nim === "" ? "red" : "gray.200"}
            type="text"
            placeholder="Masukkan NIM mahasiswa"
            onChange={(e) => {
              setNim(e.target.value);
            }}
            onClick={() => {
              setIsEmpty(false);
            }}
          />
          {isEmpty && nim === "" ? (
            <Text mt="1" textColor="red" fontSize="smaller">
              NIM tidak boleh kosong!
            </Text>
          ) : (
              <Text mt="1" textColor="white" fontSize="smaller">
                Hehe
              </Text>
            ) || mahasiswaExist ? (
            <Text mt="1" textColor="white" fontSize="smaller">
              Hehe
            </Text>
          ) : (
            <Text mt="1" textColor="red" fontSize="smaller">
              NIM tersebut sudah ada!
            </Text>
          )}
          <FormLabel>Jurusan</FormLabel>
          <Select
            borderColor={isEmpty && jurusan === "" ? "red" : "gray.200"}
            placeholder="Pilih jurusan"
            onChange={(e) => {
              setJurusan(e.target.value);
            }}
            onClick={() => {
              setIsEmpty(false);
            }}
          >
            <option value="Creativepreneurship">Creativepreneurship</option>
            <option value="Desain Komunikasi Visual">
              Desain Komunikasi Visual
            </option>
            <option value="Teknik Informatika">Teknik Informatika</option>
          </Select>
          {isEmpty && jurusan === "" ? (
            <Text mt="1" textColor="red" fontSize="smaller">
              Jurusan tidak boleh kosong!
            </Text>
          ) : (
            <Text mt="1" textColor="white" fontSize="smaller">
              Hehe
            </Text>
          )}
          <Button colorScheme="green" mt="1" onClick={addNewMahasiswaHandler}>
            Add new
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default NewMahasiswa;
