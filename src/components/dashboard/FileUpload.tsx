import { useRef, useState } from "react";
import { Button, FormLabel } from "@mui/material";

export const ImageInput = ({
  name,
  src,
  label,
  id,
  onRemove,
}: {
  name: string;
  onRemove: { (): void };
  src?: string;
  label?: string;
  id?: string;
}) => {
  const [fileUrl, setFileUrl] = useState<string>(src || "");
  const inputFile = useRef<HTMLInputElement>(null);

  const onHandleRemove = () => {
    onRemove();
    if (inputFile.current) {
      setFileUrl("");
      inputFile.current.value = "";
      inputFile.current.type = "file";
    }
  };

  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <input
        id={id}
        ref={inputFile}
        type="file"
        accept="image/*"
        name={name}
        multiple={false}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            setFileUrl(URL.createObjectURL(file));
          }
        }}
        required
      />
      {fileUrl && (
        <>
          <img className="w-1/2 mb-2" src={fileUrl} />
          <Button className="w-max" onClick={onHandleRemove} variant="outlined" color="error">
            Remove
          </Button>
        </>
      )}
    </>
  );
};

export const VideosInput = ({
  name,
  onRemove,
  src,
  label,
  id,
}: {
  name: string;
  onRemove: { (): void };
  src?: string;
  label?: string;
  id?: string;
}) => {
  const [fileUrl, setFileUrl] = useState<string>(src || "");
  const inputFile = useRef<HTMLInputElement>(null);

  const onHandleRemove = () => {
    onRemove();
    if (inputFile.current) {
      setFileUrl("");
      inputFile.current.value = "";
      inputFile.current.type = "file";
    }
  };
  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <input
        id={id}
        ref={inputFile}
        type="file"
        accept="video/*"
        name={name}
        multiple={false}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            setFileUrl(URL.createObjectURL(file));
          }
        }}
        required
      />
      {fileUrl && (
        <>
          <iframe src={fileUrl} className="h-96 mb-2"></iframe>
          <Button className="w-max" onClick={onHandleRemove} variant="outlined" color="error">
            Remove
          </Button>
        </>
      )}
    </>
  );
};
