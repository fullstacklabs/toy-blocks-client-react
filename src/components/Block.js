import React from "react";
import PropTypes from "prop-types";

const Block = ({ block }) => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        display: "block",
        marginBottom: 5,
      }}
    >
      <span
        style={{
          color: "blue",
          display: "block",
          fontSize: "0.8em",
          fontWeight: "bold",
          padding: 5,
        }}
      >
        {block.id}
      </span>
      <span style={{ display: "block", padding: 5 }}>{block.text}</span>
    </div>
  );
};

Block.propTypes = {
  block: PropTypes.object.isRequired,
};

export default Block;
