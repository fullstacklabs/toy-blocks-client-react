import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({ block }) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <div className={classes.block}>
        <Typography className={classes.index}>
          {String(block.attributes.index).padStart(3, '0')}
        </Typography>
        <Typography className={classes.data}>
          {block.attributes.data}
        </Typography>
      </div>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  box: {
    paddingBottom: '4px'
  },
  block: {
    background: 'rgba(0, 0, 0, 0.12)',
    paddingBottom: '4px',
    padding: '8px',
    font: 'Roboto'
  },
  index: {
    color: colors.blue,
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '2px'
  },
  data: {
    fontSize: '14px',
    paddingBottom: '4px'
  }
}));

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    attributes: PropTypes.shape({
      index: PropTypes.number,
      timestamp: PropTypes.number,
      data: PropTypes.string,
      "previous-hash": PropTypes.string,
      hash: PropTypes.string
    }),
  }).isRequired,
};

export default Block;
