import { Box, Container, Stack, SxProps, Theme, Typography } from "@mui/material";

const Footer: React.FC<{
  toc?: boolean;
  privacy?: boolean;
  sx?: SxProps<Theme>;
}> = ({ toc, privacy, sx }) => {
  return (
    <Box
      sx={{
        mt: 8,
        py: 3,
        bgcolor: "transparent",
        marginTop: "auto",
        ...sx,
      }}
    >
      <Container>
        <Stack justifyContent="space-between" alignItems="center" direction="row">
          {/* Credit */}
          <Typography variant="body2" sx={{ fontSize: "10px" }}>
            Kelompok 3 E-commerce
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
