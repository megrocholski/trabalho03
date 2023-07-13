import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import axios from "axios";
import Filters from "../components/filters";
import PrimarySearchAppBar from "../components/appBar";
import { useNavigate } from "react-router-dom";
import Item from "./item";

function Listagem() {
  const [list, setList] = React.useState([]);
  const [select, setSelect] = React.useState("");
  const [cart, setCart] = React.useState();
  const [ids, setIds] = React.useState([]);
  const [selectCart, setSelectCart] = React.useState([]);
  const [content, hasContent] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  const getByTitle = async () => {
    await axios
      .get(`http://localhost:8080/api/product?nome=${search}`)
      .then((data) => (console.log(data), setList(data.data), hasContent(true)))
      .catch(() => hasContent(false));
  };

  React.useEffect(() => {
    console.log(select);
    console.log(search);
    if (select == "" && search == "") {
      axios.get(`http://localhost:8080/api/product`).then(
        (data) => (
          //   console.log(data.data)
          setList(data.data), hasContent(true)
        )
      );
    } else if (search == "") {
      axios
        .get(`http://localhost:8080/api/product?category=${select}`)
        .then((data) =>
          data.status == 200
            ? (setList(data.data), hasContent(true), console.log(data))
            : (hasContent(false), console.log(data))
        )
        .catch(() => hasContent(false));
      //   console.log(select);
    } else {
      console.log("AAAAAAAAAAAAA");
      getByTitle();
    }
  }, [select, search]);

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/cart/user/active/${localStorage.getItem(
          "user"
        )}`
      )
      .then(
        (data) => setCart(data.data[0])
        // console.log(data.data[0]))
        // cart.map((item) => {
        //   setSelectCart(item);
        // })
      );
  }, [cart]);

  const handleRedirect = (item) => {
    console.log("Redirect: " + item);
    navigate(`/item/${item.id}`);
  };

  const handleAddCart = (i) => {
    // let newDate = new Date();
    // console.log(newDate);
    let list_aux = [...list];
    let cart_aux = [];
    // console.log(list_aux[i]);
    console.log(cart);
    // cart.map((item) => {
    //   console.log(item);

    //   item.products.map((product) => {
    //     cart_aux.push(product.id);
    //     console.log(product.id);
    //   });
    //   setSelectCart(item);
    //   console.log(selectCart);
    // });
    if (cart) {
      cart.products.map((product) => {
        cart_aux.push(product.id);
      });
    }
    if (cart != null) {
      let ids_aux = [...cart_aux];
      ids_aux.push(list_aux[i].id);
      axios
        .put(
          `http://localhost:8080/api/cart/${cart.id}/${localStorage.getItem(
            "user"
          )}`,
          {
            id: ids_aux,
          }
        )
        .then((data) => console.log(data));
    } else {
      let ids_aux = [...ids];
      ids_aux.push(list_aux[i].id);
      console.log(ids_aux);

      axios
        .post(
          `http://localhost:8080/api/cart/${localStorage.getItem("user")}`,
          {
            id: ids_aux,
          }
        )
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <PrimarySearchAppBar search={search} setSearch={setSearch} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Filters select={select} setSelect={setSelect} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5%",
            // justifyContent: "space-around",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {content ? (
            list.map((item, i) => (
              <Card
                sx={{
                  maxWidth: 345,
                  width: 245,
                  minHeight: 300,
                  maxHeight: 350,
                  margin: 2,
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={item.image}
                  sx={{
                    //   backgroundSize: "",
                    width: "100%",
                    height: "100%",
                    maxWidth: 100,
                    maxHeight: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      textOverflow: "ellipsis",
                      width: 200,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textOverflow: "ellipsis",
                      height: 100,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      // -webkit-line-clamp: 2
                    }}
                  >
                    {item.description}
                    <br />
                    <br />
                    R$ {item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleAddCart(i)}>
                    <AddShoppingCartIcon />
                  </Button>
                  <Button size="small" onClick={() => handleRedirect(item)}>
                    Mais informações
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography>Nenhum produto encontrado</Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listagem;
