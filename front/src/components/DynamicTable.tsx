import { useMemo } from "react";
import { useParams } from "react-router";
import { Box, Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TanstackTable from "./GenericTanstackTable/TanstackTable";
import { useSchemas } from "../hooks/useSchemas";
import { FALLBACK_SCHEMAS } from "../forms/fallbackSchemas";

const useStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    position: "relative",
    marginTop: theme.spacing(3),
  },
}));

export const DynamicTable = () => {
  const routeParams = useParams<any>();
  const pageId = useMemo(() => {
    return routeParams?.category || "";
  }, [routeParams]);

  const {
    config: { rowButtons, filtering, columns },
  } = useSchemas(pageId, FALLBACK_SCHEMAS);

  const styles = useStyles();

  return (
    <Container maxWidth="lg" className={styles.mainContent}>
      <Box mt={3}>
        <TanstackTable
          pageId={pageId}
          rowButtons={rowButtons}
          filtering={filtering}
          columns={columns}
        ></TanstackTable>
      </Box>
    </Container>
  );
};
