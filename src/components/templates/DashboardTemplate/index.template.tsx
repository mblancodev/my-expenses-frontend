import styles from "./DashboardTemplate.module.css";
import { UploadForm } from "src/components/organisms/UploadForm";

export const DashboardTemplate = () => {
  return (
    <div className={styles.x}>
      <UploadForm />
    </div>
  );
};
