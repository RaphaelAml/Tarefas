import type { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
