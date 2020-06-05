const devOptions = {
  BASE_URL: 'http://localhost:3001/pakchoi/',
  OUT_TIME: 10000,
};

const prodOptions = Object.assign(devOptions, {
  BASE_URL: 'http://localhost:3001/pakchoi/',
});


const config = process.env.NODE_ENV === 'production' ? prodOptions : devOptions;
export default config;
