import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

const Block = ({block}) => {
  const classes = useStyles();
  const completeIndex = (index, size) => {
    let result = index.toString();
    return result.padStart(size, '0');
  };
  return (
    <Box className={classes.blockNode}>
      <Box className={classes.containerBlockNode}>
        <Box>
          <Typography variant="subtitle2" gutterBottom className={classes.title}>
            {completeIndex(block.attributes.index, 3)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            {block.attributes.data}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

Block.propTypes = {
  block: PropTypes.shape({
    attributes: PropTypes.shape({
      data: PropTypes.string,
      hash: PropTypes.string,
      index: PropTypes.number,
      ["previous-hash"]: PropTypes.string,
      timestamp: PropTypes.number,
    }),
    id: PropTypes.string,
    type: PropTypes.string
  }).isRequired
};

const useStyles = makeStyles((theme) => ({
  blockNode: {
    backgroundColor: "#e0e0e0",
    marginLeft: "-12px",
    marginRight: "-12px",
    borderRadius: "4px",
  },
  containerBlockNode: {
    padding: "8px 12px",
    marginBottom: "10px",
  },
  title: {
    color: "#4661fa",
    fontWeight: theme.typography.fontWeightMedium
  }
}));

export default Block;
