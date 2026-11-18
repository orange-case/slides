import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // WSL on /mnt/c gets no inotify events from Windows — poll so HMR works
    watch: { usePolling: !!process.env.WSL_DISTRO_NAME, interval: 300 },
  },
})
