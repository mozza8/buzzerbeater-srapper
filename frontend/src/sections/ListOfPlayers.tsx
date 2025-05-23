import { useEffect, useState } from "react";
import { getPlayers } from "../api/Services";
import PlayerTable from "./PlayerTable";
import { Box, Pagination, Stack, Typography } from "@mui/material";

type ListOfPlayersProps = {};

const ListOfPlayers = ({}: ListOfPlayersProps) => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginationPlayers, setPaginationPlayers] = useState([]);

  const rows = 100;

  useEffect(() => {
    const getAllPlayers = async () => {
      const players: any = await getPlayers();
      setPlayers(players);
    };

    getAllPlayers();
  }, []);

  useEffect(() => {
    if (players) {
      changePlayerList(page, rows);
    }
  }, [players]);

  const changePlayerList = (page: number, rows: number) => {
    if (page !== 0) {
      page = page - 1;
    }
    const paginated = page * rows + rows;

    const newPlayers = players.slice(page * rows, paginated);

    setPaginationPlayers(newPlayers);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown> | null,
    newPage: number
  ) => {
    setPage(newPage);

    console.log("newPage", newPage);
    changePlayerList(newPage, rows);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    changePlayerList(0, parseInt(event.target.value, 10));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={0.5}>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
        <Stack direction="row" alignItems={"flex-end"} spacing={1} mr={1}>
          <Typography fontWeight={800}>Number of players:</Typography>
          <Typography fontWeight={800}>{players.length}</Typography>
        </Stack>
      </Stack>
      <PlayerTable
        page={page}
        paginationPlayers={paginationPlayers}
        players={players}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ListOfPlayers;
