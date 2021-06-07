import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/nodes";
import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";
import * as blocksActions from "../actions/blocks";

export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeURL: null,
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    this.props.actions.checkNodeStatuses(this.props.nodes.list);
    this.props.blocksActions.getBlocksLists(this.props.nodes.list);
  }

  toggleNodeExpanded(node) {
    const url = node.url === this.state.expandedNodeURL ? null : node.url;
    this.setState({
      expandedNodeURL:
        url,
    });
    this.props.blocksActions.getBlocks(node);
  }

  render() {
    const { nodes, blocks } = this.props;
    return (
      <Box paddingTop={7}>
        <Typography variant="h4" component="h1">
          <strong style={{ color: "#000" }}>Nodes</strong>
        </Typography>
        {nodes.list.map((node) => (
          <Node
            node={node}
            key={node.url}
            expanded={node.url === this.state.expandedNodeURL}
            toggleNodeExpanded={this.toggleNodeExpanded}
            blocks={blocks[node.url] || {}}
          />
        ))}
      </Box>
    );
  }
}

Nodes.propTypes = {
  actions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
  blocksActions: PropTypes.object,
  blocks: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
    blocks: state.blocks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    blocksActions: bindActionCreators(blocksActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
