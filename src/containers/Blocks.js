import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";
import Block from "../components/Block";

const Blocks = ({ blocks }) => {
  return (
    <div className={'blocks'}>
      {
        blocks.length === 0
          ? <Typography className={'empty-blocks'}>
              No blocks currently available.
            </Typography>
          : blocks.map(block => <Block key={block.id} block={block} />)
      }
    </div>
  );
};

Blocks.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Blocks;
