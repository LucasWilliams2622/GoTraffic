import {LogBox as BaseLogBox} from 'react-native';

// aux variable to store exceptions
let warnExceptions: any = [];

// aux variable to store original function
const console_warn = console.warn;

// overrides the console.warn method keeping its functionality
// intact but adding the possibility of exclusions
console.warn = (...args) => {
  const isException = warnExceptions.some(ex => args[0]?.startsWith(ex));
  if (isException) return;

  // keeps original functionality
  console_warn(...args);
};

// override the LogBox methods to add the exclusions
export let LogBox = {...BaseLogBox};

LogBox.ignoreLogs = messages => {
  warnExceptions = [...warnExceptions, ...messages];
  // keeps original functionality
  BaseLogBox.ignoreLogs(messages);
};

LogBox.ignoreAllLogs = () => {
  // this is because all strings start with ''
  warnExceptions = [''];
  // keeps original functionality
  BaseLogBox.ignoreAllLogs();
};
