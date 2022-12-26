import { CircularProgress, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";
import { useProject } from "../../repositories/hooks/useProject";
import { deleteProject } from "../../repositories/project";
import { useProjectType } from "../../repositories/hooks/useProjectType";

export const ProjectListView: React.FC = () => {
  const router = useRouter();
  const { projects, loading } = useProject();
  const { loading: typeLoading } = useProjectType();

  if (projects?.length === 0 || projects === undefined || null) {
    return (
      <Stack gap={2}>
        <Stack
          direction="column"
          gap={1}
          mb={1}
          sx={{
            border: "1px solid",
            borderColor: "#0000001F",
            borderRadius: 3,
            px: 2,
            py: "20px",
          }}
        >
          <Typography variant="h6" fontWeight={500} sx={{ mb: "8px" }}>
            Anda belum memiliki projek
          </Typography>
          <Stack direction="row-reverse">
            <RoundedButton onClick={() => router.push("/project/create")} sx={{ fontSize: "10px" }} variant="contained">
              Buat projek baru
            </RoundedButton>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack gap={2}>
      {projects && projects.length !== 0 && loading && typeLoading ? (
        <Stack width="100%" height={150} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        projects?.map((item, index) => {
          return (
            <Stack direction="column" key={index} sx={{ p: "0px 48px 0px 48px" }}>
              <GroupView title={item.name} projectTypeName={item.projectType.name} id={item.id} />
            </Stack>
          );
        })
      )}
      <Stack direction="row-reverse">
        <RoundedButton onClick={() => router.push("/project/create")} sx={{ fontSize: "10px" }}>
          Buat projek baru
        </RoundedButton>
      </Stack>
    </Stack>
  );
};

const GroupView: React.FC<{ title: string; projectTypeName: string; id: number }> = ({ title, projectTypeName, id }) => {
  const router = useRouter();
  const { mutate } = useProject();
  const { loading } = useProjectType();
  const [open, setOpen] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await deleteProject(id);
      mutate();
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      setLoadingDelete(false);
      window.location.reload();
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Stack gap={2}>
      <Stack
        direction="column"
        gap={1}
        mb={1}
        sx={{
          border: "1px solid",
          borderColor: "#0000001F",
          borderRadius: 3,
          px: 2,
          py: "20px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={500} sx={{ mb: "8px" }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ pt: "2px" }}>
            {projectTypeName}
          </Typography>
        </Stack>
        <Typography variant="caption" color="#000" fontWeight={100}>
          deskripsi projek
        </Typography>
        <Stack direction="row-reverse">
          <RoundedButton onClick={() => router.push(`/project/${id}`)} sx={{ fontSize: "10px" }} variant="contained">
            detail projek
          </RoundedButton>
          <RoundedButton onClick={handleClickOpen} sx={{ fontSize: "10px" }}>
            hapus projek
          </RoundedButton>
        </Stack>
      </Stack>
      <DeleteDialog open={open} onClose={handleClose} onClickDelete={handleDelete} name={title} loading={loadingDelete} />
    </Stack>
  );
};

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onClickDelete: () => Promise<void>;
  name: string;
  loading: boolean;
}

const DeleteDialog: React.FC<DialogProps> = ({ open, onClose, onClickDelete, name, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{`Hapus Projek ${name}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Projek yang sudah dihapus tidak dapat dipulihkan kembali.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <RoundedButton onClick={onClose}>Batal</RoundedButton>
        <RoundedButton onClick={onClickDelete} variant="contained" loading={loading}>
          Hapus
        </RoundedButton>
      </DialogActions>
    </Dialog>
  );
};
