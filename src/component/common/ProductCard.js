import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

const RootCard = styled(Card)(({ theme }) => ({
  width: 345,
  margin: 20,
}));

const Media = styled(CardMedia)(({ theme }) => ({
  height: 200,
}));

const Content = styled(CardContent)(({ theme }) => ({
  height: 150,
  overflowY: 'auto',
}));

export default function ProductCard({ data, onDelete, onEdit, onBuy, isAdmin }) {

  return (
    <RootCard>
      <CardActionArea>
        <Media
          component="img"
          alt={data.name}
          src={data.imageURL}
          title={data.name}
        />
        <Content>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h6" component="h2">
              {data.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              ₹ {data.price}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </Content>
      </CardActionArea>
      <CardActions>
        <Box display="flex" width='100%' justifyContent="space-between" alignItems='center'>
          <Button size="small" variant="contained" color="primary" onClick={onBuy}>
            Buy
          </Button>
          {isAdmin && (
            <Box>
              <IconButton onClick={onEdit}>
                <Edit />
              </IconButton>
              <IconButton onClick={onDelete}>
                <Delete />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardActions>
    </RootCard>
  );
}
