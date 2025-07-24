// Archivo: src/components/AboutCV/SectionTitle.tsx
import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

interface SectionTitleProps {
    title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    const theme = useTheme();

    return (
        <Box mb={4}>
            <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                sx={{
                    color: theme.palette.text.primary,
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    display: "inline-block",
                    px: 2,
                    pb: 0.5
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default SectionTitle;
