import { ChangeEvent, FormEvent, useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegions] = useState([]);
  const [img, setImg] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked, files } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;

    if (
      type === "checkbox" &&
      (name === "konto" ||
        name === "indigo" ||
        name === "orange" ||
        name === "konha")
    ) {
      // Handling checkboxes for regions
      setRegions((prevRegions) => {
        const isRegionSelected = prevRegions.includes(name);
        if (checked && !isRegionSelected) {
          return [...prevRegions, name];
        } else if (!checked && isRegionSelected) {
          return prevRegions.filter((region) => region !== name);
        }
        return prevRegions;
      });
    } else if (type === "file" && files) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImg(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      // Handle other inputs (text, select, radio)
      switch (name) {
        case "name":
          setName(value);
          break;
        case "type":
          setType(value);
          break;
        case "gender":
          setGender(value);
          break;
      }
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(`You submitted:
      Name: ${name},
      Type: ${type},
      Gender: ${gender},
      Regions: ${region.join(", ")},
      Image: ${img ? "Uploaded" : "Not uploaded"}
    `);
  }
  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Type:</label>
        <select name="type" id="" value={type} onChange={handleChange}>
          <option value="">--select type</option>
          <option value="attack">Attack</option>
          <option value="defense">Defense</option>
          <option value="stamina">Stamina</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="region">Region</label>
        {["konto", "indigo", "orange", "konha"].map((currentRegion) => (
          <span key={currentRegion}>
            {currentRegion.charAt(0).toUpperCase() + currentRegion.slice(1)}
            <input
              type="checkbox"
              name={currentRegion}
              checked={region.includes(currentRegion)} // Corrected this line
              onChange={handleChange}
            />
          </span>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        {["male", "female", "other"].map((gen) => (
          <span key={gen}>
            {gen.charAt(0).toUpperCase() + gen.slice(1)}
            <input
              type="radio"
              name="gender"
              value={gen}
              checked={gender === gen}
              onChange={handleChange}
            />
          </span>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="img">
          Image Upload
          <input type="file" name="img" onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
