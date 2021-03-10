import React from "react";
import PropTypes from "prop-types";
import { LoadingStatus } from "../constants/enums";
import { CircularProgress } from "@material-ui/core";
import Block from "../components/Block";

const Blocks = ({ node }) => {
  if (node.blocks.loadingStatus === LoadingStatus.NOT_STARTED) {
    return null;
  }

  if (node.blocks.loadingStatus === LoadingStatus.LOADING) {
    return <CircularProgress />;
  }

  if (node.blocks.loadingStatus === LoadingStatus.FAILURE) {
    return <h3>Error retrieving the blocks</h3>;
  }

  if (node.blocks.loadingStatus === LoadingStatus.FINISHED) {
    return node.blocks.list.map((block) => (
      <Block block={block} key={block.id}></Block>
    ));
  }
};

Blocks.propTypes = {
  node: PropTypes.object.isRequired,
};

export default Blocks;
