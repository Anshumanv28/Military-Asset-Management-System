/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
    }
  }
  
  var process: {
    env: NodeJS.ProcessEnv;
  };
}

export {}; 