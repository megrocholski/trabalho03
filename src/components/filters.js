import SelectLabels from "./select";
import RangeSlider from "./slider";

function Filters({ select, setSelect }) {
  return (
    <div
      style={{
        maxWidth: 250,
        padding: 10,
        marginLeft: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "normal",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#B9B7BD",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15,
      }}
    >
      <h1>Filters</h1>
      {/* <p>Preço</p>
      <RangeSlider /> */}
      <p>Categoria</p>
      <SelectLabels select={select} setSelect={setSelect} />
    </div>
  );
}

export default Filters;
