import React from 'react'
import { connect } from "react-redux";
import {
  Typography,
} from "@material-ui/core";

const Block = () => {
  return <Typography>Component block is working</Typography>
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);
