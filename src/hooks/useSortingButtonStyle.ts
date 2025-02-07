const useSortingButtonStyle = () => {
  const buttonStyle = (
    value: string,
    sortBy: string,
    sortDirection?: string,
    sortDirValue?: string
  ) => ({
    width: "120px",
    bg:
      sortBy === value && sortDirValue === sortDirection ? "#E64A19" : "white",
    color:
      sortBy === value && sortDirValue === sortDirection ? "white" : "black",
    _hover: {
      bg:
        sortBy === value && sortDirValue === sortDirection
          ? "#E64A19"
          : "white",
    },
    _active: {
      bg:
        sortBy === value && sortDirValue === sortDirection
          ? "#E64A19"
          : "white",
    },
    mr: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "none",
    height: "40px",
    userSelect: "none" as "none",
  });
  return { buttonStyle };
};

export default useSortingButtonStyle;
