import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Block from '../components/Block'

const Blocks = ({ blocks }) => {
  return (
    <div className='blocks-container'>
      {blocks.length === 0
        ? <Typography>There's nothing to show</Typography>
        : blocks.map(block => <Block key={block.id} block={block.attributes} />)}
    </div>
  )
}

Blocks.propTypes = PropTypes.shape({
  blocks: PropTypes.arrayOf(PropTypes.object)
}).isRequired

export default Blocks
