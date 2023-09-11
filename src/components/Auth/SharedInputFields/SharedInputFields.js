import { TextField } from "@mui/material";

export const SharedInputFields = ({
  label,
  value,
  handleOnChange,
  handleError,
  errorMessage,
}) => {
  return (
    <>
      <TextField
        margin="dense"
        id="outlined-error-helper-text"
        label={label}
        variant="outlined"
        value={value}
        onChange={handleOnChange}
        error={handleError}
        helperText={handleError ? errorMessage : ""}
        type={label === "Password" ? "password" : "text"}
        required
      />
    </>
  );
};
