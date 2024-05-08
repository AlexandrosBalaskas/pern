import { Grid, Theme } from "@mui/material";
import { FieldTemplateProps } from "@rjsf/utils";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(4),
    width: "100%",
  },
  grid: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
}));

export const CustomFieldTemplate = function (props: FieldTemplateProps) {
  const styles = useStyles();
  const { classNames, style, help, errors, children } = props;
  return (
    <Grid
      container
      alignItems="center"
      wrap="wrap"
      direction="row"
      className={styles.container}
    >
      <Grid
        container
        alignItems="center"
        wrap="wrap"
        direction="row"
        className={styles.grid}
      >
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {children}
          {errors}
          {help}
        </Grid>
      </Grid>
    </Grid>
  );
};
