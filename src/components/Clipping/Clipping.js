import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Clipping({clipping}) {
    return (
      <Card sx={{ maxWidth: "100%", marginBottom: "2rem"  }}>        
          <CardMedia
            component="img"
            height="140"
            image="/img/monserra.jpeg"
            alt="green iguana"            
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {clipping.plant}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {clipping.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {clipping.clippingsNum}
            </Typography>
          </CardContent>        
        <CardActions>
        <Button size="small" color="primary" component={Link} to={`/clipping/${clipping._id}`}>
          Get a clipping
        </Button>
      </CardActions>
      </Card>
    );
  }