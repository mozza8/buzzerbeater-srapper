import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

type PlayerTableProps = {
  paginationPlayers: any;
  players: any;
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const PlayerTable = ({ paginationPlayers }: PlayerTableProps) => {
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableColumns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginationPlayers.map((player: any) => (
            <TableRow key={player.id}>
              {Object.values(player).map((playerValue: any, index) => {
                if (index === 0) return;
                return <TableCell>{playerValue}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
