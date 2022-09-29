import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import copy from 'rollup-plugin-copy';

export default {
  plugins: [
    dynamicImportVars({
      // options
    }),
    copy({
      targets: [{ src: 'src/assets/*/*', dest: 'lib/assets/' },],
    }),
  ]
};