#!/usr/bin/env node

import path from 'path';
import fs from 'fs';

const args = process.argv.slice(2);

const pathToSrc = './src';
let componentFolder = 'components';

const createComponent = function (name, pathToSrc, componentFolder) {
  const resolvedPath = path.resolve(process.cwd(), pathToSrc, componentFolder);

  const nameTSXcontent = `
import styles from './${name}.module.css';

interface I${name} {}

${name}.defaultProps = {}

export default function ${name}(props: I${name}) {
  const {} = props;

  return (<div className={styles.${name}}></div>);
}
`;

  const cbError = (e) => {
    if (e) console.log(e);
  };

  const newFolder = path.resolve(resolvedPath, name);
  fs.mkdirSync(newFolder, cbError);

  const nameTSXfile = path.resolve(newFolder, name + '.tsx');
  const nameCSSfile = path.resolve(newFolder, name + '.module.css');
  fs.writeFileSync(nameTSXfile, nameTSXcontent, { flag: 'wx' }, cbError);
  fs.writeFileSync(nameCSSfile, `.${name} {\n\n}`, { flag: 'wx' }, cbError);

  console.log('done!');
};

const error1 =
  'Wrong args, expected ComponentName and ?componentFolder("components" are default)';
if (args.length > 2 || args.length < 1) throw error1;

if (args[1]) componentFolder = './' + args[1];
if (/^[A-Z]*$/.test(args[0][0]))
  createComponent(args[0], pathToSrc, componentFolder);
else throw error1;
