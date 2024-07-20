module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^react-modal$': '<rootDir>/__mocks__/react-modal.js', 

  },
  transformIgnorePatterns: [
    '/node_modules/(?!module-to-transform|another-module-to-transform).+\\.js$',
  ],

  
};
