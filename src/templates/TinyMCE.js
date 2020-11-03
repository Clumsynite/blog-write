import { Editor } from "@tinymce/tinymce-react";

const TinyMCE = (props) => {
  return (
    <Editor
      apiKey="iegn84mumhivsy1it2lvc8qjfxkaav0snoxsx4u66dxlnz3g"
      initialValue=""
      init={{
        height: props.height,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | help",
        placeholder: props.placeholder,
      }}
      onEditorChange={props.handleChange}
      value={props.value}
    />
  );
};

export default TinyMCE;
