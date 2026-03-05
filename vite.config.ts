import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    // GitHub Pages部署時のリポジトリ名に合わせる
    // もしURLが https://<USERNAME>.github.io/<REPO_NAME>/ の場合、baseを '/<REPO_NAME>/' にします。
    base: '/QZSS-Live-Viewer/',
});
