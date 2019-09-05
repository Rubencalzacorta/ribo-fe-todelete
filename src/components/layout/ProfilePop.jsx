import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardActionArea, CardContent, List, ListItem, ListItemIcon, Divider} from '@material-ui/core';


const styles = () => ({
  listContainer: {
    marginTop: 5,
  },
  popOverLinks: {
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 0,
    width: 200,
    textDecoration: 'none',
  },
  popOverText: {
    padding: 0,
    margin: 0,
    width: 200,
    textDecoration: 'none',
  },
  orangeAvatar: {
    width: 35,
    height: 35,
    color: '#2D4369',
    backgroundColor: '#F2F5F7',
  },
  card: {
    maxWidth: 345,
  },
  links: {
    textDecoration: 'none'
  }
});

const ProfilePop = (props) => {
    let {classes, name, membership, logout} = props
    return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Avatar className={classes.orangeAvatar}>{name.slice(0,1)}</Avatar>
            <p className="title-app-bar" >{name}</p>
            <p className="id-identifier">Membresia - {membership}</p>
            <Divider />
            <List className={classes.listContainer}>
                <Link className={classes.links} to="/" >
                <ListItem button className={classes.popOverLinks}>
                  <ListItemIcon><i className="material-icons popover-icons">verified_user</i></ListItemIcon>
                  <p className={classes.popOverText} >Verificación</p>
                </ListItem>
                </Link>
                <Link className={classes.links} to="/" >
                <ListItem button className={classes.popOverLinks}>
                  <ListItemIcon><i className="material-icons popover-icons">settings</i></ListItemIcon>
                  <p className={classes.popOverText} >Configurición</p>
                </ListItem>
                </Link>
                <Link className={classes.links} to="/" >
                <ListItem button className={classes.popOverLinks} onClick={ () => logout()}>
                    <ListItemIcon><i className="material-icons popover-icons">eject</i></ListItemIcon>
                    <p className={classes.popOverText} >Salir</p>
                </ListItem>
                </Link>
            </List>
        </CardContent>
      </CardActionArea>
    </Card>)

}

ProfilePop.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfilePop);