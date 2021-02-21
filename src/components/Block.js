import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

const Block = ({ attributes }) => {
  const classes = useStyles();

  return (
    <Box className={classes.panel}>
      <sub className={classes.sub}>{attributes.index.toString().padStart(3, 0)}</sub>
      <p className={classes.detail}>{attributes.data}</p>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  sub: {
    color: "#304FFE",
    margin: 0,
    fontSize: 10
  },
  detail: {
    color: "#263238",
    margin: 0
  },
  panel: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 3,
    marginBottom: 5,
    padding: 8
  }
}));

Block.propTypes = {
  attributes: PropTypes.shape({
    index: PropTypes.number,
    data: PropTypes.string
  })
};

export default Block;
