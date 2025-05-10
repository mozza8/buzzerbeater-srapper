import { useEffect, useState } from "react";
import { getPlayers } from "../api/Services";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

type ListOfPlayersProps = {};

const ListOfPlayers = ({}: ListOfPlayersProps) => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginationPlayers, setPaginationPlayers] = useState([]);

  useEffect(() => {
    const getAllPlayers = async () => {
      const players: any = await getPlayers();
      setPlayers(players);
    };

    getAllPlayers();
  }, []);

  useEffect(() => {
    if (players) {
      changePlayerList(page, rowsPerPage);
    }
  }, [players]);

  const changePlayerList = (page: number, rows: number) => {
    const paginated = page * rows + rows;

    const newPlayers = players.slice(page * rows, paginated);

    setPaginationPlayers(newPlayers);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    changePlayerList(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    changePlayerList(0, parseInt(event.target.value, 10));
  };

  const tableColumns = [
    "ID Igralca",
    "Placa",
    "Starost",
    "Visina",
    "Potencial",
    "Met Iz Skoka",
    "Razdalja Meta",
    "Zunajna Obramba",
    "Vodenje Žoge",
    "Prodiranje",
    "Podajanje",
    "Met pod Košem",
    "Obramba pod Košem",
    "Skok",
    "Blokade",
    "Vzdržljivost",
    "Prosti Meti",
  ];

  console.log("paginationPlayers", paginationPlayers);

  return (
    paginationPlayers && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginationPlayers.map((player) => (
              <TableRow>
                {Object.values(player).map((playerValue: any, index) => {
                  if (index === 0) return;
                  return <TableCell>{playerValue}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={players.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    )
  );
};

export default ListOfPlayers;
