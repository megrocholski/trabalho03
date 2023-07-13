import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function SelectLabels({ select, setSelect }) {
  //   const [categories, setCategories] = React.useState([]);
  let categories = ["Jóias", "Eletrônicos", "Vestuário"];

  //   React.useEffect(() => {
  // 	axios.get('https://fakestoreapi.com/products/categories')
  //             .then((data) =>
  // 			// console.log(data.data)
  // 			setCategories(data.data)
  // 			)
  //   }, [categories])

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: "90%", width: "90%" }}>
        <Select
          value={select}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>Nenhum</em>
          </MenuItem>
          {categories.map((categorie) => (
            <MenuItem value={categorie}>{categorie}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
