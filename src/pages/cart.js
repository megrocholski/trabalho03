import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/appBar";
import AlignItemsList from "../components/items";
import {
  Button,
  Divider,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function Cart() {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0.0);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const calcTotal = () => {
    let aux = 0;
    // console.log(cart);
    // cart.products.map((product) => {
    //   aux = aux + product.price;
    //   // console.log(aux);
    // });
    // setTotal(aux);
  };

  const handleFinalizar = () => {
    if (cart.products.length !== 0) {
      axios
        .put(
          `http://localhost:8080/api/cart/close/${
            cart.id
          }/${localStorage.getItem("user")}`
        )
        .then((data) =>
          data.status == 200
            ? (setMessage("Pedido finalizado com sucesso!"), handleClick())
            : (setMessage("Ocorreu um erro, tente novamente"), handleClick())
        );
    } else {
      setMessage("Carrinho vazio");
      handleClick();
    }
  };

  useEffect(() => {
    let valorTotal = 0;
    axios
      .get(
        `http://localhost:8080/api/cart/user/active/${localStorage.getItem(
          "user"
        )}`
      )
      .then(
        (data) => (
          setCart(data.data[0]),
          data.data[0].products.map(
            (product) => (valorTotal = valorTotal + product.price)
          ),
          setTotal(valorTotal)
        )
      );

    // calcTotal();
  }, [cart]);
  return (
    <div>
      <PrimarySearchAppBar />
      <h1>Carts</h1>
      {/* {carts.map((cart) => (
        <h1>{cart}</h1>
      ))} */}
      {/* <DataTable /> */}
      <AlignItemsList />
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 15,
          paddingTop: 15,
        }}
      >
        <Typography>Valor total: {total}</Typography>
        <Button variant="contained" onClick={() => handleFinalizar()}>
          Finalizar
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      </div>
    </div>
  );
}

export default Cart;
