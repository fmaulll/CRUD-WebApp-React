import {
  Box,
  Button,
  Container,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mahasiswaActions } from "../store/mahasiswa-slice";
import { uiActions } from "../store/ui-slice";

const TableMahasiswa = () => {
  const dispatch = useDispatch();
  const daftarMahasiswa = useSelector(
    (state) => state.mahasiswa.daftarMahasiswa
  );
  const showUpdateForm = useSelector((state) => state.ui.showUpdateForm);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");

  const getData = async () => {
    const response = await fetch("http://localhost:8000/mahasiswa");
    if (!response.ok) {
      throw new Error("Can't get the data!");
    }
    const data = await response.json();

    dispatch(mahasiswaActions.replaceMahasiswa(data.data));
  };

  const updateData = async (id) => {
    const dataMahasiswa = {
      nama_depan: fname,
      nama_belakang: lname,
      nim: nim,
      jurusan: jurusan,
    };

    const response = await fetch(`http://localhost:8000/mahasiswa/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataMahasiswa),
    });
    dispatch(uiActions.openUpdateForm());

    getData();
  };

  const deleteData = async (id) => {
    const response = await fetch(`http://localhost:8000/mahasiswa/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    getData();
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Container
      display="flex"
      justifyContent="center"
      bg="blue.400"
      h="100vh"
      maxW="100%"
      position="absolute"
    >
      <Box
        display="flex"
        flexDirection="column"
        bg="white"
        w="90%"
        my="4"
        p="4"
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
      >
        <TableContainer flex='10' overflowY='scroll' borderBottom='1px' borderColor="gray.200">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nama depan</Th>
                <Th>Nama belakang</Th>
                <Th>NIM</Th>
                <Th>Jurusan</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {daftarMahasiswa.map((mahasiswa) => (
                <>
                  {!showUpdateForm ? (
                    <Tr key={mahasiswa._id}>
                      <Td>{mahasiswa.nama_depan}</Td>
                      <Td>{mahasiswa.nama_belakang}</Td>
                      <Td>{mahasiswa.nim}</Td>
                      <Td>{mahasiswa.jurusan}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            dispatch(uiActions.openUpdateForm());
                          }}
                        >
                          Update
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            deleteData(mahasiswa._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ) : (
                    <Tr key={mahasiswa._id}>
                      <Td>
                        <Input
                          type="text"
                          placeholder={mahasiswa.nama_depan}
                          onChange={(e) => {
                            if (fname === "") {
                              return setFname(mahasiswa.nama_depan);
                            } else {
                              setFname(e.target.value);
                            }
                          }}
                        />
                      </Td>
                      <Td>
                        <Input
                          type="text"
                          placeholder={mahasiswa.nama_belakang}
                          onChange={(e) => {
                            if (lname === "") {
                              return setLname(mahasiswa.nama_belakang);
                            } else {
                              setLname(e.target.value);
                            }
                          }}
                        />
                      </Td>
                      <Td>
                        <Input
                          type="text"
                          placeholder={mahasiswa.nim}
                          onChange={(e) => {
                            if (nim === "") {
                              return setNim(mahasiswa.nim);
                            } else {
                              setNim(e.target.value);
                            }
                          }}
                        />
                      </Td>
                      <Td>
                        <Input
                          type="text"
                          placeholder={mahasiswa.jurusan}
                          onChange={(e) => {
                            if (jurusan === "") {
                              return setJurusan(mahasiswa.jurusan);
                            } else {
                              setJurusan(e.target.value);
                            }
                          }}
                        />
                      </Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            updateData(mahasiswa._id);
                          }}
                        >
                          Submit
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            dispatch(uiActions.openUpdateForm());
                          }}
                        >
                          Cancel
                        </Button>
                      </Td>
                    </Tr>
                  )}
                </>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box flex='1' w='100%' display='flex' justifyContent='center'>
          <Button
            mt='4'
            p='8'
            fontSize='2xl'
            colorScheme="green"
            onClick={() => {
              dispatch(uiActions.openNewForm());
            }}
          >
            Add Mahasiswa
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TableMahasiswa;
