import { Box, Typography, SxProps } from "@mui/material";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import React from "react";
import { Editor as StaticEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor as any), { ssr: false }) as typeof StaticEditor;

interface Props {
  sx?: SxProps;
  content?: string;
  name?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string | false;
  setFieldValueFn?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  handleContentChange?: (body: string) => void;
}

export const HtmlEditor: React.FC<Props> = ({ sx, content = "", placeholder, handleContentChange, setFieldValueFn, name, height, maxHeight, minHeight, error = false, helperText }) => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  React.useEffect(() => {
    const contentDataState = ContentState.createFromBlockArray(convertFromHTML(content).contentBlocks);
    const editorDataState = EditorState.createWithContent(contentDataState);
    setEditorState(editorDataState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    const raw = convertToRaw(newState.getCurrentContent());
    const body = draftToHtml(raw);
    if (handleContentChange) handleContentChange(body);
    if (name && setFieldValueFn) setFieldValueFn(name, body);
  };

  return (
    <Box>
      <Box
        sx={{
          overflowX: "hidden",
          position: "relative",
          borderRadius: "8px",
          border: (theme) => (error ? `1px solid ${theme.palette.error.main}` : "1px solid #E0E0E0"),
          "& .nogosari-editor": {
            height: height ?? "auto",
            minHeight: minHeight ?? "unset",
            pt: 5,
            px: 2,
            maxHeight: maxHeight ?? "unset",
          },
          "& .nogosari-toolbar": {
            border: "none",
            borderBottom: "1px solid #E0E0E0",
            position: "absolute",
            top: 0,
            bgcolor: "white",
            zIndex: 2,
            width: "100%",
          },
          "& .rdw-option-wrapper": {
            border: "none",
          },
          "& .rdw-history-wrapper": {
            ml: { md: "auto" },
          },
          ...sx,
        }}
      >
        <Typography component="div">
          <Editor
            editorState={editorState}
            toolbarClassName="nogosari-toolbar"
            editorClassName="nogosari-editor"
            onEditorStateChange={onEditorStateChange}
            placeholder={placeholder}
            stripPastedStyles={true}
            toolbar={{
              options: ["inline", "blockType", "list", "link", "history"],
              blockType: {
                inDropdown: false,
                options: ["H1", "H2"],
              },
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline"],
                bold: { icon: "bold", className: "bx bx-bold bx-md" },
                italic: { icon: "italic", className: "bx bx-italic bx-md" },
                underline: {
                  icon: "underline",
                  className: "bx bx-underline bx-md",
                },
              },
              list: {
                inDropdown: false,
                options: ["unordered", "ordered"],
                unordered: {
                  icon: "list-ul",
                  className: "bx bx-list-ul bx-md",
                },
                ordered: { icon: "list-ol", className: "bx bx-list-ol bx-md" },
              },
              link: {
                inDropdown: false,
                options: ["link", "unlink"],
                link: { icon: "link", className: "bx bx-link bx-md" },
                unlink: { icon: "unlink", className: "bx bx-unlink bx-md" },
              },
              history: {
                undo: { icon: "undo", className: "bx bx-undo bx-md" },
                redo: { icon: "redo", className: "bx bx-redo bx-md" },
              },
            }}
          />
        </Typography>
      </Box>
      {error && Boolean(helperText) && (
        <Typography variant="caption" color="error">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
