"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "./fileUpload.module.css";
import Image from "next/image";

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className={styled["file__uploader_wrapper"]}>
            <Image
              src={fileUrl}
              alt="uploaded"
              className={styled["file__uploader_img"]}
              width={283}
              height={250}
            />
          </div>
          <p className={styled["file__uploader_label"]}>
            Нажмите или перетощите фото чтобы поменять
          </p>
        </>
      ) : (
        <div className={styled["file__uploader_box"]}>
          <img
            src="/icons/file-upload.svg"
            alt="file-upload"
            width={50}
            height={40}
          />

          <h3 className={styled["file__uploader_drop"]}>Дабавить фото</h3>
          <p className={styled["file__uploader_format"]}>SVG, PNG, JPG</p>

          <button className={styled.file__uploader_button}>
            Выбрать из компютера
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
