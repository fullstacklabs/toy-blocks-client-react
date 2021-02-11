import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  makeStyles,
  Box
} from '@material-ui/core'
import colors from '../constants/colors'

const Block = ({ block }) => {
  const classes = useStyles()

  return (
    <Box className={classes.block}>
      <div className={classes.container}>
        <Typography className={classes.index}>
          {block.index}
        </Typography>
        <Typography className={classes.data}>
          {block.data}
        </Typography>
      </div>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  block: {
    paddingBottom: '5px'
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    padding: '3px'
  },
  index: {
    color: colors.blue
  },
  data: {

  }
}))

Block.propTypes = PropTypes.shape({
  block: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    attributes: PropTypes.shape({
      index: PropTypes.number,
      timestamp: PropTypes.number,
      data: PropTypes.string,
      ['previous-hash']: PropTypes.string,
      hash: PropTypes.string
    })
  })
}).isRequired

export default Block
