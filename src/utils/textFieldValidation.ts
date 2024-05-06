export const getNumberValue = (value: string, callback: { (value: number): void }) => {
  if (value === "") {
    return callback(0);
  }
  const unknownValue = value.replace(/^0+/, "") as unknown;
  const valueAsNumber = unknownValue as number;
  if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
    callback(valueAsNumber);
  }
};
