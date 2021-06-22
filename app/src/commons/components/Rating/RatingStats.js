import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import {
  lime,
  lightGreen,
  orange,
  red,
  grey,
  amber,
} from "@material-ui/core/colors";

import RatingChart from './RatingChart'
import _ from 'lodash'
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(({
  root: {
    width: '100%',
  },
  card: {
    // maxWidth: 670,
    margin: '0 auto',
    marginTop: '10px',
  },
  bigBox: {
    display: 'block',
    height: '100px',
    width: '100%',
    // border: '1px green solid',
  },
  outerAverageBox: {
    display: 'float',
    float: 'left',
    width: '20%',
    // border: '1px orange solid',
  },
  averageBox: {
    diplay: 'float',
    float: 'center',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    paddingTop: '10px',
    // border: '1px red solid',
  },
  average: {
    fontSize: '44px',
    lineHeight: '44px',
    fontWeight: '100',
    color: grey[500],
  },
  chart: {
    float: 'right',
    width: '75%',
    // border: '1px blue solid',
  },
  greyStars: {
    width: '16px',
    color: grey[400],
  },
  yellowStars: {
    width: '16px',
    color: amber[400],
  },
  greyPerson: {
    width: '18px',
    color: grey[400],
  },
  raterCount: {
    display: "flex",
    justifyContent: "center"
  },
}))

export default function RatingStats({
  ratings,
  raterCount = null,
  colors = [lightGreen[300], lime[400], amber[300], orange[300], red[200]]
}) {
  const classes = useStyles();
  if (!raterCount) {
    raterCount = ratings.reduce((sum, rating) => {
      return sum + rating;
    }, 0)
  }
  const ratingAverage = Math.ceil((ratings.reduce((sum, rate, index) => {
    // console.log(sum, rate, index);
    return sum + rate * (5 - index);
  }, 0) / raterCount) * 10) / 10 || 0;
  // debugger
  function getStars(classes, stars) {
    let i = 0
    let yellowStars = [...Array(stars)].map(() => {
      return <StarIcon key={i++} className={classes.yellowStars} />
    })
    let ii = 5 - i
    let greyStars = [...Array(ii)].map(() => {
      return <StarIcon key={i++} className={classes.greyStars} />
    })
    return _.concat(yellowStars, greyStars)
  }

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={classes.bigBox}>
          <div className={classes.outerAverageBox}>
            <div className={classes.averageBox}>
              <Typography className={classes.average}>{ratingAverage}</Typography>
              {getStars(classes, Math.round(ratingAverage))}
              <Typography align="center" color="textSecondary" className={classes.raterCount}><span>{raterCount}</span><PersonIcon className={classes.greyPerson} /></Typography>
            </div>
          </div>
          <div className={classes.chart}>
            <RatingChart ratings={ratings} colors={colors} />
          </div>
        </div>
      </div>
    </div>
  )
}