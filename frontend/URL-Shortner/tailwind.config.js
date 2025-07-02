import tailwindClamp from '@tailwindcss/line-clamp';

export default  {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // ✅ Required for scanning classes
  theme: {
    extend: {},
  },
  plugins: [
    tailwindClamp, // ✅ Add the plugin here
  ],
}
