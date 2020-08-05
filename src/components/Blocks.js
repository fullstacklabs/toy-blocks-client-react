import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";

function Blocks({ data }) {
  if (data === null || data === undefined) {
    return <Typography color="error">Error getting blocks</Typography>;
  }

  if (data.length === 0) {
    return <Typography>Node does not have blocks</Typography>;
  }

  return (
    <React.Fragment>
      {data && data.map(({ id, attributes }) => (
        <Box
          key={`block-id-id${id}`}
          bgcolor="lightGray"
          marginBottom={0.5}
          padding={1}
          borderRadius="4px"
        >
          <Typography color="primary" variant="caption" >
            {`${id}`.padStart(3, "0")}
          </Typography>
          <Typography>{attributes.data}</Typography>
        </Box>
      ))}
    </React.Fragment>
  );
}

Blocks.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      attibutes: PropTypes.shape({
        data: PropTypes.string,
      }),
    })
  ),
};

export default Blocks;
