import { useState } from "react";
import Select, { type StylesConfig } from "react-select";

type Option = {
  value: string;
  label: string;
};

interface SelectCompProps {
  onChange: (value: string) => void;
}

const options: Option[] = [
  { value: "unread", label: "Unread" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "all", label: "All books" },
];

const selectStyles: StylesConfig<Option, false> = {
  control: (base) => ({
    ...base,
    height: "40px",
    width: "100%",
    borderRadius: "12px",
    borderColor: "#686868",
    backgroundColor: "#1f1f1f",
    boxShadow: "none",
    paddingLeft: "14px",
    color: "#f9f9f9",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#f9f9f",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#f9f9f9",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    overflow: "hidden",
    border: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    backgroundColor: "#262626",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#262626",
    color: state.isFocused ? "#f9f9f9" : "#686868",
  }),
};

export default function SelectComp({ onChange }: SelectCompProps) {
  const defaultOption = options.find((o) => o.value === "all")!;
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultOption
  );

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
    if (option) {
      onChange(option.value);
    }
  };
  return (
    <>
      <Select
        options={options}
        styles={selectStyles}
        value={selectedOption}
        onChange={handleChange}
        placeholder={"All books"}
      />
    </>
  );
}
